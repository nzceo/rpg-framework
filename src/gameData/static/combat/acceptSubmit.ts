import Game from "../../../core/game";
import { RandomMessagesSet } from "../../../core/types";

/**
 * Messages to display when enemy accepts player's submission
 */
const acceptSubmission: RandomMessagesSet[] = [
  {
    m: (game: Game) =>
      `The enemy ${game.enemyData[0].name}'s smirks at your submission, he drops his weapon and starts walking towards you.`,
    display: (game: Game) => true
  }
];

export default acceptSubmission;
