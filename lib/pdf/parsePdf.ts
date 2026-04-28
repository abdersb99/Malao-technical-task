import { PdfReader } from "pdfreader";

type PdfItem = {
  text: string;
  x: number;
  y: number;
  page: number;
};

export async function parsePdf(buffer: Buffer): Promise<PdfItem[]> {
  return new Promise((resolve, reject) => {
    const items: PdfItem[] = [];

    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) return reject(err);

      if (!item) {
        // DO NOT sort globally — preserve raw spatial structure
        resolve(items);
        return;
      }

      if (item.text) {
        items.push({
          text: item.text,
          x: item.x ?? 0,
          y: item.y ?? 0,
          page: item.page ?? 1,
        });
      }
    });
  });
}