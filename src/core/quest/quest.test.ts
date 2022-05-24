import Game from "../game/game";
import DefeatTestEnemy from "../../extras/quests/defeatTestEnemy";
import Actor from "../actor/actor";
import actors from "../data/testMap1/actors";

describe("character class", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("quests can be added to player", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.addQuest("defeatTestEnemy");

    expect(player.quests[0].name).toBe("Defeat Test Enemy");
  });

  it("quests that don't exist don't break the game", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.addQuest("somethingElse");

    expect(player.quests.length).toBe(0);
  });
  it("player can't have two of the same quests", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.quests.length).toBe(0);

    player.addQuest("defeatTestEnemy");

    expect(player.quests.length).toBe(1);

    player.addQuest("defeatTestEnemy");

    expect(player.quests.length).toBe(1);
  });
  it("quests can be loaded from state and extra data can be accessed", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "quests": {
            "defeatTestEnemy": {
              "extraData": "something else"
            }
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.quests[0].name).toBe("Defeat Test Enemy");
    expect(player.quests[0].questData).toStrictEqual(
      expect.objectContaining({
        extraData: "something else"
      })
    );
  });

  it("quests can be saved and loaded to localStorage", () => {
    const game = new Game();
    game.load();
    expect(game.player.quests.length).toBe(0);
    game.player.addQuest("defeatTestEnemy");
    game.save();
    const state = JSON.parse(localStorage.getItem("state")!);
    expect(state.player.quests).toStrictEqual({
      defeatTestEnemy: expect.anything()
    });
  });

  it("correctly returns iscompleted", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "quests": {
            "defeatTestEnemy": {
              "extraData": "something else",
              "totalDefeated": 5,
              "totalToDefeat": 5
            }
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.quests[0].isCompleted()).toBe(true);
  });

  it("quest can be turneded in ", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "quests": {
            "defeatTestEnemy": {
              "extraData": "something else",
              "totalDefeated": 5,
              "totalToDefeat": 5
            }
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;
    player.quests[0].turnIn();

    expect(player.quests.length).toBe(0);

    game.save();
    const state = JSON.parse(localStorage.getItem("state")!);

    expect(state.player.completedQuests.defeatTestEnemy).toStrictEqual({
      extraData: "something else",
      totalDefeated: 5,
      totalToDefeat: 5
    });

    expect(state.player.quests.defeatTestEnemy).toBe(undefined);
  });

  it("calls ondefeat function", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.quests.length).toBe(0);

    const mockedOnDefeat = jest.fn();

    player.assignQuests([
      new DefeatTestEnemy(game, player, {
        onDefeat: mockedOnDefeat,
        rewards: () => null
      })
    ]);

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

    expect(mockedOnDefeat).toHaveBeenCalled();
  });
  it("calls rewards function", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.quests.length).toBe(0);

    const mockedRewards = jest.fn();

    player.assignQuests([
      new DefeatTestEnemy(game, player, {
        onDefeat: () => null,
        rewards: mockedRewards
      })
    ]);

    game.enemyData = [new Actor(actors[0], game)];
    game.player.state = "combat";

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          {
            text:
              "You are fighting Actor 1. A normal looking man. Everything about him is normal. He has 15HP left.",
            type: "flavor"
          }
        ])
      })
    );

    game.turn().options[0].action();
    game.turn().options[0].action();

    player.quests[0].turnIn();

    expect(mockedRewards).toHaveBeenCalled();
  });
});
