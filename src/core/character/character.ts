import Game, { ITurn } from "../game/game";
import { ICharacter } from "../types/ICharacter";
import stats from "../../gameData/static/stats";
import { fertility } from "../../gameData/static/fertility";
import Status from "../status/status";
import archetypes from "../data/archetypes/character";
import { cloneDeep } from "lodash";
import Saveable from "../saveable/saveable";
import Roll from "roll";
import { addArrayOrStringToDisplay } from "../game/utils/addArrayOrStringToDisplay";
import { getRandomFromArray } from "../game/utils/getRandomFromArray";

/**
 * Character class, contains generic info
 * shared by Player, Actors and Enemies
 */
class Character extends Saveable {
  id: string;
  game: Game;
  data: ICharacter = {
    name: "",
    description: archetypes.normalMan,
    combat: cloneDeep(stats.weak),
    fertility: cloneDeep(fertility.standard)
  };

  activeStatuses: Status[] = [];

  constructor(game: Game, id: string, data: any) {
    super(game, id);
    this.id = id;
    this.game = game;
    this.data = cloneDeep(data);

    console.log(data);

    if (this.game) {
      this.initializeState();
      const characterStatuses = this.game.state[id].statuses;
      if (characterStatuses) {
        Object.keys(characterStatuses).forEach((key) => {
          this.addStatus(key);
        });
      }
    }
  }

  initializeState() {
    // Initialise status state
    this.setState("statuses", {
      ...{},
      ...this.game.state[this.id].statuses
    });
    // Initialise flags state
    this.setState("flags", {
      ...{},
      ...this.game.state[this.id].flags
    });
  }

  /**
   * Returns the actor name
   */
  get name() {
    return this.data.name;
  }

  /**
   * Gets the character's race.
   */
  get race() {
    return this.data.description.race;
  }

  /**
   * Gets the character's pronoun, good for descriptions and stuff.
   */
  get pronoun() {
    return this.data.description.pronouns;
  }

  /**
   * Returns true if character is player
   */
  isYou() {
    return this.pronoun === "you";
  }

  /**
   * Pushes character descriptin to `extraDisplay`
   */
  describe() {
    const description: ITurn["display"] = [
      {
        type: "flavor",
        text: `${this.name}. ${this.data.description.appearance}`
      }
    ];
    this.statuses.forEach((status) => {
      const statusDescription = status.describe();
      if (statusDescription) {
        description.push({
          type: "flavor",
          text: statusDescription
        });
      }
    });
    description.forEach((entry) => {
      this.game.extraDisplay.push(entry);
    });
  }

  /**
   * Returns character description as string.
   */
  returnDescription() {
    const description = [`${this.data.description.appearance}`];
    this.statuses.forEach((status) => {
      const statusDescription = status.describe();
      if (statusDescription) {
        description.push(statusDescription);
      }
    });
    return description.join(" ");
  }

  /**
   * Debug function, assigns an array of Status classes
   * to the character
   */
  assignStatuses(statuses: Status[]) {
    this.activeStatuses = statuses;
  }

  /**
   * Adds status of type to character, if character
   * already ha status then nothing happens
   */
  addStatus(type: string) {
    try {
      const hasStatus =
        this.activeStatuses.filter((status) => {
          return status.type === type;
        }).length > 0;
      if (!hasStatus) {
        // @ts-ignore
        const status = this.game.config.statuses[type];
        this.activeStatuses.push(new status(this.game, this, this.id));
      }
    } catch (err) {}
  }

  /**
   * Removes status matching type
   */
  removeStatus(type: string) {
    const filteredStatuses = this.activeStatuses.filter((status) => {
      if (status.type === type) {
        status.onRemove();
      }
      return status.type !== type;
    });
    this.activeStatuses = filteredStatuses;
  }

  /**
   * Get character's statuses
   */
  get statuses() {
    return this.activeStatuses;
  }

  /**
   * Combat stuff
   */

  /**
   * Attack this character
   * @param attacker - The character attacking
   * @param governingStat - The stat that governs the attack type
   */
  attack(attacker: Character, governingSkill: string) {
    this.game.config.attack(attacker, this, governingSkill, this.game);
    if (!this.isDead())
      this.game.config.attack(
        this,
        attacker,
        this.weapon.governingSkill,
        this.game
      );
  }

  /**
   * Submit to this character
   */
  submit() {
    const roll = new Roll();
    const chance = roll.roll("1d100").result;

    addArrayOrStringToDisplay(
      this.game,
      getRandomFromArray(this.game, this.game.dataSets.playerSubmit)
    );

    if (chance + this.lust > 70) {
      addArrayOrStringToDisplay(
        this.game,
        getRandomFromArray(this.game, this.game.dataSets.acceptSubmit)
      );
      addArrayOrStringToDisplay(
        this.game,
        getRandomFromArray(this.game, this.game.dataSets.submissionSex)
      );

      this.game.enemyData = [];
      this.game.player.switchState("normal");
    } else {
      this.game.extraDisplay.push({
        text: `The enemy ${this.name} ignores your advances completely and attacks you.`,
        type: "flavor"
      });
      this.game.player.attack(this, this.weapon!.governingSkill);
    }
  }

  get lust() {
    return this.data.combat.lust;
  }

  /**
   * Return character weapon
   */
  get weapon() {
    return this.data.weapon || this.game.config.defaultWeapon;
  }

  /**
   * Return character armor
   */
  get armor() {
    return this.data.armor || this.game.config.defaultArmor;
  }

  /**
   * Get character skills
   */
  get skills() {
    return this.data.combat.skills;
  }

  /**
   * Returns true if character has less than 0 health
   */
  isDead() {
    return this.data.combat.hitPoints.current <= 0;
  }

  get health() {
    return this.data.combat.hitPoints.current;
  }
  set health(newHealth: number) {
    this.data.combat.hitPoints.current = newHealth;
  }

  /**
   * Damage this character by X
   * @param totalDamage - damage taken
   */
  damage(totalDamage: number) {
    this.game.extraDisplay.push({
      type: "flavor",
      text: `${
        this.pronoun === "you" ? "You take" : `${this.name} takes`
      } ${totalDamage} damage.`
    });
    this.health = this.health - totalDamage;

    if (this.isDead()) {
      if (this.isYou()) {
        this.game.extraDisplay.push({
          type: "flavor",
          text: `Your HP has reached 0!`
        });
        this.game.player.switchState("gameOver");
      } else {
        /**
         * Passes the id of the defeated enemy to each quest
         */
        this.game.player.activeQuests.forEach((quest) => {
          quest.onDefeat(this.id);
        });
        this.game.extraDisplay.push({
          type: "flavor",
          text: `${this.name} has been defeated!`
        });
        this.game.removeEnemy(this.id);
        if (
          this.game.player.state === "combat" &&
          this.game.enemyData.length === 0
        ) {
          this.game.extraOptions.push({
            text: "Next",
            action: () => this.game.turn()
          });
        }
      }
    }
  }
}

export default Character;
function fertil(fertil: any) {
  throw new Error("Function not implemented.");
}
