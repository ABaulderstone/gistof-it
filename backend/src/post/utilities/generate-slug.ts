export const generateSlug = (title: string, id: number): string => {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const slug = sanitizedTitle.replace(/\s+/g, '-').toLowerCase();
  return slug + '-' + id;
};
