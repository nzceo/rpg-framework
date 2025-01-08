import React, { useContext, useEffect, useState } from "react";
import Game, { ITurn } from "../../core/game/game";
import config from "../../core/custom.rpg.config";
import { ctx } from "./context";

export const useGame = () => {
  const {
    game,
    displayState,
    optionsState,
    gameCounter,
    setGameCounter
  } = useContext(ctx);

  const increaseGameCounter = () => {
    setGameCounter(gameCounter + 1);
  };

  return {
    displayState: displayState as ITurn["display"],
    optionsState,
    turn: increaseGameCounter,
    started: gameCounter > 0,
    gameCounter,
    game
  };
};