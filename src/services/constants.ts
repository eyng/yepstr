const MAIN = "https://deckofcardsapi.com/api/deck/";

export const URL = {
  NEWDECK: MAIN + "new/shuffle/?deck_count=1",

  DRAWCARD: (deckId: string) => `${MAIN}${deckId}/draw/?count=1`,
};
