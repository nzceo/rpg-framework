import Player from "../player/player";
import { IGameState } from "../types/IGame";
import defaultConfig, { IConfig } from "../rpg.config";
import Character from "../character/character";
import { ICharacter } from "../types/ICharacter";
import { merge } from "lodash";

export interface ITurn {
  display: { text: string; type: "flavor" | "dialog" }[];
  options: { text: string; action: () => any }[];
}

class Game {
  config: IConfig;
  /**
   * Current game state
   */
  state: IGameState = {};

  playerData?: Player;

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
    > = defaultConfig
  ) {
    this.config = merge(config, {
      levels: defaultConfig.levels,
      render: defaultConfig.render,
      attack: defaultConfig.attack,
      encounter: defaultConfig.encounter,
      classes: defaultConfig.classes
    }) as IConfig;
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
   * that should be rendered. Any class that wants to print
   * something to the output should push it to this array.
   *
   * It will be cleaned every turn.
   */
  extraDisplay: ITurn["display"] = [];

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

    return output;
  }

  day: number = 0;
  daysToSleep: number = 0;

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
}

export default Game;
