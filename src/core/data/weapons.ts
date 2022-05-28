import { IWeapon } from "../types/IWeapon";

const weapons: {
  [name: string]: IWeapon;
} = {
  unarmed: {
    name: "bare fists",
    damage: 1,
    governingSkill: "oneHanded"
  },
  sword: {
    name: "simple sword",
    damage: 2,
    governingSkill: "oneHanded"
  }
};

export default weapons;
