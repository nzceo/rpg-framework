import Game from "../../game/game";

describe("Inventory class", () => {
  // Clears localstorage
  beforeEach(() => {
    localStorage.clear();
  });
  it("can add items to inventory", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.inventory.addItem(game.dataSets.weapons["sword"]);

    expect(player.inventory.items.length).toBe(1);
    expect(player.inventory.items[0].name).toBe("simple sword");
  });
  it("can load items from localstorage", () => {
    const game = new Game();
    localStorage.setItem(
      "state",
      `{
        "player": {
          "inventory": [
            ${JSON.stringify(game.dataSets.weapons["sword"])}
          ] 
        }
       }`
    );
    game.load();
    const player = game.player;

    expect(player.inventory.items.length).toBe(1);
    expect(player.inventory.items[0].name).toBe("simple sword");
  });
  it("remove items from inventory", () => {
    const game = new Game();
    game.load();
    const player = game.player;

    player.inventory.addItem(game.dataSets.weapons["sword"]);

    expect(player.inventory.items.length).toBe(1);
    expect(player.inventory.items[0].name).toBe("simple sword");

    player.inventory.removeItem(0);

    expect(player.inventory.items.length).toBe(0);
  });
  it("can equip armor", () => {
    const game = new Game();
    localStorage.setItem(
      "state",
      `{
        "player": {
          "inventory": [
            ${JSON.stringify(game.dataSets.armors["leatherArmor"])}
          ] 
        }
       }`
    );
    game.load();
    const player = game.player;

    expect(player.armor).toStrictEqual(
      expect.objectContaining({
        basePrice: 1,
        damageThreshold: 1,
        name: "clothes",
        tailored: false,
        type: "armor"
      })
    );

    expect(player.inventory.items.length).toBe(1);

    player.inventory.equip(player.inventory.items[0]);

    expect(player.armor).toStrictEqual(
      expect.objectContaining({
        name: "leather armor",
        tailored: false,
        type: "armor"
      })
    );
  });

  it("can equip weapons", () => {
    const game = new Game();
    localStorage.setItem(
      "state",
      `{
        "player": {
          "inventory": [
            ${JSON.stringify(game.dataSets.weapons["sword"])}
          ] 
        }
       }`
    );
    game.load();
    const player = game.player;

    expect(player.weapon).toStrictEqual(
      expect.objectContaining({
        name: "bare fists"
      })
    );

    expect(player.inventory.items.length).toBe(1);

    player.inventory.equip(player.inventory.items[0]);

    expect(player.weapon).toStrictEqual(
      expect.objectContaining({
        name: "simple sword"
      })
    );
  });

  it("modifying item modifies equip as well", () => {
    const game = new Game();
    localStorage.setItem(
      "state",
      `{
        "player": {
          "inventory": [
            ${JSON.stringify(game.dataSets.armors["leatherArmor"])}
          ] 
        }
       }`
    );
    game.load();
    const player = game.player;

    player.inventory.equip(player.inventory.items[0]);

    expect(player.armor).toStrictEqual(
      expect.objectContaining({
        name: "leather armor",
        tailored: false,
        type: "armor"
      })
    );

    const currentArmor = player.inventory.items[0];
    if (currentArmor.type === "armor") currentArmor.tailored = true;

    expect(player.armor).toStrictEqual(
      expect.objectContaining({
        name: "leather armor",
        tailored: true,
        type: "armor"
      })
    );
  });

  it("unequips item if removed", () => {
    const game = new Game();
    localStorage.setItem(
      "state",
      `{
        "player": {
          "inventory": [
            ${JSON.stringify(game.dataSets.armors["leatherArmor"])}
          ] 
        }
       }`
    );
    game.load();
    const player = game.player;

    player.inventory.equip(player.inventory.items[0]);

    expect(player.armor).toStrictEqual(
      expect.objectContaining({
        name: "leather armor",
        tailored: false,
        type: "armor"
      })
    );

    player.inventory.removeItem(0);

    expect(player.armor).not.toStrictEqual(
      expect.objectContaining({
        name: "leather armor"
      })
    );
  });
});
