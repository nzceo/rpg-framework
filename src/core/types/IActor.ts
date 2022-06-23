import { ICharacter } from "./ICharacter";
import { IDialog } from "./IDialog";
import { IDisappearing } from "./IDisappearing";

export interface IActor extends IDisappearing, ICharacter {
  /**
   * This actor's unique ID
   */
  id: string;

  /**
   * Overrides the `Talk to` text
   */
  customAction?: string;
  /**
   * Actor dialogue
   */
  dialog: IDialog[];
}
