import { IActor } from "../types/IActor";
import { IDialog } from "../types/IDialog";
import Character from "../character/character";
import Game from "../game/game";
import { cloneDeep } from "lodash";

/**
 * Actor class, used for any non playable, but talkable NPC
 */
class Actor extends Character {
  data: IActor;
  game: Game;

  constructor(actor: IActor, game: Game) {
    super(game, actor.id, actor);
    this.data = cloneDeep(actor);
    this.game = game;
  }

  /**
   * Sets the player to interact with this npc
   */
  talkTo() {
    this.updateDialogRef(this.data.dialog[0].id);
    this.game.player.switchState("dialog");
    this.game.player.dialog = this;
  }

  /**
   * Updates current dialogRef
   */
  updateDialogRef(dialogRef: string) {
    this.game.player.setState("data.dialogRef", dialogRef);
  }

  /**
   * Returns an array of messages until end of dialogue or until a question is asked
   */
  returnDialog(from?: string) {
    let dialog = this.data.dialog;

    // Returns index of dialog to start from
    const findDialogIndex = (nextId: string) => {
      return dialog.findIndex((m) => m.id === nextId);
    };

    let i = 0;
    if (from) {
      i = findDialogIndex(from);
    }

    let messages: IDialog[] = [];

    while (i < dialog.length) {
      const message = dialog[i];

      // If visible exists and returns false, don't display this message
      if (message.visible) {
        if (!message.visible(this.game.player, this)) {
          i++;
        }
      }

      // If hidden exists and returns true, don't display this message
      if (message.hidden) {
        if (message.hidden(this.game.player, this)) {
          i++;
        }
      }

      /**
       * Push to displayable dialog
       */
      messages.push(dialog[i]);

      /**
       * If function exists, launch it
       */
      const dialogFunc = dialog[i]?.func;
      if (dialogFunc !== undefined) {
        dialogFunc(this.game, this);
      }
      if (message.type === "question") {
        break;
      }

      if (message.next) {
        i = findDialogIndex(message.next);
      } else {
        i++;
      }
    }

    // Dialog has completed
    if (i === dialog.length) {
      this.game.player.setState("data.dialogRef", "");
      if (this.game.player.state === "dialog")
        this.game.player.switchState("normal");
    }

    return messages;
  }
}

export default Actor;
