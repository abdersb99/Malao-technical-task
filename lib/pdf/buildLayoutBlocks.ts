export function buildLayoutBlocks(items: any[]) {
  const pages = new Map<number, any[]>();

  // 1. group by page
  for (const item of items) {
    if (!pages.has(item.page)) pages.set(item.page, []);
    pages.get(item.page)!.push(item);
  }

  // 2. within each page, sort by position but DO NOT merge text
  const result: any[] = [];

  for (const [page, pageItems] of pages.entries()) {
    pageItems.sort((a, b) => a.y - b.y || a.x - b.x);

    result.push({
      page,
      items: pageItems,
    });
  }

  return result;
}