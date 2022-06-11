import archetypes from "../gameData/archetypes";
import attack from "../gameData/static/attack";
import townMaps from "../gameData/maps/town";
import Actor from "./actor/actor";
import Character from "./character/character";
import armors from "../gameData/static/armors";
import levels from "./data/levels";
import encounter from "./data/encounters";
import weapons from "../gameData/static/weapons";
import render from "../gameData/static/render";
import MapClass from "./map/map";
import player from "./player/player";
import Quest from "./quest/quest";
import fertile from "./status/fertile";
import Status from "./status/status";
import { IConfig } from "./rpg.config";
import stats from "../gameData/static/stats";

export const config: IConfig = {
  maps: [...townMaps],
  defaultMap: townMaps[0],
  defaultWeapon: weapons.unarmed,
  defaultArmor: armors.clothes,
  levels,
  attack,
  encounter,
  render,
  player: {
    name: "Hero",
    dialogRef: "",
    purity: 100,
    mapRef: townMaps[0].id,
    checkpointRef: townMaps[0].id,
    experience: {
      ...levels[0],
      current: 0
    },
    levelData: levels,
    combat: stats.player,
    description: archetypes.player
  },
  statuses: {
    fertile
  },
  quests: {},

  classes: {
    player,
    actor: Actor,
    character: Character,
    map: MapClass,
    quest: Quest,
    status: Status
  }
};

export default config;
