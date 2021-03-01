import { Fragment, useState, useEffect, useCallback } from "react";

import {
  polarToCartesian,
  percentToDegree,
  trimAngle,
} from "../Utility/Utility";

import PieShapesSector from "./Shapes/Sector";

const colors = ["#e9ecef", "#bde0fe", "#E1CE7A", "yellow"];

const Pie = ({
  data,
  cx,
  cy,
  radius,
  activeIndex,
  renderLabel,
  onClick,
  onContextMenu,
  onMouseOver,
  onMouseLeave,
}) => {
  const [sections, setSections] = useState([]);

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
      const endAngle = trimAngle(startAngle + sectionSizeDegree);

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
        <PieShapesSector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerAngle={sectionSizeDegree}
          midAngle={trimAngle(startAngle + sectionSizeDegree / 2)}
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
      startAngle = endAngle;
      startX = endX;
      startY = endY;
    }
    setSections(_sections);
  }, [
    data,
    activeIndex,
    renderLabel,
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
