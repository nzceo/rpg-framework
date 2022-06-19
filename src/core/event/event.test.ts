import Game from "../game";
import CustomEvent from "./";
import { testConfig } from "../../mocks/test.rpg.config";

describe("event tests", () => {
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("custom events can be assigned and consumed", () => {
    const game = new Game(testConfig);
    game.load();
    const player = game.player;

    player.setCustomState(CustomEvent, {});

    expect(game.turn().display).toStrictEqual([
      expect.objectContaining({
        text: `This is a custom event.`,
        type: "flavor"
      })
    ]);
  });
  it("custom events can be assigned consumed and exited", () => {
    const game = new Game(testConfig);
    game.load();
    const player = game.player;

    player.setCustomState(CustomEvent, {});

    expect(game.turn().display).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: `This is a custom event.`,
          type: "flavor"
        })
      ])
    );

    player.customState?.exit();

    expect(game.turn().display).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: `You are in The Golden Boot.`,
          type: "flavor"
        })
      ])
    );
  });
});
