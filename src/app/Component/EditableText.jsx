"use client";

import React, { useRef, useEffect, useState, memo, useCallback } from "react";
import { FiEdit2 } from "react-icons/fi";

const EditableText = memo(function EditableText({
  value = "",
  onChange,
  tagName = "span",
  placeholder = "Click to edit...",
  multiline = false,
  className = "",
  style = {},
  readOnly = false,
  accentColor,
}) {
  const elementRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const displayValue = value || "";

  // Synchronize internal text with incoming value prop if not focused
  useEffect(() => {
    if (elementRef.current && !isFocused) {
      if (elementRef.current.innerText !== displayValue) {
        elementRef.current.innerText = displayValue;
      }
    }
  }, [displayValue, isFocused]);

  const handleInput = useCallback(
    (e) => {
      const newValue = e.currentTarget.innerText;
      if (onChange && newValue !== displayValue) {
        onChange(newValue);
      }
    },
    [onChange, displayValue]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!multiline && e.key === "Enter") {
        e.preventDefault();
        elementRef.current?.blur();
      }
      if (e.key === "Escape") {
        elementRef.current?.blur();
      }
    },
    [multiline]
  );

  if (readOnly) {
    const Component = tagName;
    return (
      <Component className={className} style={style}>
        {displayValue || placeholder}
      </Component>
    );
  }

  const Component = tagName;
  const activeFocusStyle = accentColor ? { outlineColor: accentColor } : {};

  return (
    <span className="group/editable relative inline-block max-w-full">
      <Component
        ref={elementRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          const finalVal = e.currentTarget.innerText;
          if (onChange && finalVal !== displayValue) {
            onChange(finalVal);
          }
        }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`editable-text-field ${isFocused ? "editable-focused" : ""} ${className}`}
        style={{ ...style, ...activeFocusStyle }}
      />
      {!isFocused && (
        <span
          className="editable-hover-badge pointer-events-none absolute -top-2 -right-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] text-white opacity-0 shadow-sm transition-all duration-200 group-hover/editable:opacity-100 group-hover/editable:scale-100"
          aria-hidden="true"
        >
          <FiEdit2 className="text-[8px]" />
        </span>
      )}
    </span>
  );
});

export default EditableText;
