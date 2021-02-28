import Dropdown from "../../UI/Dropdown/";

export const Actions = {
  assign: "assign",
  remove: "remove",
};

const PieDropdown = ({ position, source, handleClick }) => {
  const { name, assigned } = source;

  return (
    <Dropdown position={position} handleClose={() => handleClick()}>
      <h6 className="dropdown-header">{name}</h6>
      {assigned ? (
        <button
          className="dropdown-item"
          onClick={() => handleClick(Actions.remove)}
        >
          Remove
        </button>
      ) : (
        <button
          className="dropdown-item"
          onClick={() => handleClick(Actions.assign)}
        >
          Assign
        </button>
      )}
    </Dropdown>
  );
};

export default PieDropdown;
