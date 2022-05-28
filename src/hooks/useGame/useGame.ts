import React, { useEffect, useState } from "react";
import Game, { ITurn } from "../../core/game/game";
import config from "../../core/rpg.config";

const useGame = () => {
  const [gameCounter, setGameCounter] = useState(0);
  const [gameState, setGameState] = useState<ITurn>({
    display: [],
    options: []
  });
  const gameRef = React.useRef<any | undefined>();

  React.useEffect(() => {
    gameRef.current = new Game(config);

    /**
     * Populate initial state
     */
    setGameState({
      display: [{ text: "Welcome to the game.", type: "flavor" }],
      options: [
        {
          text: "Load",
          action: () => {
            gameRef.current!.load();
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            increaseGameCounter();
          }
        }
      ]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increaseGameCounter = () => {
    setGameCounter(gameCounter + 1);
  };

  useEffect(() => {
    if (gameCounter > 0) {
      setGameState(gameRef.current!.turn());
    }
  }, [gameCounter]);

  return {
    gameState,
    turn: increaseGameCounter
  };
};

export default useGame;
