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
          expect.objectContaining({ text: "Hello world", type: "dialog" }),
          expect.objectContaining({
            text: "And here's a continuation",
            type: "dialog"
          })
        ]),
        options: expect.arrayContaining([
          { text: "Talk to Actor 1", action: expect.anything() }
        ])
      })
    );
  });
});
