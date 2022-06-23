import Game from "core/game";

export interface IDisappearing {
  visible?: (game: Game) => boolean;
  hidden?: (game: Game) => boolean;
}
