import Game from "./game";

describe("dialog tests", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("returns info back once dialog has ended", () => {
    const game = new Game();
    game.load();

    game.turn().options[1].action();

    expect(game.turn()).toStrictEqual(
      expect.objectContaining({
        display: expect.arrayContaining([
          { text: "Hello world", type: "dialog" },
          { text: "And here's a continuation", type: "dialog" },
          {
            text: "You are in Test map.",
            type: "flavor"
          }
        ]),
        options: expect.arrayContaining([
          { text: "Talk to Actor 1", action: expect.anything() }
        ])
      })
    );
  });
});
