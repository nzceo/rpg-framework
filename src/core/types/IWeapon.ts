import { Skills } from "./ICharacter";

export interface IWeapon {
  name: string;
  damage: number;
  governingSkill: Skills;
}
