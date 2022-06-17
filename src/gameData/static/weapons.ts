import { IWeapon } from "../../core/types/IWeapon";

const weapons: {
  [name: string]: IWeapon;
} = {
  unarmed: {
    type: "weapon",
    name: "bare fists",
    damage: 1,
    governingSkill: "stamina"
  },
  sword: {
    type: "weapon",
    name: "simple sword",
    damage: 2,
    governingSkill: "strength"
  }
};

export default weapons;
