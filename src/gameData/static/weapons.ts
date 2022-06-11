import { IWeapon } from "../../core/types/IWeapon";

const weapons: {
  [name: string]: IWeapon;
} = {
  unarmed: {
    name: "bare fists",
    damage: 1,
    governingSkill: "stamina"
  },
  sword: {
    name: "simple sword",
    damage: 2,
    governingSkill: "strength"
  }
};

export default weapons;
