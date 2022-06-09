import { isArray } from "lodash";
import Game from "../game";

export const addArrayOrStringToDisplay = (
  game: Game,
  arrayOrString: string | string[]
) => {
  if (isArray(arrayOrString)) {
    arrayOrString.forEach((message) => {
      game.extraDisplay.push({ text: message, type: "flavor" });
    });
  } else {
    game.extraDisplay.push({ text: arrayOrString, type: "flavor" });
  }
};
