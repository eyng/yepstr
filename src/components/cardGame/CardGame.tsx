import React, { useState, useEffect } from "react";
import { getNewDeckId, drawCard } from "services/deckOfCards";
import s from "./CardGame.module.css";

const cards = [
  "ACE",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
];

// ----------
// COMPONENT:
const CardGame = () => {
  // STATE:
  const [deckId, setDeckId] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);

  // EFFECTS - GET DATA:
  useEffect(() => {
    const fetchData = async () => {
      const { deckId } = await getNewDeckId();
      setDeckId(deckId);

      const { image, value, remaining } = await drawCard(deckId);
      setImage(image);
      setValue(value);
      setRemaining(remaining);
    };
    fetchData();
    return () => {}; // on unmount
  }, []);

  // FUNCTIONS:
  const onButtonClick = async (compare: number) => {
    const { image, value: newValue, remaining } = await drawCard(deckId);

    console.log("*** guess:", compare);
    console.log("*** actual:", getCompare(newValue, value));

    if (compare === getCompare(newValue, value)) {
      setScore(score + 1);
    }

    setImage(image);
    setValue(value);
    setRemaining(remaining);
  };

  // QUESTION: USE VALUE ONLY? OR SUIT ALSO?
  // Current implementation:
  //   Only consider the value, and not the suit
  //   -1 for lower
  //    1 for higher
  //    0 for equal
  const getCompare = (value1: string, value2: string) => {
    const index1 = cards.indexOf(value1);
    const index2 = cards.indexOf(value2);
    if (index1 < index2) return -1;
    if (index1 > index2) return 1;
    return 0;
  };

  return (
    <div className={s.root}>
      <div className="flexRowStretch">
        <div>Cards left: {remaining}</div>
        <div>Correct guesses: {score}</div>
      </div>
      <br />

      <div>
        <img alt="" src={image} />
      </div>
      <br />

      <div className="flexRow">
        <div>
          <button onClick={() => onButtonClick(-1)}>Lower</button>
        </div>
        <div>
          <button onClick={() => onButtonClick(1)}>Higher</button>
        </div>
      </div>
    </div>
  );
};

export default CardGame;
