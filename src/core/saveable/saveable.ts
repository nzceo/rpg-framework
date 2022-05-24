import Game from "../game/game";
import { v4 as uuidv4 } from "uuid";
import { get, set } from "lodash";

class Saveable {
  /**
   * The entity's unique ID
   * Can be any string, defaults to a random uuid
   */
  id: string = uuidv4();
  game?: Game;

  constructor(game?: Game, id?: string) {
    if (id) this.id = id;
    this.game = game;
    // Reinstate saved data if any, sets to empty object otherwise
    if (this.game) this.game.state[this.id] = { ...this.game.state[this.id] };
  }

  /**
   * If localStorage exists, sets a value
   */
  setState(accessor: string, value: any) {
    if (this.game) {
      try {
        set(this.game.state[this.id], accessor, value);
      } catch (err) {
        console.log("Property not found.");
      }
    }
  }

  /**
   * If localStorage exists, returns a value
   */
  getState(accessor: string) {
    if (this.game) return get(this.game.state[this.id], accessor) || null;
    return null;
  }
}

export default Saveable;
