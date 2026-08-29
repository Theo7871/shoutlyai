"use client";

import { useEffect } from "react";

/**
 * Sitewide friction against saving/inspecting content:
 * blocks the browser context menu, Ctrl/Cmd+S, and the common
 * devtools shortcuts. This raises the bar for casual users but
 * cannot stop anyone determined (disabling JS, using the browser's
 * own menu, etc. still works) — it's not real security.
 */
export default function DownloadProtection() {
  useEffect(() => {
    const blockContextMenu = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Let right-click still work inside editable fields (paste/copy for captions, hashtags, etc.)
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      e.preventDefault();
    };

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isSaveShortcut = (e.ctrlKey || e.metaKey) && key === "s";
      const isDevToolsShortcut =
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        ((e.ctrlKey || e.metaKey) && key === "u");

      if (isSaveShortcut || isDevToolsShortcut) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}
