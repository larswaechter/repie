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

const colors = ["#e9ecef", "#bde0fe", "#AC3931", "yellow"];

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

  const createPies = useCallback(() => {
    const _sections = [];
    const sizeInPercent = 100 / data.length;

    // does this really work???
    let from =
      sizeInPercent !== 100 ? 360 - percentToDegree(sizeInPercent) / 2 : 0;

    // Set start position for start drawing the pie sections
    let [startX, startY] = polarToCartesian(cx, cy, radius, from, 0);

    for (let i = 0; i < data.length; i++) {
      const sizeInDeg = percentToDegree(sizeInPercent);
      const [x, y] = polarToCartesian(cx, cy, radius, from, sizeInDeg);

      const path = `M${cx},${cy}  L${startX},${startY}  A${cx},${cy} 0 0,1 ${x},${y} z`;
      const tmpNewEndAngle = from + sizeInDeg;

      _sections.push(
        <Sector
          cx={cx}
          cy={cy}
          startAngle={from}
          endAngle={
            tmpNewEndAngle > 360 ? tmpNewEndAngle - 360 : tmpNewEndAngle
          }
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

      const tmpNewFrom = from + sizeInDeg;
      from = tmpNewFrom > 360 ? tmpNewFrom - 360 : tmpNewFrom;
      startX = x;
      startY = y;
    }
    setSections(_sections);
  }, [data, activePie, onMouseOver, onMouseLeave, onClick, cx, cy, radius]);

  useEffect(() => {
    createPies();
  }, [data, createPies]);

  return <Fragment>{sections.map((pie) => pie)}</Fragment>;
};

export default Pie;
