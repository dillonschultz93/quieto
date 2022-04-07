export const scaleA = (base: number, ratio: number, currentIndex: number) => {
  return base + ratio * (currentIndex / 100 - 1);
};

export const scaleB = (base: number, ratio: number, currentIndex: number) => {
  return base + 30 + ratio * 8 * (currentIndex / 100 - 1);
};
