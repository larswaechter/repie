import { useState } from "react";

import Pie from "./components/Pie/Pie";
import PieDropdown from "./components/Pie/Dropdown/";
import PieChart from "./components/Pie/PieChart";
import ResponsiveContainer from "./components/Pie/ResponsiveContainer";
import PieShapesWeight from "./components/Pie/Shapes/Weight";
import { polarToCartesian } from "./components/Utility/Utility";

const renderLabel = ({ cx, cy, radius, midAngle }, payload) => {
  const { weight } = payload;
  const [x, y] = polarToCartesian(cx, cy, 0.5 * radius, midAngle, 0);

  return <PieShapesWeight cx={x} cy={y} weight={weight} />;
};

const App = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleDropdownClick = (action) => {
    console.log(action);
    setActiveIndex(-1);
    setShowDropdown(false);
  };

  const handlePieClick = (payload, e) => {
    console.log("click!");
  };

  const handlePieContextMenu = (payload, e) => {
    e.preventDefault();
    if (payload.position !== activeIndex) setActiveIndex(payload.position);
    setDropdownPosition({ left: e.pageX, top: e.pageY });
    setShowDropdown(true);
  };

  const handlePieMouseOver = (payload, e) => {
    if (!showDropdown) setActiveIndex(payload.position);
  };

  const handlePieMouseLeave = (payload) => {
    if (!showDropdown) setActiveIndex(-1);
  };

  return (
    <div className="App" style={{ padding: 30 }}>
      {showDropdown && activeIndex >= 0 ? (
        <PieDropdown
          position={dropdownPosition}
          handleClick={handleDropdownClick}
          source={{ name: "Java", assigned: true }}
        />
      ) : null}
      <ResponsiveContainer>
        <PieChart height={120} width={120}>
          <Pie
            radius={55}
            activeIndex={activeIndex}
            renderLabel={renderLabel}
            onClick={handlePieClick}
            onContextMenu={handlePieContextMenu}
            onMouseOver={handlePieMouseOver}
            onMouseLeave={handlePieMouseLeave}
            data={[
              { name: "Java", weight: 3 },
              { name: "Git", weight: 2 },
              { name: "SQL", weight: 1 },
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
