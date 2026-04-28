export function createSpans(text: string) {
  const words = text.split(" ");

  let index = 0;

  return words.map(word => {
    const start = index;
    const end = index + word.length;
    index = end + 1;

    return {
      text: word,
      start,
      end,
    };
  });
}