export const getPageDescription = (total: number, currentPage: number, itemsPerPage: number) => {
  if (total <= 0) return null;
  const skip = currentPage <= 1 ? 0 : (currentPage - 1) * itemsPerPage;
  let end = skip + itemsPerPage;
  if (end > total) end = total;
  return `${skip + 1} - ${end} of ${total}`
}