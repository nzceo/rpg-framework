import Player from "../player/player";

export interface IDisappearing<Extra = void> {
  visible?: (player: Player, other?: Extra) => boolean;
  hidden?: (player: Player, other?: Extra) => boolean;
}
