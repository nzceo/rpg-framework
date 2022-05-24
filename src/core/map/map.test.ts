import Map from "./map";
import maps from "../data/maps";
import actors from "../data/testMap1/actors";
import Game from "../game/game";

describe("Map class", () => {
  it("name get and set", () => {
    const game = new Game();
    const newMap = new Map(maps[0], true, game);
    expect(newMap.name).toBe(maps[0].name);
  });
  it("map can be generated without connections", () => {
    const game = new Game();
    const newMap = new Map({ id: "test-map-1", name: "Test map" }, true, game);
    expect(newMap.connections).toStrictEqual([]);
  });
  it("connections get returned correctly", () => {
    const game = new Game();
    game.load();
    const newMap = new Map(maps[0], true, game);
    expect(newMap.connections[0].name).toBe(maps[1].name);
  });
  it("correctly returns actors", () => {
    const game = new Game();
    const newMap = new Map(maps[0], true, game);
    expect(newMap.actors[0].name).toBe(actors[0].name);
  });
  it("shows map if visible function is met", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "flags": {
            "aflagthatdoesntexist": "true"
          },
          "mapRef": "${maps[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.connections.length).toBe(2);
  });
  it("hides map if visible function is not met", () => {
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
    const player = game.player;

    expect(player.map.connections.length).toBe(1);
  });

  it("hides map if hiden function is met", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "flags": {
            "aflagthatdoesntexist": "true"
          },
          "mapRef": "${maps[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.connections.length).toBe(2);
  });
  it("shows map if hidden function is not met", () => {
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
    const player = game.player;

    expect(player.map.connections.length).toBe(1);
  });

  it("shows actor if visible function is met", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "flags": {
            "aflagthatdoesntexist": "true"
          },
          "mapRef": "${maps[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.actors.length).toBe(6);
    expect(player.map.actors[player.map.actors.length - 1].name).toBe(
      "Actor 7"
    );
  });
  it("hides actor if visible function is not met", () => {
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
    const player = game.player;

    expect(player.map.actors.length).toBe(6);
    expect(player.map.actors[player.map.actors.length - 1].name).toBe(
      "Actor 7"
    );
  });

  it("hides actor if hiden function is met", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "flags": {
            "aflagthatdoesntexist": "true"
          },
          "mapRef": "${maps[0].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.actors.length).toBe(6);
    expect(player.map.actors[player.map.actors.length - 1].name).toBe(
      "Actor 7"
    );
  });
  it("shows map if hidden function is not met", () => {
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
    const player = game.player;
    expect(player.map.actors[player.map.actors.length - 1].name).toBe(
      "Actor 7"
    );
  });
  it("player starts from last saved map", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${maps[5].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;
    expect(player.map.name).toBe("Map with enemies");
  });
  it("player starts from loaded map and new map is saved when moving", () => {
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
    const player = game.player;
    expect(player.map.name).toBe("Test map");
    player.map.connections[0].travelTo();
    expect(player.map.name).toBe("Test map 2");

    game.save();

    const state = JSON.parse(localStorage.getItem("state")!);
    expect(state.player.mapRef).toBe("test-map-2");
  });
});
