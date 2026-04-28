export default function ParsedContent({ data }: any) {
  if (!data?.lines) return null;

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        fontFamily: "monospace",
        padding: 20,
        whiteSpace: "pre-wrap",
        lineHeight: 1.4,
      }}
    >
      {data.lines.map((line: any, i: number) => (
        <div key={i}>
          {line.text}
        </div>
      ))}
    </div>
  );
}