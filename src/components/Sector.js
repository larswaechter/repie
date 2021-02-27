import { Fragment } from "react";

const Sector = ({
  cx,
  cy,
  startAngle,
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
  return (
    <Fragment>
      <path
        cx={cx}
        cy={cy}
        d={path}
        fill={fill}
        stroke={stroke}
        data-ixd={payload.position}
        onMouseOver={(e) => onMouseOver(payload, e)}
        onMouseLeave={(e) => onMouseLeave(payload, e)}
        onClick={(e) => onClick(payload, e)}
      />
      {renderLabel(cx, cy, startAngle, innerAngle, radius, weight)}
    </Fragment>
  );
};

export default Sector;
