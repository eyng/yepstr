export class CardClass {
  image: string;
  value: string;
  suit: string;
  remaining: number;

  constructor(card: any, remaining: number) {
    this.image = card.image;
    this.value = card.value;
    this.suit = card.suit;

    this.remaining = remaining;
  }
}
