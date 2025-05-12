const exceptionWords = ["de", "do", "das", "da", "dos", "em", "por", "para"];

function capitalizeFirstWord(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export function toTitleCase(string?: string): string {
  if (!string) {
    return "";
  }
  const formattingString = string.toLowerCase().split(" ").filter(Boolean);
  const titleCase = formattingString.map((word: string) => {
    if (exceptionWords.includes(word)) {
      return word;
    }
    return capitalizeFirstWord(word);
  });
  return titleCase.join(" ");
}
