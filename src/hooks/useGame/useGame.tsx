import React, { useContext, useEffect, useState } from "react";
import Game, { ITurn } from "../../core/game/game";
import config from "../../core/custom.rpg.config";
import { ctx } from "./context";

export const useGame = () => {
  const { game, gameState, gameCounter, setGameCounter } = useContext(ctx);

  const increaseGameCounter = () => {
    setGameCounter(gameCounter + 1);
  };

  return {
    gameState,
    turn: increaseGameCounter,
    started: gameCounter > 0,
    game
  };
};

export const GameContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const gameRef = React.useRef<Game | undefined>();

  const [gameCounter, setGameCounter] = useState(0);
  const [gameState, setGameState] = useState<ITurn>({
    display: [],
    options: []
  });

  useEffect(() => {
    if (gameCounter > 0) {
      setGameState(gameRef.current!.turn());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCounter]);

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
            setGameCounter(gameCounter + 1);
          }
        }
      ]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ctx.Provider
      value={{
        game: gameRef.current!,
        gameState,
        setGameState,
        gameCounter,
        setGameCounter
      }}
    >
      {children}
    </ctx.Provider>
  );
};
