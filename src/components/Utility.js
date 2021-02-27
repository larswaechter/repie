export const percentToDegree = (percent) => percent * 3.6;

export const polarToCartesian = (
  centerX,
  centerY,
  radius,
  from,
  angleInDegrees
) => {
  var angleInRadians = ((from + angleInDegrees - 90) * Math.PI) / 180.0;
  return [
    centerX + radius * Math.cos(angleInRadians),
    centerY + radius * Math.sin(angleInRadians),
  ];
};
