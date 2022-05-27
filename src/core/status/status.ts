import { omit } from "lodash";
import Character from "../character/character";
import Game from "../game/game";
import { IStatus } from "../types/IStatus";
/**
 * Health statuses that can be applied to the player
 * Maybe to enemies eventually?
 *
 * Stuff like poison, etc, you know the drill
 */
class Status {
  /**
   * Id of the Character this status is assigned to
   */
  // id: string;
  /**
   * Global game state, used to write and read status data
   */
  game: Game;

  /**
   * The character that has this status
   */
  character: Character;
  data: IStatus;

  constructor(game: Game, character: Character, status: IStatus) {
    this.game = game;
    this.character = character;
    this.data = status;

    this.character.setState(`statuses.${this.type}`, {
      ...this.character.getState(`statuses.${this.type}`)
    });
  }

  /**
   * Return status type
   */
  get type() {
    return this.data.type;
  }

  /**
   * Return status name
   */
  get name() {
    return this.data.name;
  }
  /**
   * Return status explanation
   */
  get explanation() {
    return this.data.explanation;
  }

  /**
   * Function that gets called every turn
   */
  eachTurn(): any {}

  /**
   * Function that gets called every time a day passes
   */
  eachDay(): any {}

  /**
   * Runs whenever the status is removed
   */
  onRemove(): any {
    this.resetStateData();
  }

  resetStateData(): any {
    this.character.setState(`statuses`, {
      ...omit(this.character.getState("status"), this.type)
    });
  }

  /**
   * Could be used to return descriptive strings
   * for a status advancing?
   * E.g. you're turning into a ghoul or something
   */
  describe(): string | null {
    return null;
  }

  /**
   * Returns all the extra data from the status
   * Do whatever you want with it
   */
  get statusData(): any {
    return this.character.getState(`statuses.${this.type}`);
  }

  /**
   * Sets data to the game status
   */
  set statusData(value: any) {
    this.character.setState(`statuses.${this.type}`, {
      ...this.statusData,
      ...value
    });
  }

  /**
   * Runs each day
   */
   eachDay() {}
}

export default Status;
