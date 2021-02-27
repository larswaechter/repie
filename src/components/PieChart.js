import { cloneElement } from "react";

const Surface = ({ height, width, children }) => {
  return (
    <svg
      cx="50%"
      cy="50%"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pie-chart"
    >
      {cloneElement(children, { cx: width / 2, cy: height / 2 })}
    </svg>
  );
};

export default Surface;
