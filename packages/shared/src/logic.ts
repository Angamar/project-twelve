import { GameState, Player } from "./types";
import cards from "./cards";
import { shuffle } from "./utils";
import { evaluate } from "mathjs";

export function createInitialGameState(): GameState {
  return {
    score: 0,
    round: 1,
  };
}

export function updateScore(state: GameState, delta: number): GameState {
  return {
    ...state,
    score: state.score + delta,
  };
}

export function nextRound(state: GameState): GameState {
  return {
    ...state,
    round: state.round + 1,
  };
}

export function createInitialDeck() {
  return shuffle(cards);
}

export function createPlayer(name: string) {
  return {
    name: name,
    deck: createInitialDeck(),
    hand: [],
    discardPile: [],
    helps: {
      discards: 1,
      draws: 2,
    },
    score: 0,
  };
}

export function drawCard(player: Player) {
  const card = player.deck[0];

  return {
    ...player,
    deck: player.deck.slice(1),
    hand: [card, ...player.hand],
  };
}

export function evaluateMove(expression: string, target: number) {
  const result = evaluate(expression);
  return {
    result,
    isCorrect: result === target,
  };
}
