import "../../mocks/localStorage.mock";
import maps from "../data/maps";
import Game from "./game";

describe("Game class", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("player loads data from localstorage", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "flags": {
            "testFlag": "something"
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    expect(game.player.getState("flags.testFlag")).toBe("something");
  });

  it("player saves data to localStorage", () => {
    const game = new Game();
    game.load();
    game.player.setState("flags.newFlag", "saving");
    game.save();
    const state = JSON.parse(localStorage.getItem("state")!);
    expect(state.player.flags["newFlag"]).toBe("saving");
  });

  it("map state is loaded correctly", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${maps[0].id}"
        },
        "${maps[0].id}": {
          "flags": {
            "testFlag": "something"
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.getState("flags.testFlag")).toBe("something");
  });

  it("map state is loaded correctly and persisted if left and returned", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${maps[0].id}"
        },
        "${maps[0].id}": {
          "flags": {
            "testFlag": "something"
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    player.map.connections[0].travelTo();

    expect(player.map.name).toBe("Test map 2");
    expect(player.map.connections[0].name).toBe("Test map");

    player.map.connections[0].travelTo();

    expect(player.map.getState("flags.testFlag")).toBe("something");
  });

  it("map saves data to localStorage", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${maps[0].id}"
        }
     }`
    );
    const game = new Game();
    game.load();
    game.player.map.setState("flags.newMapFlag", "saving");
    expect(game.player.map.getState("flags.newMapFlag")).toBe("saving");
    game.save();
    const state = JSON.parse(localStorage.getItem("state")!);
    expect(state[maps[0].id].flags["newMapFlag"]).toBe("saving");
  });

  it("loads flags and other properties together", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${maps[0].id}"
        },
        "${maps[0].id}": {
          "flags": {
            "testFlag": "something"
          },
          "stuff": {
            "thing": "this"
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.getState("flags.testFlag")).toBe("something");
    expect(player.map.getState("stuff.thing")).toBe("this");
  });

  it("loads deeply nested data", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${maps[0].id}"
        },
        "${maps[0].id}": {
          "flags": {
            "testFlag": "something"
          },
          "stuff": {
            "thing": {
              "thang": "this"
            }
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.getState("flags.testFlag")).toBe("something");
    expect(player.map.getState("stuff.thing.thang")).toBe("this");
  });
});
