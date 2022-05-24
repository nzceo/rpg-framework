import { ICharacter } from "./ICharacter";

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
