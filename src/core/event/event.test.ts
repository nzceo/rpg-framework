import Game from "../game";
import CustomEvent from "./";
import { config } from "../custom.rpg.config";

describe("event tests", () => {
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("custom events can be assigned and consumed", () => {
    const game = new Game(config);
    game.load();
    const player = game.player;

    player.setCustomState(CustomEvent, {});

    expect(game.turn().display).toStrictEqual(
      expect.arrayContaining([
        {
          text: `This is a custom event.`,
          type: "flavor"
        }
      ])
    );
  });
});
