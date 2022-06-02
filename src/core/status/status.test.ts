import Game from "../game/game";
import TestableStatus from "../../extras/statuses/testableStatus";

describe("character class", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("statuses can be added to character", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.addStatus("testableStatus");

    expect(player.statuses[1].name).toBe("Just a testable status");
  });
  it("statuses that don't exist don't break the game", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.addStatus("somethingElse");

    expect(player.statuses.length).toBe(1);
  });
  it("Status eachDay function is called correctly", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    const mockedEachTurn = jest.fn();

    player.assignStatuses([
      new TestableStatus(game, player, {
        eachTurn: mockedEachTurn,
        eachDay: jest.fn(),
        onRemove: jest.fn()
      })
    ]);

    game.turn();

    expect(mockedEachTurn).toHaveBeenCalledTimes(1);
  });
  it("removes status correctly", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.addStatus("testableStatus");

    game.save();

    let state = JSON.parse(localStorage.getItem("state")!);
    expect(state.player.statuses).toStrictEqual(
      expect.objectContaining({
        testableStatus: { otherStuff: { testData: "don't look very good" } }
      })
    );

    expect(player.statuses[1].name).toBe("Just a testable status");

    player.removeStatus("testableStatus");

    expect(player.statuses.length).toBe(1);

    game.save();

    state = JSON.parse(localStorage.getItem("state")!);
    expect(state.player.statuses.testableStatus).toBeUndefined();
  });
  it("Status eachDay function is called correctly", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    const mockedOnRemove = jest.fn();

    player.assignStatuses([
      new TestableStatus(game, player, {
        eachTurn: jest.fn(),
        eachDay: jest.fn(),
        onRemove: mockedOnRemove
      })
    ]);
    player.addStatus("testableStatus");

    expect(player.statuses[0].name).toBe("Just a testable status");

    player.removeStatus("testableStatus");

    expect(mockedOnRemove).toHaveBeenCalledTimes(1);
  });
  it("character can't have two of the same states", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.addStatus("testableStatus");

    expect(player.statuses.length).toBe(2);

    player.addStatus("testableStatus");

    expect(player.statuses.length).toBe(2);
  });
  it("statuses can be loaded from state and extra data can be accessed", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "statuses": {
            "testableStatus": {
              "type": "testableStatus",
              "extraData": "something else"
            }
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.statuses[0].name).toBe("Just a testable status");
    expect(player.statuses[0].statusData).toStrictEqual(
      expect.objectContaining({
        extraData: "something else"
      })
    );
  });

  it("statuses can be saved and loaded to localStorage", () => {
    const game = new Game();
    game.load();
    expect(game.player.statuses.length).toBe(1);
    game.player.addStatus("testableStatus");
    game.save();
    const state = JSON.parse(localStorage.getItem("state")!);
    expect(state.player.statuses).toStrictEqual(
      expect.objectContaining({
        testableStatus: expect.anything()
      })
    );
  });
});
