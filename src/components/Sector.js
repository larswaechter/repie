import { Fragment } from "react";

const Sector = ({
  cx,
  cy,
  startAngle,
  endAngle,
  innerAngle,
  path,
  fill,
  stroke,
  radius,
  payload,
  onMouseOver,
  onMouseLeave,
  onClick,
  renderLabel,
}) => {
  const { weight } = payload;
  console.log(startAngle, endAngle);
  return (
    <Fragment>
      <path
        cx={cx}
        cy={cy}
        d={path}
        fill={fill}
        stroke={stroke}
        data-idx={payload.position}
        onMouseOver={(e) => onMouseOver(payload, e)}
        onMouseLeave={(e) => onMouseLeave(payload, e)}
        onClick={(e) => onClick(payload, e)}
      />
      {renderLabel(cx, cy, startAngle, innerAngle, radius, weight)}
    </Fragment>
  );
};

export default Sector;
