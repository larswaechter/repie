const PieShapesWeight = ({ cx, cy, weight, fill }) => {
  let weightRadius;
  switch (weight) {
    case 1:
      weightRadius = 6;
      break;
    case 2:
      weightRadius = 4;
      break;
    case 3:
      weightRadius = 2;
      break;
    default:
      weightRadius = 0;
  }

  return (
    <circle
      className="pie-shapes-weight"
      cx={cx}
      cy={cy}
      r={weightRadius}
      fill={fill}
    />
  );
};

PieShapesWeight.defaultProps = {
  fill: "#676a6d",
};

export default PieShapesWeight;
