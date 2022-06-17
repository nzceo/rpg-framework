import React from "react";
import Game, { ITurn } from "../../core/game/game";

export const ctx = React.createContext(
  {} as {
    game: Game;
    displayState: ITurn["display"];
    setDisplayState: React.Dispatch<React.SetStateAction<ITurn["display"]>>;
    optionsState: ITurn["options"];
    setOptionsState: React.Dispatch<React.SetStateAction<ITurn["options"]>>;
    // gameState: ITurn;
    // setGameState: React.Dispatch<React.SetStateAction<ITurn>>;
    gameCounter: number;
    setGameCounter: React.Dispatch<React.SetStateAction<number>>;
  }
);
