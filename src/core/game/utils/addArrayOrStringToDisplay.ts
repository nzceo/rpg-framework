import { isArray } from "lodash";
import Game from "../game";

export const addArrayOrStringToDisplay = (
  game: Game,
  arrayOrString: string | string[]
) => {
  if (isArray(arrayOrString)) {
    arrayOrString.forEach((message) => {
      game.addToExtraDisplay({ text: message, type: "flavor" });
    });
  } else {
    game.addToExtraDisplay({ text: arrayOrString, type: "flavor" });
  }
};
