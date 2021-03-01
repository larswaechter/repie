import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * https://stackoverflow.com/questions/32553158/
 */
const useOutsideAlerter = (ref, cb) => {
  useEffect(() => {
    // Alert if clicked on outside of element
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) cb();
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
};

export default useOutsideAlerter;
