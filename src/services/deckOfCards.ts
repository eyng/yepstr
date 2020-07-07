import { URL } from "./constants";
import { fetchUrl } from "./utils";

export const getNewDeckId = async () => {
  const data = await fetchUrl(URL.NEWDECK);
  const { deck_id, remaining } = data;
  return { deckId: deck_id, remaining };
};

// todo: handle: if no card returned
export const drawCard = async (deckId: string) => {
  const data = await fetchUrl(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  const card = data.cards[0];
  console.log("*** card:", card);

  return {
    image: card.image,
    value: card.value,
    suit: card.suit,
    remaining: data.remaining,
  };
};
