import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Editable from "./components/Editable/Editable";

//  {
//       id: Date.now() + Math.random() * 2,
//       title: "To Do",
//       cards: [
//         {
//           id: Date.now() + Math.random(),
//           title: "Card 1",
//           tasks: [],
//           labels: [{ text: "frontend", color: "blue" }],
//           desc: "kjhjhkj",
//           date: "",
//         },

//         {
//           id: Date.now() + Math.random(),
//           title: "Card 2",
//           tasks: [],
//           labels: [{ text: "backend", color: "red" }],
//           desc: "kjhjhkj",
//           date: "",
//         },
//       ],
//     },

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("kanban")) || []
  );

  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });

  const addCard = (title, bid) => {
    const card = {
      id: Date.now + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (cid, bid) => {
    // return boards.filter((i) => i.id === bid).cards?.filter((item) => item.id !== cid);

    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title) => {
    setBoards([
      ...boards,
      { id: Date.now() + Math.random(), title, cards: [] },
    ]);
  };

  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid,
    });
  };

  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex].cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cIndex < 0) return;

    // make copy of source temp card as if we delete from source theres
    // nothing to put in targer

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);

    // push target card to next of existing card

    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoards);
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="app">
      {/* NAVBAR */}
      <div className="app_navbar">
        <h2>Kanban Board</h2>
      </div>
      {/* BOARDS */}
      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item) => {
            return (
              <Board
                key={item.id}
                board={item}
                removeBoard={removeBoard}
                addBoard={addCard}
                removeCard={removeCard}
                addCard={addCard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                updateCard={updateCard}
              />
            );
          })}

          <Editable
            onSubmit={(value) => addBoard(value)}
            text="Add Board"
            placeholder="Enter Board Title"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
