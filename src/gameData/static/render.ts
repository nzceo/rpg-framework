import { addArrayOrStringToDisplay } from "@/core/game/utils/addArrayOrStringToDisplay";
import { isArray, isFunction } from "lodash";
import Game, { ITurn } from "../../core/game/game";
import { addCapital } from "../../core/helpers/dialogHelpers";
import { IDialog } from "../../core/types/IDialog";

let currentMap = "";

/**
 * The game's render function. This will be called every turn.
 * Add new switches and use the game class to output
 * new things.
 */
const render = (game: Game): ITurn => {
  switch (game.player.state) {
    default:
    case "normal":
      if (game.player.map.id !== currentMap) {
        currentMap = game.player.map.id;
        /**
         * We ensure we also get actor descriptions when describing a map
         * Unsure if this should be here, I also don't like the hardcoded state.
         */
        if (game.player.map.actors.length > 0) {
          game.addToExtraDisplay({
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
                text: `${
                  actor.data.customAction !== undefined
                    ? actor.data.customAction
                    : "Talk to "
                }${actor.name}`,
                action: () => {
                  actor.talkTo();
                }
              };
            }),
            ...game.extraOptions
          ]
        };
      }
      return {
        display: [...game.extraDisplay],
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
              text: `${
                actor.data.customAction !== undefined
                  ? actor.data.customAction
                  : "Talk to "
              }${actor.name}`,
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
      // const currentMessages: ITurn["display"] = currentDialog.map((dialog) => {
      //   return { text: dialog.message || "", type: "dialog" };
      // });
      const currentMessages = currentDialog
        .map((dialog) => {
          let message;
          if (dialog.message) {
            if (isFunction(dialog.message)) {
              message = dialog.message(game);
            } else {
              message = dialog.message;
            }
          } else {
            message = "";
          }

          if (isArray(message)) {
            return message.map((m) => ({
              text: m,
              type: "dialog"
            }));
          } else {
            return [
              {
                text: message,
                type: "dialog"
              }
            ];
          }
        })
        .flat() as ITurn["display"];
      const lastDialog = currentDialog[currentDialog.length - 1] as IDialog;
      let currentOptionsIfAny: ITurn["options"] = [];
      if (lastDialog.type === "question") {
        currentOptionsIfAny = lastDialog.options.map((option) => {
          return {
            text: option.action,
            action: () => {
              addArrayOrStringToDisplay(game, `<b>${option.action}</b>`);
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
          ...game.extraDisplay,
          ...dialogEndDisplay,
          ...currentMessages
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
            enemy.attack(game.player, game.player.weapon.governingSkill);
          }
        };
      });

      const submitOptions = game.enemyData.map((enemy) => {
        return {
          text: `Submit to ${enemy.name}`,
          action: () => {
            // "onehanded" should be replaced by currently equipped weapon skill
            enemy.submit();
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
        options: [...game.extraOptions, ...attackOptions, ...submitOptions]
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
