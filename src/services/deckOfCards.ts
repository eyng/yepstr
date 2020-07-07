import { URL } from "./constants";
import { CardClass } from "core/CardClass";
import { fetchUrl } from "./utils";

export const getNewDeckId = async () => {
  const data = await fetchUrl(URL.NEWDECK);
  const { deck_id, remaining } = data;
  return { deckId: deck_id, remaining };
};

export const drawCard = async (deckId: string): Promise<CardClass | null> => {
  const data = await fetchUrl(URL.DRAWCARD(deckId));

  if (data && data.cards && data.cards.length > 0) {
    const card = data.cards[0];
    return new CardClass(card, data.remaining);
  }

  return null;
};
