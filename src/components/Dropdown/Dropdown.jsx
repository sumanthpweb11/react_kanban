import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  const dropdownRef = useRef();

  const handleClick = (e) => {
    if (dropdownRef && !dropdownRef?.current?.contains(e?.target)) {
      if (props.onClose) props.onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        right: "0",
      }}
      ref={dropdownRef}
      className="dropdown"
    >
      {props.children}
    </div>
  );
};

export default Dropdown;
