import Player from "./player";
import defaultContructors from "../data/player";
import mapData from "../data/maps";
import Game from "../game/game";

const defaultPlayerConstructors = defaultContructors;

describe("Player class", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.clear();
  });
  it("sets default name", () => {
    const game = new Game();
    game.load();
    const player = game.player;
    expect(player.name).toBe(defaultPlayerConstructors.name);
  });
  it("name get and set", () => {
    const game = new Game();
    game.load();
    const player = game.player;
    player.setName = "test";
    expect(player.name).toBe("test");
  });
  it("name can be loaded from state", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "data": {
            "name": "nameFromState"
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;
    expect(player.name).toBe("nameFromState");
  });
  it("sets default experience/level", () => {
    const game = new Game();
    game.load();
    const player = game.player;
    expect(player.getExperience).toBe(
      defaultPlayerConstructors.experience.current
    );
    expect(player.getLevel).toBe(defaultPlayerConstructors.experience.level);
    expect(player.getNextExperience).toBe(
      defaultPlayerConstructors.experience.next
    );
  });
  it("levels up", () => {
    const game = new Game();
    const player = new Player(game);
    player.addExperience(player.getNextExperience);
    expect(player.getLevel).toBe(2);
  });
  it("levels up multiple levels at once", () => {
    const game = new Game();
    const player = new Player(game);
    player.addExperience(1000);
    expect(player.getLevel).toBe(3);
  });
  it("generates current map", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${mapData[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;
    expect(player.map?.name).toBe(mapData[0].name);
  });
  it("generates current map's connections", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${mapData[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;
    expect(player.map?.connections[0].name).toBe(mapData[1].name);
  });
  it("moves player to new map", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${mapData[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;
    player.map?.connections[0].travelTo();
    expect(player.map?.name).toBe(mapData[1].name);
  });
  it("map is loaded correctly", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${mapData[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.name).toBe(mapData[0].name);
  });
});
