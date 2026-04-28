"use client";

import { useState, useRef } from "react";
import FileUpload from "@/components/FileUpload";
import ParsedContent from "@/components/ParsedContent";

export default function Page() {
  const [parsedData, setParsedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* TOP BAR */}
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid #222",
          background: "#111",
          color: "white",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Script Reader</div>

        {/* hidden real input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            fetch("/api/upload", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => setParsedData(data));
          }}
        />

        {/* BUTTON */}
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: "8px 14px",
            background: "#2563eb", // blue
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Upload File
        </button>
      </div>

      {/* MAIN READER */}
      <div
        style={{
          flex: 1,
          background: "#000",
          color: "#fff",
          overflowY: "auto",
          padding: 40,
        }}
      >
        <ParsedContent data={parsedData} />
      </div>
    </div>
  );
}