import Game from "../game";
import { ITurn } from "../types";

/**
 * In certain situations the player will be stuck in an event, these are self
 * contained classes that repeat their internal logic until they're exited
 */
class CustomEvent {
  /**
   * Global game state, used to write and read data
   */
  game: Game;

  /**
   * Random data for this specific event.
   */
  data: any;

  constructor(game: Game, data: any) {
    this.game = game;
    this.data = data;
  }

  /**
   * Returns an object with options and flavor text
   */
  turn(): ITurn {
    return {
      display: [
        {
          text: `This is a custom event.`,
          type: "flavor"
        }
      ],
      options: [
        {
          text: "This is an action from a custom event",
          action: () => null
        }
      ]
    };
  }
}

export default CustomEvent;
