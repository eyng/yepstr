import React, { useState, useEffect } from "react";
import { CardClass } from "core/CardClass";
import { ProgressBar } from "components";
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
  const [message, setMessage] = useState("");
  const [previousImage, setPreviousImage] = useState("");

  // EFFECTS - GET DATA:
  useEffect(() => {
    const fetchData = async () => {
      const { deckId } = await getNewDeckId();
      setDeckId(deckId);

      const card = await drawCard(deckId);

      if (card) {
        setCard(card);
      } else {
        setMessage("No card received");
      }
    };
    fetchData();
    return () => {}; // on unmount
    // https://github.com/facebook/create-react-app/issues/6880
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FUNCTIONS:
  const onButtonClick = async (compare: number) => {
    if (remaining === 0) {
      setMessage("");
      return;
    }

    const card = await drawCard(deckId);

    if (card) {
      const { value: newValue } = card;

      if (compare === getCompare(newValue, value)) {
        setScore(score + 1);
        setMessage("Correct");
      } else {
        setMessage("Incorrect");
      }

      setCard(card);
    } else {
      setMessage("No card received");
    }
  };

  const setCard = (card: CardClass) => {
    setPreviousImage(image);
    const { image: newImage, value, remaining } = card;
    setImage(newImage);
    setValue(value);
    setRemaining(remaining);
  };

  // Current implementation:
  //   Only consider the value. The suit is ignored.
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

      <div className="flexRowStretch">
        <img className={s.image} alt={value} src={image} />
        <img alt={value} src={previousImage} className={s.smallImage} />
      </div>

      <div className="flexRow">
        <div>
          <button onClick={() => onButtonClick(-1)}>Lower</button>
        </div>
        <div>
          <button onClick={() => onButtonClick(1)}>Higher</button>
        </div>
        <div className={message === "Correct" ? s.correct : s.incorrect}>
          {message}
        </div>
      </div>

      <ProgressBar
        correct={score}
        incorrect={51 - remaining - score}
        total={51}
      />
    </div>
  );
};

export default CardGame;
