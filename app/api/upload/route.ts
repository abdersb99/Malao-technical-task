import { NextResponse } from "next/server";
import { PdfReader } from "pdfreader";
import { parseScript } from "@/lib/pdf/parsePdf";

export const runtime = "nodejs";

function extractText(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const lines: string[] = [];

    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) return reject(err);
      if (!item) return resolve(lines.join("\n"));
      if (item.text) lines.push(item.text);
    });
  });
}

function clean(text: string) {
  return text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n");
}

export async function POST(req: Request) {
  const file = await req.formData().then(d => d.get("file") as File);

  const buffer = Buffer.from(await file.arrayBuffer());

  const raw = await extractText(buffer);
  const cleaned = clean(raw);

  const blocks = parseScript(cleaned);

  return NextResponse.json({ blocks });
}