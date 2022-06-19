import { isArray } from "lodash";
import Game from "../game";

export const returnArrayOrStrng = (
  game: Game,
  arrayOrString: string | string[]
) => {
  if (isArray(arrayOrString)) {
    return arrayOrString;
  } else {
    game.addToExtraDisplay({ text: arrayOrString, type: "flavor" });
  }
};
