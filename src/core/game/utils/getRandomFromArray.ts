import { isFunction, sample } from "lodash";
import { RandomMessagesSet } from "../../types";
import Game from "../game";

/**
 * Picks a random dialog from the array and returns it.
 * @param game - Game class
 * @param arrayOfMessages - Array of messages with m and display properties
 */
export const getRandomFromArray = (
  game: Game,
  arrayOfMessages: RandomMessagesSet[]
) => {
  const m = sample(
    arrayOfMessages.map((possibleMessage) =>
      possibleMessage.display(game) ? possibleMessage : null
    )
  )!;
  if (isFunction(m.m)) {
    return m.m(game);
  }
  return m.m;
};
