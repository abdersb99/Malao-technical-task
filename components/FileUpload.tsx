"use client";

import { useState } from "react";

type Props = {
  onParsed: (data: any) => void;
};

export default function FileUpload({ onParsed }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      onParsed(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <input type="file" accept="application/pdf" onChange={handleUpload} />

      {loading && <p>Parsing PDF...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}