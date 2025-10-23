import React, { useEffect, useMemo } from "react";
import CodeMirror, { keymap } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vim } from "@replit/codemirror-vim";
import { standardKeymap } from "@codemirror/commands";
import { Prec } from "@codemirror/state";

export default function VimEditor({
  value,
  onChange,
  onKey,
  onPaste,
}: {
  value: string;
  onChange: (v: string) => void;
  onKey?: () => void;
  onPaste?: () => void;
}) {
  const extensions = useMemo(
    () => [javascript(), Prec.highest(vim()), keymap.of(standardKeymap)],
    [],
  );

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      // Global Paste-Block optional
      if (onPaste) {
        onPaste();
        e.preventDefault();
      }
    };
    document.addEventListener("paste", handler);
    return () => document.removeEventListener("paste", handler);
  }, [onPaste]);

  return (
    <div onKeyDown={onKey}>
      <CodeMirror
        value={value}
        onChange={onChange}
        height="300px"
        theme="light"
        extensions={extensions}
        basicSetup={{
          lineNumbers: true,
          closeBrackets: false,
          indentOnInput: false,
        }}
      />
    </div>
  );
}
