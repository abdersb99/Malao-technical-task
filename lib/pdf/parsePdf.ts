import { createSpans } from "./createSpans";

export type Block =
  | { type: "scene"; text: string }
  | { type: "character"; name: string }
  | { type: "dialogue"; character: string; text: string; spans: any[] }
  | { type: "action"; text: string };

function isScene(line: string) {
  return line.startsWith("INT.") || line.startsWith("EXT.");
}

function isCharacter(line: string) {
  return line === line.toUpperCase() && line.length < 40;
}

export function parseScript(text: string): Block[] {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const blocks: Block[] = [];
  let currentChar: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (currentChar && buffer.length) {
      const txt = buffer.join(" ");
      blocks.push({
        type: "dialogue",
        character: currentChar,
        text: txt,
        spans: createSpans(txt),
      });
    }
    buffer = [];
  };

  for (const line of lines) {
    if (isScene(line)) {
      flush();
      currentChar = null;
      blocks.push({ type: "scene", text: line });
      continue;
    }

    if (isCharacter(line)) {
      flush();
      currentChar = line;
      blocks.push({ type: "character", name: line });
      continue;
    }

    if (currentChar) {
      buffer.push(line);
      continue;
    }

    flush();
    blocks.push({ type: "action", text: line });
  }

  flush();

  return blocks;
}