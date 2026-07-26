"use client";

import React, { memo } from "react";

const TemplateWrapper = memo(function TemplateWrapper({
  children,
  theme,
  className = "",
  style = {},
  readOnly = false,
}) {
  const fontFamily = theme?.fontFamily || "Inter, sans-serif";
  const accent = theme?.accent || "#0f766e";

  return (
    <article
      className={`min-h-[1123px] w-[794px] overflow-hidden bg-white text-slate-800 shadow-2xl transition-all duration-200 ${
        readOnly ? "export-mode print:shadow-none" : ""
      } ${className}`}
      style={{
        fontFamily,
        "--theme-accent": accent,
        ...style,
      }}
    >
      {children}
    </article>
  );
});

export default TemplateWrapper;
