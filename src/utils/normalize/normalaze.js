export const normalize = (value, min, max) => {
  if (max === min) return 0;
  return (value - min) / (max - min);
};
