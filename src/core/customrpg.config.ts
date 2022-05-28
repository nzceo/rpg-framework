import archetypes from "../gameData/archetypes";
import attack from "../gameData/attack";
import townMaps from "../gameData/maps/town";
import Actor from "./actor/actor";
import Character from "./character/character";
import armors from "./data/armors";
import levels from "./data/levels";
import render from "./data/render";
import stats from "./data/stats";
import encounter from "./data/encounters";
import weapons from "./data/weapons";
import Game from "./game/game";
import MapClass from "./map/map";
import player from "./player/player";
import Quest from "./quest/quest";
import fertile from "./status/fertile";
import Status from "./status/status";
import { IArmor, IPlayer, ITurn, IWeapon } from "./types";
import { IMapContructorArg } from "./types/Imap";

export interface IConfig {
  levels: {
    level: number;
    next: number;
  }[];
  maps: IMapContructorArg[];
  player: IPlayer;
  statuses: {
    [type: string]: any;
  };
  quests: {
    [id: string]: any;
  };
  render: (game: Game) => ITurn;
  attack: (
    attacker: Character,
    attackee: Character,
    governingSkill: string,
    game: Game
  ) => void;
  encounter: (game: Game, map: MapClass) => void;
  governingStats: {
    [name: string]: string;
  };
  defaultWeapon: IWeapon;
  defaultArmor: IArmor;
  defaultMap: IMapContructorArg;
  classes: {
    [className: string]: any;
  };
}

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
    mapRef: townMaps[0].id,
    checkpointRef: townMaps[0].id,
    experience: {
      ...levels[0],
      current: 0
    },
    levelData: levels,
    combat: stats.weak,
    description: archetypes.player
  },
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
