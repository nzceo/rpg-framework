import levels from "./data/levels";
import maps from "./data/maps";
import player from "./data/player";
import render from "./data/render";
import attack from "./data/handleAttack";
import weapons from "./data/weapons";
import armors from "./data/armors";
import encounter from "./data/encounters";
import TestableStatus from "../extras/statuses/testableStatus";
import DefeatTestEnemy from "../extras/quests/defeatTestEnemy";
import Player from "./player/player";
import Actor from "./actor/actor";
import Character from "./character/character";
import MapClass from "./map/map";
import Quest from "./quest/quest";
import Status from "./status/status";
import { IConfig } from "./rpg.config";
import fertile from "./status/fertile";

const mockedConfig: IConfig = {
  levels,
  maps,
  player,
  statuses: {
    testableStatus: TestableStatus,
    fertile
  },
  quests: {
    defeatTestEnemy: DefeatTestEnemy
  },
  render,
  attack,
  encounter,
  governingStats: {
    unarmed: "strength",
    oneHanded: "dexterity",
    ranged: "dexterity",
    twoHanded: "strength",
    poles: "dexterity",
    occult: "intelligence",
    lockPick: "perception",
    speech: "charisma",
    barter: "charisma",
    tinkering: "intelligence"
  },
  defaultWeapon: weapons.unarmed,
  defaultArmor: armors.clothes,
  defaultMap: maps[0],
  classes: {
    player: Player,
    actor: Actor,
    character: Character,
    map: MapClass,
    quest: Quest,
    status: Status
  }
};

export default mockedConfig;
