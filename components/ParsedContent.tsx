"use client";

export function ParsedContent({ data }: any) {
  // normalize input safely
  const blocks = Array.isArray(data)
    ? data
    : Array.isArray(data?.blocks)
    ? data.blocks
    : [];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
      {blocks.map((b: any, i: number) => {
        if (b.type === "scene") {
          return (
            <div key={i} style={{ fontWeight: "bold", margin: "20px 0" }}>
              {b.text}
            </div>
          );
        }

        if (b.type === "character") {
          return (
            <div key={i} style={{ textAlign: "center", fontWeight: 600 }}>
              {b.name}
            </div>
          );
        }

        if (b.type === "dialogue") {
          return (
            <div key={i} style={{ paddingLeft: 40, marginBottom: 10 }}>
              <div style={{ opacity: 0.6 }}>{b.character}</div>
              <div>{b.text}</div>
            </div>
          );
        }

        return (
          <div key={i} style={{ marginBottom: 10 }}>
            {b.text}
          </div>
        );
      })}
    </div>
  );
}