export const isHTMLValid = (text: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  return !doc.querySelector('parsererror');
};
