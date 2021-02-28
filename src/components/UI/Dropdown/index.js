import { useRef } from "react";

import useOutsideAlerter from "../../Utility/Hooks/useOutsideAlerter";

const Dropdown = ({ position, handleClose, children }) => {
  const style = { ...position };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClose);

  return (
    <div className="dropdown-menu show" ref={wrapperRef} style={style}>
      {children}
    </div>
  );
};

export default Dropdown;
