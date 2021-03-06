import Map from "../map/map";
import Game from "../game/game";
import Character from "../character/character";
import Actor from "../actor/actor";
import { cloneDeep, omit } from "lodash";
import Quest from "../quest/quest";
import Fertile from "../status/fertile";
import CustomEvent from "../event";
import Inventory from "./inventory";
import { IArmor, IFertility, IWeapon } from "../types";
import Roll from "roll";

type IPlayerState =
  | "combat"
  | "dialog"
  | "normal"
  | "menu"
  | "gameOver"
  | "custom";

/**
 * Player class, used as the center of the game
 */
class Player extends Character {
  /**
   * Actor the player is currently interacting with
   */
  currentDialog?: Actor;

  /**
   * Currently loaded map class
   */
  currentMap?: Map;

  /**
   * Quick references to functions that can
   * be used to perform state checks in dialogs
   */
  dialogHelpers = {
    ...this.fertility.dialogHelpers
  };

  inventory: Inventory;

  constructor(game: Game) {
    super(game!, "player", game!.config.player);
    this.generateCurrentMap();
    this.inventory = new Inventory(this);

    if (game) {
      this.initializeState();

      /**
       * Initialse any quests that have been saved
       * to state
       */
      const playerQuests = this.getState("quests");
      if (playerQuests) {
        Object.keys(playerQuests).forEach((key) => {
          this.addQuest(key);
        });
      }
    }
  }

  /**
   * Initialises game state for the player.
   * This is only useful when starting the game,
   * since we don't want these states to be empty.
   */
  initializeState() {
    // Initialise data state
    this.setState("data", {
      ...this.game.config.player,
      ...this.getState("data")
    });
    // Initialise status state
    this.setState("statuses", {
      ...{},
      ...this.getState("statuses")
    });
    // Initialise quest state
    this.setState("quests", {
      ...{},
      ...this.getState("quests")
    });
    // Initialise quest state
    this.setState("completedQuests", {
      ...{},
      ...this.getState("completedQuests")
    });
    // Initialise flags state
    this.setState("flags", {
      ...{},
      ...this.getState("flags")
    });
    // Initialise combat state
    this.setState("combat", {
      ...cloneDeep(this.data.combat),
      ...cloneDeep(this.game.state[this.id].combat)
    });
  }

  get name() {
    return this.getState("data.name");
  }
  set setName(val: string) {
    this.setState("data.name", val);
  }

  get purity() {
    return this.getState("data.purity");
  }

  /**
   * What the player is currently doing
   * Game outputs depend on this
   */
  state: IPlayerState = "normal";
  switchState(state: IPlayerState) {
    this.state = state;
  }

  /**
   * An event class, will be consumed as a custom state.
   */
  customState?: CustomEvent;

  /**
   * Allows setting a custom state to the player.
   */
  setCustomState(customEvent: typeof CustomEvent, data: any) {
    this.switchState("custom");
    // @ts-ignore
    this.customState = new customEvent(this.game, data);
  }

  /**
   * Experience stuff
   */
  get getExperience() {
    return this.getState("data.experience").current;
  }
  addExperience(exp: number) {
    this.setState("data.experience.current", +exp);
    this.checkLevelAdvance();
  }
  checkLevelAdvance() {
    if (this.getExperience >= this.getNextExperience) {
      this.setState("data.experience", {
        ...this.getState("data.experience"),
        ...this.getState("data.levelData")[
          this.getState("data.experience").level
        ]
      });
      this.checkLevelAdvance();
    }
  }
  set setLevel(level: number) {
    this.setState("data.experience.level", level);
  }
  get getLevel() {
    return this.getState("data.experience").level;
  }
  get getNextExperience() {
    return this.getState("data.experience").next;
  }

  /**
   * Dialog stuff
   */
  get dialog() {
    return this.currentDialog!;
  }
  set dialog(actor: Actor) {
    this.currentDialog = actor;
  }

  activeQuests: Quest[] = [];

  /**
   * Adds quest with id, if character
   * already has quest then nothing happens
   */
  addQuest(id: string) {
    try {
      const hasQuest =
        this.activeQuests.filter((quest) => {
          return quest.id === id;
        }).length > 0;
      if (!hasQuest) {
        // @ts-ignore
        const quest = this.game.config.quests[id];
        this.activeQuests.push(new quest(this.game, this));
      }
    } catch (err) {}
  }

  /**
   * Removes quest matching id
   */
  removeQuest(id: string) {
    const filteredQuests = this.quests.filter((quest) => {
      return quest.id !== id;
    });
    this.activeQuests = filteredQuests;
  }

  /**
   * Debug function, assigns an array of Quest classes
   * to the player
   */
  assignQuests(quests: Quest[]) {
    this.activeQuests = quests;
  }

  /**
   * Saves quest data to completedQuests state and removes
   * data from current quests
   */
  moveToCompletedQuests(quest: Quest) {
    this.setState(`completedQuests.${quest.id}`, {
      ...this.getState("completedQuests"),
      ...quest.questData
    });
    this.setState(`quests`, {
      ...omit(this.getState("quests"), quest.id)
    });
  }

  /**
   * Get player's quests
   */
  get quests() {
    return this.activeQuests;
  }

  /**
   * Map stuff
   */
  get map() {
    return this.currentMap!;
  }
  set map(map: Map) {
    this.currentMap = map;
  }
  /**
   * Generates the current player's map
   */
  generateCurrentMap() {
    if (this.game) {
      const currentMapRef =
        this.getState("mapRef") || this.game.config.defaultMap.id;
      const currentMap = this.game.findMap(currentMapRef)[0];
      this.currentMap = new this.game.config.classes.map(
        currentMap,
        true,
        this.game
      );
    }
  }
  /**
   * Travels player to a map matching the provided id
   * @param id the map's id
   */
  travelTo(id: string) {
    this.currentMap = new this.game.config.classes.map(
      this.game.findMap(id)[0],
      true,
      this.game
    );
  }

  /**
   * Attack the player
   * @param attacker - The character attacking
   * @param governingStat - The stat that governs the attack type
   */
  attack(attacker: Character, governingSkill: string) {
    this.game.config.attack(attacker, this, governingSkill, this.game);
  }

  /**
   * Returns true if character has less than 0 health
   */
  isDead() {
    return this.getState("combat").hitPoints.current <= 0;
  }
  get health() {
    return this.getState("combat").hitPoints.current;
  }
  set health(newHealth: number) {
    this.setState("combat.hitPoints.current", newHealth);
  }

  /**
   * Get player skills from state
   */
  get skills() {
    return this.getState("combat").skills;
  }

  /**
   * Get player attributes from state
   */
  get attributes() {
    return this.getState("combat").attributes;
  }

  /**
   * Return player weapon from state
   */
  get weapon(): IWeapon & {
    id: string;
  } {
    return this.getState("combat").weapon || this.game.config.defaultWeapon;
  }

  /**
   * Set player's weapon
   */
  set weapon(weapon: IWeapon | undefined) {
    this.setState("combat.weapon", weapon);
  }

  /**
   * Return player armor from state
   */
  get armor(): IArmor & {
    id: string;
  } {
    return this.getState("combat").armor || this.game.config.defaultArmor;
  }

  /**
   * Set player's armor
   */
  set armor(armor: IArmor | undefined) {
    this.setState("combat.armor", armor);
  }

  /**
   * Return player fertility status
   */
  get fertility(): Fertile {
    const fertilityState = this.activeStatuses.filter((status) => {
      return status.type === "fertile";
    })[0];

    if (!fertilityState) {
      this.addStatus("fertile");
      return this.activeStatuses.filter((status) => {
        return status.type === "fertile";
      })[0] as Fertile;
    }
    return fertilityState as Fertile;
  }

  /**
   * Whenever the player has sex, this function should be run to calculate outcomes
   */
  sex(fertilityData: IFertility) {
    // if already pregnant, nothing happens
    if (!this.dialogHelpers.isPregnant()) {
      // can be 0 to 100
      const playerFertility = this.fertility.fertility;
      // can be 0 to 100
      const fatherSpermCount = fertilityData.spermCount;

      /**
       * Combined chance is the two multiplied and then divided
       * We add +1 to each so there's always a chance
       *
       * It also means we can set either to ridiculously high numbers to
       * ensure pregnancy
       */
      const combinedPregnancyModifier =
        ((playerFertility + 1) * (fatherSpermCount + 1)) / 100;

      const roll = new Roll();
      const chance = roll.roll("1d100").result;

      if (chance + combinedPregnancyModifier > 100) {
        this.fertility.makePregnant(fertilityData.race);
      }
    }
  }

  /**
   * Get the map id of the last checkpoint map
   */
  get checkpointRef() {
    return this.getState("data").checkpointRef;
  }

  /**
   * Sets the last checkpoint map
   * @param checkPointRef the map id
   */
  setCheckpointRef(checkpointRef: string) {
    this.setState("data", {
      ...this.getState("data"),
      checkpointRef
    });
  }
}

export default Player;
