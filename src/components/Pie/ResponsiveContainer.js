const ResponsiveContainer = ({ height, width, children }) => {
  return (
    <div
      style={{ height, width, position: "relative" }}
      className="pie-responsive-container"
    >
      {children}
    </div>
  );
};

ResponsiveContainer.defaultProps = {
  height: "100%",
  width: "100%",
};

export default ResponsiveContainer;
