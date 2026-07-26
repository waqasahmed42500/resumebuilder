"use client";

import React, { useRef, memo } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

const EditableImage = memo(function EditableImage({
  src = "",
  onChange,
  onRemove,
  name = "User",
  className = "h-28 w-28 rounded-full",
  accentColor = "#0f766e",
  readOnly = false,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("Please choose an image under 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (onChange) onChange(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const getInitials = (str = "") => {
    return str
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  };

  if (readOnly) {
    if (src) {
      return <img src={src} alt={name} className={`${className} object-cover`} />;
    }
    return (
      <div
        className={`${className} flex items-center justify-center text-xl font-bold text-white`}
        style={{ backgroundColor: accentColor }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className="group/image relative inline-block">
      {src ? (
        <img src={src} alt={name} className={`${className} object-cover shadow-sm`} />
      ) : (
        <div
          className={`${className} flex items-center justify-center text-xl font-bold text-white shadow-sm`}
          style={{ backgroundColor: accentColor }}
        >
          {getInitials(name)}
        </div>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-200 group-hover/image:opacity-100 text-white"
        title="Upload profile photo"
      >
        <FiCamera className="text-lg" />
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider">Photo</span>
      </div>

      {src && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white opacity-0 shadow-md transition-all duration-200 group-hover/image:opacity-100 hover:bg-rose-700"
          title="Remove photo"
        >
          <FiTrash2 className="text-xs" />
        </button>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  );
});

export default EditableImage;
