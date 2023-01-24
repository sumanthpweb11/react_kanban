import React, { useState } from "react";
import "./Editable.css";
import { GrFormClose } from "react-icons/gr";

const Editable = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(props.default || "");
  return (
    <div className="editable">
      {showEdit ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (props.onSubmit) props.onSubmit(inputValue);
            setShowEdit(false);
            setInputValue("");
          }}
        >
          <input
            autoFocus
            type="text"
            placeholder={props.placeholder || "Enter Item"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="editable_edit_footer">
            <button type="submit"> {props.buttonText || "Add"}</button>
            <GrFormClose
              onClick={() => setShowEdit(false)}
              size={30}
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setShowEdit(true)}
        >
          {props.text || "Add Item"}
        </p>
      )}
    </div>
  );
};

export default Editable;
