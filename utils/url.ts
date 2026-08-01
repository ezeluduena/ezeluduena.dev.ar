export const isAbsoluteUrl = (url: string) => /^[a-z][a-z\d+\-.]*:/iu.test(url);

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-|-$/gu, '');
};
