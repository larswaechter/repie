import "./App.css";

import Pie from "./components/Pie";
import ResponsiveContainer from "./components/ResponsiveContainer";

import PieChart from "./components/PieChart";

const App = () => {
  return (
    <div className="App" style={{ padding: 30 }}>
      <ResponsiveContainer>
        <PieChart height={120} width={120}>
          <Pie radius={60} data={[{ name: "Java", weight: 3 }]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
