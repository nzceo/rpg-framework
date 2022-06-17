import maps from "./data/maps";
import Game from "./game/game";

describe("game can be played", () => {
  it("returns current map and options", () => {
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
    expect(game.turn()).toStrictEqual({
      display: expect.arrayContaining([
        {
          text: `You are in ${game.player.map.name}.`,
          type: "flavor"
        }
      ]),
      options: expect.arrayContaining([
        {
          text: `Go to ${game.player.map.connections[0].name}`,
          action: expect.anything()
        }
      ])
    });
  });
  it("returns current map and options after traveling to a new location", () => {
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
    game.turn().options[0].action();
    expect(game.turn()).toStrictEqual({
      display: expect.arrayContaining([
        {
          text: `You are in ${game.player.map.name}.`,
          type: "flavor"
        }
      ]),
      options: [
        {
          text: `Go to ${game.player.map.connections[0].name}`,
          action: expect.anything()
        }
      ]
    });
  });
  it("returns current map and options after traveling to a new location and going back", () => {
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
    game.turn().options[0].action();
    game.turn().options[0].action();
    expect(game.turn()).toStrictEqual({
      display: expect.arrayContaining([
        {
          text: `You are in Test map.`,
          type: "flavor"
        }
      ]),
      options: expect.arrayContaining([
        {
          text: `Go to ${game.player.map.connections[0].name}`,
          action: expect.anything()
        }
      ])
    });
  });
  it("returns correct dialog after talking to someone", () => {
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
    game.turn().options[2].action();
    expect(game.turn()).toStrictEqual({
      display: [
        { text: "Hello world", type: "dialog" },
        { text: "Hello world", type: "dialog" }
      ],
      options: [
        {
          action: expect.anything(),
          text: "Asking a question"
        }
      ]
    });
  });
  it("correctly switches dialogref and continues from next dialog", () => {
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
    game.turn().options[2].action();
    game.turn().options[0].action();
    expect(game.player.getState("data").dialogRef).toBe("testMapActor1Dialog4");
    expect(game.turn()).toStrictEqual({
      display: expect.arrayContaining([
        { text: "I'm answering the question", type: "dialog" }
      ]),
      options: expect.anything()
    });
  });
  it("ending dialog switches player back to normal state", () => {
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
    game.turn().options[2].action();
    game.turn().options[0].action();
    expect(game.player.getState("data").dialogRef).toBe("testMapActor1Dialog4");
    expect(game.turn()).toStrictEqual({
      display: expect.arrayContaining([
        { text: "I'm answering the question", type: "dialog" }
      ]),
      options: expect.anything()
    });
    expect(game.player.state).toBe("normal");
  });
  // it('returns character status descriptions if they are afflicted by statuses', () => {
  //   const game = new Game();
  //   game.load();
  //   game.player.map.actors[0].addStatus('testableStatus');
  //   expect(game.turn()).toStrictEqual(
  //     expect.objectContaining({
  //       display: expect.arrayContaining([
  //         {
  //           text: "He doesn't look very good.",
  //           type: 'flavor',
  //         },
  //       ]),
  //     })
  //   );
  // });
});
