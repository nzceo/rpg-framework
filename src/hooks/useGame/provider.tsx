import Game from "@/core/game";
import { ITurn } from "@/core/types";
import { useEffect, useRef, useState } from "react";
import { ctx } from './context'
import config from "../../core/custom.rpg.config";

export const GameContextProvider = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    const gameRef = useRef<Game | undefined>();
  
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
  
    useEffect(() => {
      gameRef.current = new Game(config);
  
      /**
       * Populate initial state
       */
      setDisplayState([{ text: "Welcome to the game.", type: "flavor" }]);
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
  