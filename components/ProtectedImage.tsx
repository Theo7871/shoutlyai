"use client";

import { CSSProperties, DragEvent, MouseEvent, ReactEventHandler } from "react";

interface ProtectedImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  onClick?: () => void;
  onError?: ReactEventHandler<HTMLImageElement>;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
}

/**
 * Drop-in replacement for <img> that blocks the common ways of
 * saving an image (right-click "Save image as", drag-to-desktop,
 * mobile long-press). Not a substitute for server-side protection —
 * a determined user can still grab pixels via devtools/screenshot.
 */
export default function ProtectedImage({
  src,
  alt = "",
  className,
  style,
  loading = "lazy",
  onClick,
  onError,
  wrapperClassName,
  wrapperStyle,
}: ProtectedImageProps) {
  const block = (e: MouseEvent | DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`protected-image-wrapper${wrapperClassName ? ` ${wrapperClassName}` : ""}`}
      style={{ position: "relative", ...wrapperStyle }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        draggable={false}
        onError={onError}
        className={`protected-image${className ? ` ${className}` : ""}`}
        style={style}
      />
      <div
        className="protected-image-overlay"
        onContextMenu={block}
        onDragStart={block}
        onClick={onClick}
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          cursor: onClick ? "pointer" : "default",
        }}
      />
    </div>
  );
}
