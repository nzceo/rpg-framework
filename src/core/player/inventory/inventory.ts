import Game from "core/game";
import { addArrayOrStringToDisplay } from "core/game/utils/addArrayOrStringToDisplay";
import { cloneDeep, isFunction } from "lodash";
import { IInventory } from "../../types/IInventory";
import Player from "../player";

export type IPlayerItem = {
  id: string;
  key: string;
} & IInventory;

/**
 * Container class for inventory methods
 */
class Inventory {
  game: Game;
  player: Player;

  constructor(parent: Player) {
    this.player = parent;
    this.game = parent.game;

    /**
     * Items will get saved without functions
     * so on construct we want to reinitialise them
     */
    const items = (
      this.player.getState("inventory") || []
    ).map((item: IPlayerItem) => this.game.findItemById(item.id));

    // Initialise inventory
    this.player.setState("inventory", [...items]);
  }

  /**
   * Get all items in invetory
   */
  get items(): IPlayerItem[] {
    return this.player.getState("inventory");
  }

  /**
   * Add item to inventory
   */
  addItem(item: IInventory) {
    this.player.setState(`inventory`, [...this.items, cloneDeep({ ...item })]);
  }

  /**
   * Remove item at index
   */
  removeItem(index: number) {
    const itemToRemove = this.items.slice(index, 1)[0];
    let newItems = this.items.filter(function (_value, arrIndex) {
      return index !== arrIndex;
    });
    this.player.setState("inventory", newItems);

    switch (itemToRemove.type) {
      case "armor":
        if (itemToRemove.id === this.player.armor.id) {
          this.player.armor = undefined;
        }
        break;

      case "weapon":
        if (itemToRemove.id === this.player.weapon.id) {
          this.player.weapon = undefined;
        }
        break;
    }
  }

  /**
   * Equips item passed
   */
  equip(item: IInventory) {
    switch (item.type) {
      case "armor":
        const output = item.wear(this.player.game, item.tailored);
        let m;
        if (isFunction(output.message)) {
          m = output.message(this.player.game);
        } else {
          m = output.message;
        }
        addArrayOrStringToDisplay(this.player.game, m);
        if (output.result) {
          this.player.armor = item;
        } else {
          this.player.armor = undefined;
        }
        break;
      case "weapon":
        this.player.weapon = item;
        break;
    }
  }
}

export default Inventory;
