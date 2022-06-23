import Player from "../player/player";
import { IGameState } from "../types/IGame";
import defaultConfig, { IConfig } from "../rpg.config";
import gameConfig from "../custom.rpg.config";
import attack from "../../gameData/static/attack";
import Character from "../character/character";
import { ICharacter } from "../types/ICharacter";
import { merge } from "lodash";
import playerSubmit from "../../gameData/static/combat/submit";
import acceptSubmit from "../../gameData/static/combat/acceptSubmit";
import submissionSex from "../../gameData/static/combat/submissionSex";
import weapons from "../../gameData/static/weapons";
import armors from "../../gameData/static/armors";
import getUuid from "uuid-by-string";
import { IPlayerItem } from "core/types";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.locale("en");
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  months: "Morning Star_Sun's Dawn_First Seed_Rain's Hand_Second Seed_Midyear_Sun's Height_Last Seed_Heartfire_Frostfall_Sun's Dusk_Evening Star".split(
    "_"
  ) // months Array
});

export interface ITurn {
  display: { text: string; type: "flavor" | "dialog"; date?: dayjs.Dayjs }[];
  options: { text: string; action: () => any }[];
}

class Game {
  config: IConfig;
  /**
   * Current game state
   */
  state: IGameState = {};

  playerData?: Player;

  /**
   * Static references of externally loaded data.
   */
  dataSets = {
    playerSubmit,
    acceptSubmit,
    submissionSex,
    weapons: Object.entries(weapons).map(([name, weapon]) => ({
      ...weapon,
      id: getUuid(`weapon-${name}`),
      key: name
    })),
    armors: Object.entries(armors).map(([name, armor]) => ({
      ...armor,
      id: getUuid(`armor-${name}`),
      key: name
    }))
  };

  constructor(
    config: {
      levels?: IConfig["levels"];
      render?: IConfig["render"];
      attack?: IConfig["attack"];
      encounter?: IConfig["encounter"];
      classes?: IConfig["classes"];
    } & Omit<
      IConfig,
      "levels" | "render" | "attack" | "encounter" | "classes"
    > = {
      ...gameConfig,
      maps: defaultConfig.maps,
      defaultMap: defaultConfig.defaultMap,
      statuses: defaultConfig.statuses,
      quests: defaultConfig.quests
    }
  ) {
    this.config = merge(config, {
      levels: gameConfig.levels,
      attack,
      encounter: gameConfig.encounter,
      classes: gameConfig.classes
    }) as IConfig;
  }

  /**
   * Returns your fairy's name
   */
  get fairyName() {
    return "Pluck";
  }

  get player() {
    return this.playerData!;
  }

  init() {
    this.playerData = new this.config.classes.player(this);
  }

  save() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  load() {
    const tempState = localStorage.getItem("state");
    if (tempState) {
      this.state = JSON.parse(tempState) as IGameState;
    }
    this.init();
  }

  /**
   * Return a map matching an id
   * @param id the map's id
   */
  findMap(id: string) {
    return this.config.maps.filter((map) => id === map.id);
  }

  enemyData: Character[] = [];

  /**
   * Remove an enemy from the current enemy array
   * @param id id of the enemy to remove
   */
  removeEnemy(id: string) {
    this.enemyData = this.enemyData.filter((enemy) => {
      return enemy.id !== id;
    });
  }

  /**
   * Add enemy to current enemy array
   */
  addEnemy(character: ICharacter) {
    this.enemyData.push(
      new this.config.classes.character(this, character.id!, character)
    );
  }

  /**
   * End combat, also rewards player with exp and other things
   */
  endCombat() {
    if (this.player.state === "combat" && this.enemyData.length === 0) {
      this.player.switchState("normal");
    }
  }

  /**
   * Array containing any number of extra display dialog
   * that should be rendered. Do not use this, use `addToExtraDisplay`
   * to add to this array.
   *
   * It will be cleaned every turn.
   */
  extraDisplay: ITurn["display"] = [];

  /**
   * Add object to `extraDisplay` array.
   */
  addToExtraDisplay(value: ITurn["display"][0]) {
    this.extraDisplay.push({
      ...value,
      date: dayjs("0238-06-17T00:00:00.000Z").add(this.day, "day")
    });
  }

  /**
   * Array containing any number of extra dialog options
   * that should be rendered. Any class that wants to print
   * something to the options should push it to this array.
   *
   * It will be cleaned every turn.
   */
  extraOptions: ITurn["options"] = [];

  /**
   * Turn advances the game' logic. Will return current maps
   * and actors that can be interacted with.
   * Eventually combat will also be handled here (?)
   */
  turn() {
    this.player.activeStatuses.forEach((status) => {
      status.eachTurn();
    });
    const output = this.config.render(this);
    this.extraDisplay = [];
    this.extraOptions = [];
    this.endCombat();

    return {
      ...output,
      display: output.display.map((d) => ({
        ...d,
        date: d.date
          ? d.date
          : dayjs("0238-06-17T00:00:00.000Z").add(this.day, "day")
      }))
    };
  }

  day: number = 0;
  daysToSleep: number = 0;

  /**
   * Sleep for X days
   * @param days - number of days to sleep, defaults to 1
   */
  sleep(days: number = 1) {
    this.daysToSleep = days;
    for (let i = 0; i < this.daysToSleep; i++) {
      this.day = this.day + 1;
      this.player.activeStatuses.forEach((status) => {
        // @ts-ignore
        status.eachDay();
      });
    }
  }

  resetDaysToSleep() {
    this.daysToSleep = 0;
  }

  /**
   * Finds an item with a specific key
   * @param key - what the object was named in the datasets e.g. `leatherArmor: {}`
   */
  findItem(key: string): IPlayerItem {
    return [...this.dataSets.armors, ...this.dataSets.weapons].find(
      (x) => x.key === key
    )!;
  }

  /**
   * Finds an item with a specific id
   * @param id - the unique item id
   */
  findItemById(id: string) {
    return [...this.dataSets.armors, ...this.dataSets.weapons].find(
      (x) => x.id === id
    );
  }
}

export default Game;
