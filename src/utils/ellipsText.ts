export const ellipsText = (text: string | null | undefined, maxLength = 6) => {
  if (!text) return "";

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
