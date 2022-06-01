import { isArray } from "lodash";
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

  /**
   * Array to hold temporary display array for this event only
   */
  tempDisplay: ITurn["display"] = [];

  /**
   * Array to hold temporary options array for this event only
   */
  tempOptions: ITurn["options"] = [];

  constructor(game: Game, data: any) {
    this.game = game;
    this.data = data;
    this.tempDisplay.push({
      text: `This is a custom event.`,
      type: "flavor"
    });
    this.tempOptions.push({
      text: "This is an action from a custom event",
      action: () => null
    });
  }

  /**
   * Adds an object or an array of objects to the temp display.
   */
  addToDisplay(display: ITurn["display"][0] | ITurn["display"]) {
    if (isArray(display)) {
      display.forEach((d) => {
        this.tempDisplay.push(d);
      });
    } else {
      this.tempDisplay.push(display);
    }
  }

  /**
   * Adds an object or an array of objects to the temp options.
   */
  addToOptions(options: ITurn["options"][0] | ITurn["options"]) {
    if (isArray(options)) {
      options.forEach((d) => {
        this.tempOptions.push(d);
      });
    } else {
      this.tempOptions.push(options);
    }
  }

  /**
   * Returns an object with options and flavor text for it to be rendered
   */
  turn(): ITurn {
    return this.consumeDialog();
  }

  /**
   * Returns and resets all current dialog and options
   */
  consumeDialog() {
    const turnData = {
      display: this.tempDisplay,
      options: this.tempOptions
    };
    this.resetDialog();
    return turnData;
  }

  /**
   * Empties the temp display arrays.
   */
  resetDialog() {
    this.tempDisplay = [];
    this.tempOptions = [];
  }

  /**
   * Exit the event, by default this return the player to normal state.
   * This should be called by another function within the event class.
   */
  exit() {
    this.game.player.switchState("normal");
  }
}

export default CustomEvent;
