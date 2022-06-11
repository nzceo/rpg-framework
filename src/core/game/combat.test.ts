import Game from "./game";
import actors from "../data/testMap1/actors";
import Actor from "../actor/actor";
import maps from "../data/maps";

describe("combat tests", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("renders combat info", () => {
    const game = new Game();
    game.load();
    game.enemyData = [new Actor(actors[0], game)];
    game.player.state = "combat";
    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          {
            text: `You are fighting ${actors[0].name}. A normal looking man. Everything about him is normal. He has 15HP left.`,
            type: "flavor"
          }
        ])
      })
    );
  });
  it("renders possible enemy statuses in combat info", () => {
    const game = new Game();
    game.load();
    const newActor = new Actor(actors[0], game);
    newActor.addStatus("testableStatus");
    game.enemyData = [newActor];
    game.player.state = "combat";
    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          {
            text: `You are fighting Actor 1. A normal looking man. Everything about him is normal. He doesn't look very good. He has 15HP left.`,
            type: "flavor"
          }
        ])
      })
    );
  });

  it("renders combat options", () => {
    const game = new Game();
    game.load();
    game.enemyData = [new Actor(actors[0], game)];
    game.player.state = "combat";
    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        options: expect.arrayContaining([
          {
            text: `Attack ${actors[0].name}`,
            action: expect.anything()
          }
        ])
      })
    );
  });
  it("renders multiple combat options", () => {
    const game = new Game();
    game.load();
    game.enemyData = [new Actor(actors[0], game), new Actor(actors[0], game)];
    game.player.state = "combat";
    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        options: expect.arrayContaining([
          {
            text: `Attack ${actors[0].name}`,
            action: expect.anything()
          },
          {
            text: `Attack ${actors[0].name}`,
            action: expect.anything()
          }
        ])
      })
    );
  });

  it("attacks do damage", () => {
    const game = new Game();
    game.load();
    game.enemyData = [new Actor(actors[0], game)];
    game.player.state = "combat";

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        options: expect.arrayContaining([
          {
            text: `Attack ${actors[0].name}`,
            action: expect.anything()
          }
        ])
      })
    );

    game.turn().options[0].action();

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          { text: "Actor 1 takes 10 damage.", type: "flavor" },
          { text: "You have 140HP left.", type: "flavor" },
          {
            text:
              "You are fighting Actor 1. A normal looking man. Everything about him is normal. He has 5HP left.",
            type: "flavor"
          }
        ])
      })
    );
  });

  it("enemy can be defeated", () => {
    const game = new Game();
    game.load();
    game.enemyData = [new Actor(actors[1], game)];
    game.player.state = "combat";

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          {
            text:
              "You are fighting Actor 2. A normal looking man. Everything about him is normal. He has 15HP left.",
            type: "flavor"
          }
        ])
      })
    );

    game.turn().options[0].action();
    game.turn().options[0].action();

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          { text: "Actor 2 has been defeated!", type: "flavor" }
        ]),
        options: expect.arrayContaining([
          { action: expect.anything(), text: "Next" }
        ])
      })
    );

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          { text: "You are in Test map.", type: "flavor" }
        ])
      })
    );
  });
  it("combat can result to gameover", () => {
    const game = new Game();
    game.load();
    game.enemyData = [new Actor(actors[2], game)];
    game.player.state = "combat";

    game.player.health = 25;

    game.player.setCheckpointRef("test-map-4");

    // game.player.setState("combat.hitPoints.current", 25);

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          {
            text:
              "You are fighting Actor 3. A normal looking man. Everything about him is normal. He has 100HP left.",
            type: "flavor"
          }
        ])
      })
    );

    game.turn().options[0].action();
    game.turn().options[0].action();
    game.turn().options[0].action();

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          { text: "Your HP has reached 0!", type: "flavor" },
          { text: "Game Over!", type: "flavor" }
        ]),
        options: expect.arrayContaining([
          { action: expect.anything(), text: "Start from last checkpoint" }
        ])
      })
    );

    game.turn().options[0].action();

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          { text: "You are in Test map 5.", type: "flavor" }
        ])
      })
    );

    expect(game.player.getState("combat.hitPoints.current")).toBe(150);
  });

  it("random encounters get triggered", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "mapRef": "${maps[4].id}"
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;
    expect(player.map.name).toBe("Map connected to map with enemies");

    player.map.connections[0].travelTo();

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          { text: "Enemy 1 wants to fight!", type: "flavor" }
        ])
      })
    );
  });
});
