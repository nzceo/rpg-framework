import { Skills } from "./ICharacter";

export interface IWeapon {
  type: "weapon";
  /**
   * The weapon's name
   */
  name: string;
  /**
   * The weapon's base damage
   */
  damage: number;
  /**
   * What skill the weapon uses
   */
  governingSkill: Skills;
}
