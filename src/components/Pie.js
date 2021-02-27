import { Fragment, useState, useEffect, useCallback } from "react";

import Sector from "./Sector";
import { polarToCartesian, percentToDegree } from "./Utility";

const renderLabel = (cx, cy, startAngle, innerAngle, radius, weight) => {
  // Center of angle
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

const Pie = ({ data, cx, cy, radius }) => {
  const [activePie, setActivePie] = useState(-1);
  const [sections, setSections] = useState([]);

  const onMouseOver = useCallback((payload, e) => {
    setActivePie(payload.position);
  }, []);

  const onMouseLeave = useCallback((payload) => {
    setActivePie(-1);
  }, []);

  const onClick = useCallback((payload) => {
    console.log(payload);
  }, []);

  const createSections = useCallback(() => {
    const _sections = [];
    const sizeInPercent = 100 / data.length;

    let startAngle =
      sizeInPercent !== 100 ? 360 - percentToDegree(sizeInPercent) / 2 : 0;

    // Set start position for start drawing the pie sections
    let [startX, startY] = polarToCartesian(cx, cy, radius, startAngle, 0);

    // Create sections
    for (let i = 0; i < data.length; i++) {
      const sizeInDeg = percentToDegree(sizeInPercent);
      const endAngle = startAngle + sizeInDeg;

      // Coordinates where sections ends
      const [x, y] = polarToCartesian(cx, cy, radius, startAngle, sizeInDeg);

      const path = `M${cx},${cy}  L${startX},${startY}  A${radius},${radius} 0 ${
        sizeInDeg < 180 ? 0 : 1
      },1 ${x},${y} z`;

      _sections.push(
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle > 360 ? endAngle - 360 : endAngle}
          innerAngle={sizeInDeg}
          path={path}
          fill={i === activePie ? "#f6f7f8" : colors[i]}
          stroke="#f48668"
          radius={radius}
          payload={{ ...data[i], position: i }}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          renderLabel={renderLabel}
        />
      );

      const newStartAngle = startAngle + sizeInDeg;
      startAngle = newStartAngle > 360 ? newStartAngle - 360 : newStartAngle;
      startX = x;
      startY = y;
    }
    setSections(_sections);
  }, [data, activePie, onMouseOver, onMouseLeave, onClick, cx, cy, radius]);

  useEffect(() => {
    createSections();
  }, [data, createSections]);

  return <Fragment>{sections.map((pie) => pie)}</Fragment>;
};

export default Pie;
