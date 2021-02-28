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
  onClick,
  onContextMenu,
  onMouseOver,
  onMouseLeave,
  renderLabel,
}) => {
  const { position, weight } = payload;
  return (
    <g className="pie-sector">
      <path
        cx={cx}
        cy={cy}
        d={path}
        fill={fill}
        stroke={stroke}
        data-idx={position}
        onMouseOver={(e) => onMouseOver(payload, e)}
        onMouseLeave={(e) => onMouseLeave(payload, e)}
        onClick={(e) => onClick(payload, e)}
        onContextMenu={(e) => onContextMenu(payload, e)}
      />
      {renderLabel(cx, cy, startAngle, innerAngle, radius, weight)}
    </g>
  );
};

export default Sector;
