import Game from "../game";
import { ICharacter } from "./ICharacter";

export type Message = string | string[] | ((game: Game) => string | string[]);

export interface RandomMessagesSet {
  m: Message;
  display: (game: Game) => boolean;
}

export interface IGameState {
  [id: string]: {
    flags: {
      [flagId: string]: string;
    };
    statuses: {
      [statusId: string]: any;
    };
    quests: {
      [questId: string]: any;
    };
    completedQuests: {
      [questId: string]: any;
    };
    combat: ICharacter["combat"];
  };
}
