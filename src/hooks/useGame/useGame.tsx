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

export const GameContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const gameRef = React.useRef<Game | undefined>();

  const [gameCounter, setGameCounter] = useState(0);
  const [displayState, setDisplayState] = useState<ITurn["display"]>([]);

  const [optionsState, setOptionsState] = useState<ITurn["options"]>([]);

  useEffect(() => {
    if (gameCounter > 0) {
      setDisplayState([...displayState, ...gameRef.current!.turn().display]);
      setOptionsState(gameRef.current!.turn().options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCounter]);

  React.useEffect(() => {
    gameRef.current = new Game(config);

    /**
     * Populate initial state
     */
    setDisplayState([
      {
        text: "Welcome to the game.",
        type: "flavor"
      }
    ]);
    setOptionsState([
      {
        text: "Load",
        action: () => {
          gameRef.current!.load();
          setGameCounter(gameCounter + 1);
        }
      }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ctx.Provider
      value={{
        game: gameRef.current!,
        optionsState,
        displayState,
        setOptionsState,
        setDisplayState,
        gameCounter,
        setGameCounter
      }}
    >
      {children}
    </ctx.Provider>
  );
};
