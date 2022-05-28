import { IWeapon } from "./IWeapon";
import { IArmor } from "./IArmor";

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
   *
   */
  description: {
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
     * Player mana points
     */
    manaPoints: {
      /**
       * Total mp
       */
      base: number;
      /**
       * current hp
       */
      current: number;
    };
    /**
     * Base skills
     */
    skills: {
      endurance: number;
      stamina: number;
      oneHanded: number;
      ranged: number;
      speech: number;
      intelligence: number;
    };
  };
}
