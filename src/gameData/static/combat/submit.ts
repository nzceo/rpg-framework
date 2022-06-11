import Game from "../../../core/game";
import { RandomMessagesSet } from "../../../core/types";

/**
 * Messages to display when player submits to enemy
 */
const submit: RandomMessagesSet[] = [
  {
    m: (game: Game) =>
      `You give up fighting and drop to your knees in the hope the enemy ${game.enemyData[0].name} feels merciful or horny.`,
    display: (game: Game) => true
  },
  {
    m: (game: Game) =>
      `You stop fighting and ${
        game.player.fertility.isPregnancyKnown() &&
        !["first"].includes(game.player.dialogHelpers.getPregnancyTerm())
          ? "slowly lower your heavy pregnant form to the ground"
          : "sit down"
      } facing the enemy ${
        game.enemyData[0].name
      }. You open your legs and spread your ${
        game.player.dialogHelpers.isPregnancyKnown() ? "pregnant" : ""
      } pussy, inviting him to take you in exchange of letting you go.`,
    display: (game: Game) => true
  },
  {
    m: (game: Game) =>
      `You stop fighting and face away from the enemy ${
        game.enemyData[0].name
      }, you then proceed to bend over making sure your ${
        game.player.dialogHelpers.isPregnancyKnown() ? "pregnant" : ""
      } pussy is in full view. You sway your behind side to side to invite him to take you, hoping he'll stop fighting.`,
    display: (game: Game) => true
  }
];

export default submit;
