const PieShapesSector = ({
  cx,
  cy,
  startAngle,
  endAngle,
  midAngle,
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
  const { position } = payload;
  return (
    <g className="pie-shapes-sector">
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
      {renderLabel(
        { cx, cy, startAngle, innerAngle, midAngle, radius },
        payload
      )}
    </g>
  );
};

PieShapesSector.defaultProps = {
  renderLabel: () => null,
};

export default PieShapesSector;
