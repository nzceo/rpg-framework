import Actor from "./actor";
import actors from "../data/testMap1/actors";
import Game from "../game/game";
import { cloneDeep } from "lodash";

describe("Actor class", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.setItem("state", ``);
  });
  it("name get", () => {
    const game = new Game();
    game.load();
    const newActor = new Actor(actors[0], game);
    expect(newActor.name).toBe(actors[0].name);
  });
  it("can be talked to", () => {
    const game = new Game();
    game.load();
    const newActor = new Actor(actors[0], game);
    expect(newActor.returnDialog()).toStrictEqual(actors[0].dialog);
  });
  it("interrupts itself when question is asked", () => {
    const game = new Game();
    game.load();
    const newActor = new Actor(actors[1], game);
    expect(newActor.returnDialog()).toStrictEqual([
      actors[1].dialog[0],
      actors[1].dialog[1]
    ]);
  });
  it("skips dialog depending on ids", () => {
    const game = new Game();
    game.load();
    const newActor = new Actor(actors[1], game);

    expect(
      // @ts-ignore
      newActor.returnDialog(actors[1].dialog[1].options[0].next)
    ).toStrictEqual([actors[1].dialog[3]]);
  });
  it("skips message if next property is present", () => {
    const game = new Game();
    game.load();
    const newActor = new Actor(actors[2], game);

    // @ts-ignore
    expect(newActor.returnDialog()).toStrictEqual([
      actors[2].dialog[0],
      actors[2].dialog[2]
    ]);
  });
  it("uses visible function to hide dialog", () => {
    const game = new Game();
    game.load();
    const newActor = new Actor(actors[3], game);

    expect(newActor.returnDialog()).toStrictEqual([
      actors[3].dialog[1],
      actors[3].dialog[2]
    ]);
  });
  it("uses visible function to display dialog", () => {
    localStorage.setItem(
      "state",
      `{
        "player": {
          "flags": {
            "aflagthatdoesntexist": "true"
          }
        }
       }`
    );
    const game = new Game();
    game.load();
    const player = game.player;

    expect(player.map.actors[3].returnDialog()).toStrictEqual(actors[3].dialog);
  });
  it("dialog functions are called correctly", () => {
    const game = new Game();
    game.load();
    const tempActor = cloneDeep(actors[6]);
    const mockedDialogFunc = jest.fn();
    tempActor.dialog[1].func = mockedDialogFunc;
    const newActor = new Actor(tempActor, game);

    newActor.returnDialog();

    expect(mockedDialogFunc).toHaveBeenCalled();
  });
});
