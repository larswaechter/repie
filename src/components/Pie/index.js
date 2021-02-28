import { Fragment, useState, useEffect, useCallback } from "react";

import Sector from "./Sector";
import { polarToCartesian, percentToDegree } from "../Utility/Utility";

const renderLabel = (cx, cy, startAngle, innerAngle, radius, weight) => {
  // Center section of angle
  const [x, y] = polarToCartesian(
    cx,
    cy,
    0.5 * radius,
    startAngle,
    innerAngle / 2
  );

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

  return <circle cx={x} cy={y} r={weightRadius} fill="#676a6d" />;
};

const colors = ["#e9ecef", "#bde0fe", "#E1CE7A", "yellow"];

const Pie = ({
  data,
  cx,
  cy,
  radius,
  activeIndex,
  onClick,
  onContextMenu,
  onMouseOver,
  onMouseLeave,
}) => {
  const [sections, setSections] = useState([]);

  /*
  const onClick = useCallback((payload, e) => {
    console.log(payload);
  }, []);
  */

  const createSections = useCallback(() => {
    const _sections = [];

    // Sizes for each section
    const sectionSizePercent = 100 / data.length;
    const sectionSizeDegree = percentToDegree(sectionSizePercent);

    // set the start angle to center the first section on the top
    let startAngle =
      sectionSizePercent !== 100 ? 360 - sectionSizeDegree / 2 : 0;

    // set start position for start drawing the pie sections
    let [startX, startY] = polarToCartesian(cx, cy, radius, startAngle, 0);

    // create sections
    for (let i = 0; i < data.length; i++) {
      const endAngle = startAngle + sectionSizeDegree;

      // coordinates where sections ends
      const [endX, endY] = polarToCartesian(
        cx,
        cy,
        radius,
        startAngle,
        sectionSizeDegree
      );

      // content
      const path = `M${cx},${cy}  L${startX},${startY}  A${radius},${radius} 0 ${
        sectionSizeDegree < 180 ? 0 : 1
      },1 ${endX},${endY} z`;

      _sections.push(
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle > 360 ? endAngle - 360 : endAngle}
          innerAngle={sectionSizeDegree}
          path={path}
          fill={i === activeIndex ? "#f6f7f8" : colors[i]}
          stroke="#f48668"
          radius={radius}
          payload={{ ...data[i], position: i }}
          onClick={onClick}
          onContextMenu={onContextMenu}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          renderLabel={renderLabel}
        />
      );

      // start drawing of next section where the current one has ended
      const newStartAngle = startAngle + sectionSizeDegree;
      startAngle = newStartAngle > 360 ? newStartAngle - 360 : newStartAngle;
      startX = endX;
      startY = endY;
    }
    setSections(_sections);
  }, [
    data,
    activeIndex,
    onClick,
    onContextMenu,
    onMouseOver,
    onMouseLeave,
    cx,
    cy,
    radius,
  ]);

  useEffect(() => {
    createSections();
  }, [data, createSections]);

  return <Fragment>{sections.map((pie) => pie)}</Fragment>;
};

export default Pie;
