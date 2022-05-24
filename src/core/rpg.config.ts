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
import { IMapContructorArg } from "./types/Imap";
import { IPlayer } from "./types/IPlayer";
import Game, { ITurn } from "./game/game";
import { IWeapon } from "./types/IWeapon";
import { IArmor } from "./types/IArmor";

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

const config: IConfig = {
  levels,
  maps,
  player,
  statuses: {
    testableStatus: TestableStatus
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

export default config;
