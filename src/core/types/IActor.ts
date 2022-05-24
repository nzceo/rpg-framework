import Actor from "../actor/actor";
import { ICharacter } from "./ICharacter";
import { IDialog } from "./IDialog";
import { IDisappearing } from "./IDisappearing";

export interface IActor extends IDisappearing<Actor>, ICharacter {
  /**
   * This actor's unique ID
   */
  id: string;
  /**
   * Actor dialogue
   */
  dialog: IDialog[];
}
