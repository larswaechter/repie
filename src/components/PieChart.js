import { cloneElement } from "react";

const PieChart = ({ height, width, children, margin }) => {
  const { top, right, bottom, left } = margin;
  return (
    <svg
      cx="50%"
      cy="50%"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pie-chart"
      style={{
        marginTop: top,
        marginRight: right,
        marginBottom: bottom,
        marginLeft: left,
      }}
    >
      {cloneElement(children, { cx: width / 2, cy: height / 2 })}
    </svg>
  );
};

PieChart.defaultProps = {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

export default PieChart;
