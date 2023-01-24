import React from "react";
import "./Chip.css";
import { GrFormClose } from "react-icons/gr";

const Chip = (props) => {
  return (
    <div className="chip" style={{ backgroundColor: props.color }}>
      {props.text}
      {props.close && (
        <GrFormClose
          onClick={() => (props.onClose ? props.onClose() : "")}
          size={20}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default Chip;
