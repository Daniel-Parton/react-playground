export const getloalUrlPath = (relativePath: string) => {
  const compiledPath = !relativePath.startsWith('/') ? `/${relativePath}` : relativePath;
  return `http://localhost:3000${compiledPath}`;
} 