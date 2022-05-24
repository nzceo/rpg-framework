import { ICharacter } from "../types/ICharacter";
import archetypes from "./archetypes/character";
import stats from "./stats";

const enemies: { [name: string]: ICharacter } = {
  testEnemy: {
    id: "testEnemy1",
    name: "Enemy 1",
    description: archetypes.normalMan,
    combat: stats.weak
  }
};

export default enemies;
