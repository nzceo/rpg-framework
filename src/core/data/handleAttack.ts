import Character from "../character/character";
import Game from "../game/game";

/**
 * Logic for attacks
 */
export default (
  attacker: Character,
  attackee: Character,
  governingSkill: string,
  // @ts-ignore
  game: Game
) => {
  const armorDT = attackee.armor.damageThreshold;
  const adjustedDT = Math.max(0, armorDT);
  const weaponDamage = attacker.weapon.damage;
  const skillValue =
    // @ts-ignore
    attacker.skills[governingSkill];
  const damage = weaponDamage * skillValue;
  const damAdjusted =
    damage *
    1 *
    // Change with damage resistance from equip
    armorDT;
  const damAdjusted2 = Math.max(damAdjusted * 0.2, damAdjusted * adjustedDT);
  attackee.damage(damAdjusted2);

  console.log({
    governingSkill,
    skills: attacker.skills,
    skillValue
  });
};
