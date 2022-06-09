import { IWeapon } from "./IWeapon";
import { IArmor } from "./IArmor";
import { IFertility } from "./IFertility";

export type Skills =
  | "endurance"
  | "stamina"
  | "strength"
  | "intelligence"
  | "dexterity";

export type Races = "orc" | "goblin" | "human" | "elf";

export interface ICharacter {
  /**
   * Character id
   */
  id?: string;

  /**
   * Character name
   */
  name: string;

  /**
   * Generic information about the character
   */
  description: {
    race: Races;
    pronouns: string;
    sex: "male" | "female";
    appearance: string;
  };

  /**
   * Equipped weapon
   */
  weapon?: IWeapon;

  /**
   * Equipped armor
   */
  armor?: IArmor;

  /**
   * General combat stats
   */
  combat: {
    /**
     * Player hp
     */
    hitPoints: {
      /**
       * Total hp
       */
      base: number;
      /**
       * Current hp
       */
      current: number;
    };

    /**
     * Lust level of character, used for sex stuff
     */
    lust: number;

    /**
     * Base skills
     */
    skills: {
      [key in Skills]: number;
    };
  };

  /**
   * Data used for sex
   */
  fertility?: IFertility;
}
