import Game, { ITurn } from "../game/game";
import { addCapital } from "../helpers/dialogHelpers";
import { IDialog } from "../types/IDialog";

/**
 * The game's render function. This will be called every turn.
 * Add new switches and use the game class to output
 * new things.
 */
const render = (game: Game): ITurn => {
  switch (game.player.state) {
    default:
    case "normal":
      /**
       * We ensure we also get actor descriptions when describing a map
       * Unsure if this should be here, I also don't like the hardcoded state.
       */
      if (game.player.map.actors.length > 0) {
        game.extraDisplay.push({
          text: `You see the following characters:`,
          type: "flavor"
        });
        game.player.map.actors.forEach((actor) => {
          actor.describe();
        });
      }
      return {
        display: [
          { text: `You are in ${game.player.map.name}.`, type: "flavor" },
          ...game.extraDisplay
        ],
        options: [
          ...game.player.map.connections.map((connection) => {
            return {
              text: `Go to ${connection.name}`,
              action: () => {
                connection.travelTo();
              }
            };
          }),
          ...game.player.map.actors.map((actor) => {
            return {
              text: `Talk to ${actor.name}`,
              action: () => {
                actor.talkTo();
              }
            };
          }),
          ...game.extraOptions
        ]
      };
    case "dialog":
      const currentDialog = game.player.dialog.returnDialog(
        game.player.getState("data").dialogRef
      );
      const currentMessages: ITurn["display"] = currentDialog.map((dialog) => {
        return { text: dialog.message || "", type: "dialog" };
      });
      const lastDialog = currentDialog[currentDialog.length - 1] as IDialog;
      let currentOptionsIfAny: ITurn["options"] = [];
      if (lastDialog.type === "question") {
        currentOptionsIfAny = lastDialog.options.map((option) => {
          return {
            text: option.action,
            action: () => {
              game.player.dialog.updateDialogRef(option.next);
            }
          };
        });
      }

      // This will render map options when dialog ends
      let dialogEndOptions: ITurn["options"] = [];
      // This will render map descriptions when dialog ends
      let dialogEndDisplay: ITurn["display"] = [];
      if (!game.player.getState("data").dialogRef) {
        const turn = game.turn();
        dialogEndOptions = [...turn.options];
        dialogEndDisplay = [...turn.display];
      }

      return {
        display: [
          ...currentMessages,
          ...game.extraDisplay,
          ...dialogEndDisplay
        ],
        options: [
          ...currentOptionsIfAny,
          ...game.extraOptions,
          ...dialogEndOptions
        ]
      };
    case "combat":
      const currentEnemies: ITurn["display"] = game.enemyData.map((enemy) => {
        return {
          text: `You are fighting ${
            enemy.name
          }. ${enemy.returnDescription()} ${addCapital(enemy.pronoun)} has ${
            enemy.health
          }HP left.`,
          type: "flavor"
        };
      });
      const attackOptions = game.enemyData.map((enemy) => {
        return {
          text: `Attack ${enemy.name}`,
          action: () => {
            // "onehanded" should be replaced by currently equipped weapon skill
            enemy.attack(game.player, "oneHanded");
          }
        };
      });
      return {
        display: [
          ...game.extraDisplay,
          {
            text: `You have ${game.player.health}HP left.`,
            type: "flavor"
          },
          ...currentEnemies
        ],
        options: [...game.extraOptions, ...attackOptions]
      };
    case "gameOver":
      return {
        display: [
          ...game.extraDisplay,
          {
            text: `Game Over!`,
            type: "flavor"
          }
        ],
        options: [
          {
            text: "Start from last checkpoint",
            action: () => {
              game.player.switchState("normal");
              game.player.setState(
                "combat.hitPoints.current",
                game.player.getState("combat.hitPoints.base")
              );
              game.player.travelTo(game.player.getState("data").checkpointRef);
            }
          }
        ]
      };
    case "custom":
      return game.player.customState!.turn();
  }
};

export default render;
