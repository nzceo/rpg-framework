import { IDisappearing } from "./IDisappearing";
import Actor from "../actor/actor";
import Game from "../game/game";

interface IBaseDialog extends IDisappearing<Actor> {
  /**
   * Id of the message. Needs to be unique in the dialog tree.
   */
  id: string;
  /**
   * Text of the message. This is what the user will see.
   */
  message: string;
  /**
   * A function that will run whenever a piece of dialog is rendered.
   */
  func?: (game: Game, actor: Actor) => any;
}

interface IMessage extends IBaseDialog {
  type: "message";
  /**
   * The id of the next message to display. If undefined, the next
   * item in the dialog array will be returned
   */
  next?: string;
}

interface IQuestion extends IBaseDialog {
  type: "question";
  options: {
    action: string;
    message: string;
    /**
     * Id of the message to jump to after selecting this option
     */
    next: string;
  }[];
}

interface IEnd {
  id: string;
  type: "end";
}

export type IDialog = IMessage | IQuestion | IEnd;
