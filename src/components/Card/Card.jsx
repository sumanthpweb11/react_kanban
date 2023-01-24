import React, { useState } from "react";
import "./Card.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Chip from "../Chip/Chip";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";

const Card = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <CardInfo
          updateCard={props.updateCard}
          boardId={props.boardId}
          card={props.card}
          onClose={() => setShowModal(false)}
        />
      )}

      <div
        className="card"
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onClick={() => setShowModal(true)}
      >
        {/* CARD TOP */}
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((item, index) => {
              return <Chip key={index} text={item.text} color={item.color} />;
            })}
          </div>
          <div className="card_top_more" onClick={() => setShowDropdown(true)}>
            <FiMoreHorizontal style={{ cursor: "pointer" }} />

            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() =>
                      props.removeCard(props.card?.id, props.boardId)
                    }
                  >
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>

        {/* CARD TITLE */}
        <div className="card_title">{props.card?.title}</div>
        {/* CARD FOOTER */}
        <div className="card_footer">
          {props.card?.date && (
            <p>
              <AiOutlineClockCircle /> {props.card?.date}
            </p>
          )}

          {props.card?.tasks?.length > 0 && (
            <p>
              <IoMdCheckmarkCircleOutline />
              {props.card?.tasks?.filter((item) => item.completed).length}/
              {props.card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
