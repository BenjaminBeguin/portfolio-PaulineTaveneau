export const normalize = (value, min, max) => {
  if (min === max) return 1;
  return (value - min) / (max - min);
};


export const interpolate = (normValue, min, max) => {
  return min + (max - min) * normValue;
};

export const map = (value, min1, max1, min2, max2) => {
  return interpolate(normalize(value, min1, max1), min2, max2);
};
