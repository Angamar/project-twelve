import { GameState } from "./types";

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
