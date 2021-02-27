import "./App.css";

import Pie from "./components/Pie";
import PieChart from "./components/PieChart";
import ResponsiveContainer from "./components/ResponsiveContainer";

const App = () => {
  return (
    <div className="App" style={{ padding: 30 }}>
      <ResponsiveContainer>
        <PieChart height={120} width={120}>
          <Pie
            radius={55}
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
