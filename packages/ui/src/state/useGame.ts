import { create } from "zustand";
import {
  createInitialGameState,
  nextRound,
  updateScore,
} from "@project-twelve/shared";

import { GameState } from "@project-twelve/shared";

interface SinglePlayerGame extends GameState {
  updateScore: (delta: number) => void;
  nextRound: () => void;
}

const useSingleplayerGame = create<SinglePlayerGame>((set) => ({
  ...createInitialGameState(),
  updateScore: (delta: number) => set((state) => updateScore(state, delta)),
  nextRound: () => set((state) => nextRound(state)),
}));

export default useSingleplayerGame;
