"use client";

import React from "react";
import { FiChevronUp, FiChevronDown, FiPlus, FiTrash2 } from "react-icons/fi";

export default function SectionControls({
  onMoveUp,
  onMoveDown,
  onAdd,
  onDelete,
  canMoveUp = true,
  canMoveDown = true,
  canDelete = true,
  readOnly = false,
  className = "",
}) {
  if (readOnly) return null;

  return (
    <div
      className={`section-controls-toolbar opacity-0 group-hover/item:opacity-100 transition-all duration-200 flex items-center gap-1 bg-slate-900/90 text-white rounded-lg p-1 shadow-lg backdrop-blur-sm ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {onMoveUp && (
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          title="Move Up"
          className="p-1 hover:bg-slate-700 rounded transition disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <FiChevronUp className="text-xs" />
        </button>
      )}
      {onMoveDown && (
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          title="Move Down"
          className="p-1 hover:bg-slate-700 rounded transition disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <FiChevronDown className="text-xs" />
        </button>
      )}
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          title="Add New Item"
          className="p-1 hover:bg-emerald-600 rounded transition text-emerald-400 hover:text-white"
        >
          <FiPlus className="text-xs" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
          title="Delete Item"
          className="p-1 hover:bg-rose-600 rounded transition text-rose-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <FiTrash2 className="text-xs" />
        </button>
      )}
    </div>
  );
}
