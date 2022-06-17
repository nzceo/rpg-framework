import React from "react";
import Game, { ITurn } from "../../core/game/game";

export const ctx = React.createContext(
  {} as {
    game: Game;
    gameState: ITurn;
    setGameState: React.Dispatch<React.SetStateAction<ITurn>>;
    gameCounter: number;
    setGameCounter: React.Dispatch<React.SetStateAction<number>>;
  }
);
