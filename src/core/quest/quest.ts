import Game from "../game/game";
import Player from "../player/player";
import { IQuest } from "../types/IQuest";

class Quest {
  data: IQuest;
  character: Player;
  game: Game;

  constructor(game: Game, character: Player, data: IQuest) {
    this.data = data;
    this.game = game;
    this.character = character;

    this.character.setState(`quests.${this.id}`, {
      ...this.character.getState(`quests.${this.id}`)
    });
  }

  /**
   * Called when the quests is turned in and completed
   */
  rewards() {}

  /**
   * Completes quests. Calls `this.rewards` to determine what rewards the player gets.
   */
  turnIn() {
    this.character.removeQuest(this.id);
    this.character.moveToCompletedQuests(this);
    this.rewards();
  }

  /**
   * Returns if the quest has been completed
   */
  isCompleted(): boolean {
    return true;
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  /**
   * Triggered whenever the player travels to a new map
   * @param id - the id of the new map
   */
  onTravelTo(id: string) {
    console.log(this.data.id, "onTravelTo", id);
  }

  /**
   * Triggered whenever the player defeats an enemy
   * @param id - the id of the enemy
   */
  onDefeat(id: string) {
    console.log(this.data.id, "onDefeat", id);
  }

  /**
   * Returns all the extra data from the quest
   * Do whatever you want with it
   */
  get questData(): any {
    return this.character.getState(`quests.${this.id}`);
  }

  /**
   * Sets data to the game status
   */
  set questData(value: any) {
    this.character.setState(`quests.${this.id}`, {
      ...this.questData,
      ...value
    });
  }
}

export default Quest;
