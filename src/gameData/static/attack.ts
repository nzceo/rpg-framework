import Character from "../../core/character/character";
import Game from "../../core/game";

/**
 * Logic for attacks
 */
const attack = (
  attacker: Character,
  attackee: Character,
  governingSkill: string,
  game: Game
) => {
  const armorDT = attackee.armor.damageThreshold;
  const adjustedDT = Math.max(0, armorDT);
  const weaponDamage = attacker.weapon.damage;
  const skillValue =
    // @ts-ignore
    attacker.skills[governingSkill];
  // @ts-ignore
  const damage = weaponDamage * skillValue;
  const damAdjusted =
    damage *
    // Change with damage resistance from equip
    armorDT;
  const damAdjusted2 = Math.max(damAdjusted * 0.2, damAdjusted * adjustedDT);

  attackee.damage(damAdjusted2);
};

export default attack;
