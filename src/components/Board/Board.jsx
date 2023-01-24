import React from "react";
import "./Board.css";
import { FiMoreHorizontal } from "react-icons/fi";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="board">
      {/* BOARD TOP */}
      <div className="board_top">
        <p className="board_top_title">
          {props.board?.title} <span>{`${props.board?.cards?.length}`}</span>
        </p>
        <div className="board_top_more" onClick={() => setShowDropdown(true)}>
          <FiMoreHorizontal style={{ cursor: "pointer" }} />

          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <div className="board_dropdown">
                <p onClick={() => props.removeBoard(props.board?.id)}>
                  Delete Board
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      {/*  BOARD CARDS */}
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => {
          return (
            <Card
              key={item.id}
              className="card"
              card={item}
              removeCard={props.removeCard}
              boardId={props.board?.id}
              handleDragEnd={props.handleDragEnd}
              handleDragEnter={props.handleDragEnter}
              updateCard={props.updateCard}
            />
          );
        })}

        <Editable
          displayCard="board_add-card"
          text="Add Card"
          placeholder="Enter Card Title"
          onSubmit={(value) => props.addCard(value, props.board?.id)}
        />
      </div>
    </div>
  );
};

export default Board;
