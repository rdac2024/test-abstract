export const getVwByPx = (px: number) => {
  return `${px / 375 * 100}vw`
}