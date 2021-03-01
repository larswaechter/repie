export const percentToDegree = (percent) => percent * 3.6;

export const polarToCartesian = (
  centerX,
  centerY,
  radius,
  startAngle,
  degrees
) => {
  // Degree to radians => 360° = 2 PI
  // - 90°, since 0° is at 3 o'clock
  var angleInRadians = ((startAngle + degrees - 90) * Math.PI) / 180.0;
  return [
    Math.floor(centerX + radius * Math.cos(angleInRadians)),
    Math.floor(centerY + radius * Math.sin(angleInRadians)),
  ];
};

export const trimAngle = (angle) => (angle > 360 ? angle - 360 : angle);
