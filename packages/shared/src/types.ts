export interface GameState {
  score: number;
  round: number;
}

export interface Card {
  suit: string;
  value: number | number[];
  label: string;
}

export interface Helps {
  discards: number;
  draws: number;
}
export interface Player {
  name: string;
  deck: Card[];
  hand: Card[];
  discard: Card[];
  score: number;
  helps: Helps;
}
