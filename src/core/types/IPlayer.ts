import { ICharacter } from "./ICharacter";

export interface IPlayer extends ICharacter {
  /**
   * Reference to the currently loaded map
   */
  mapRef: string;

  /**
   * Last map checkpoint
   */
  checkpointRef: string;

  /**
   * The player' purity, lower results in more slutty behavior
   */
  purity: number;

  /**
   * Current dialog index ref
   */
  dialogRef: string;

  experience: {
    /**
     * Current player level
     */
    level: number;
    /**
     * Current amount of experience
     */
    current: number;
    /**
     * Experience needed for next level
     */
    next: number;
  };

  levelData: {
    level: number;
    next: number;
  }[];
}
