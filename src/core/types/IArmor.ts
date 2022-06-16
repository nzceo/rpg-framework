import Game from "../game";
import { Message } from "./IGame";

export interface IArmor {
  type: "armor";
  /**
   * The armor's name
   */
  name: string;
  /**
   * How much the armor protects the wearer
   */
  damageThreshold: number;
  /**
   * The armor's baseprice, buy and sell price derive from this
   * as well as merchant settings
   */
  basePrice: number;
  /**
   * Whether the armor has been tailored or not.
   * A tailored armor will fit when pregnant.
   */
  tailored: boolean;
  /**
   * Function to be used every time the player needs to wear clothes (e.g. every morning)
   * The function will return `result` to see if player can still wear it as well as `message`,
   * a more descriptive outcome of the result.
   */
  wear: (
    game: Game
  ) => {
    result: boolean;
    message: Message;
  };
  /**
   * Description about how the current clothes fit you
   */
  describe: (
    game: Game
  ) => {
    message: Message;
  };
}
