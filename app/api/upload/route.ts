import { parsePdf } from "@/lib/pdf/parsePdf";
import { buildLines } from "@/lib/pdf/buildLines";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const raw = await parsePdf(buffer);

  const lines = buildLines(raw);

  return Response.json({ lines });
}