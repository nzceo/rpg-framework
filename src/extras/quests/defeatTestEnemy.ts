import Game from "../../core/game/game";
import Player from "../../core/player/player";
import Quest from "../../core/quest/quest";

class DefeatTestEnemy extends Quest {
  constructor(
    game: Game,
    character: Player,
    {
      onDefeat,
      rewards
    }: {
      onDefeat?: () => any;
      rewards?: () => any;
    } = {}
  ) {
    const questId = "defeatTestEnemy";
    super(game, character, {
      id: questId,
      name: "Defeat Test Enemy",
      explanation: "Test enemy needs to be defeated because reasons"
    });
    this.character = character;
    if (onDefeat && rewards) {
      this.onDefeat = onDefeat;
      this.rewards = rewards;
    }

    /**
     * Initialise the quest data in case there has to be
     * default data. Overridden by any data in the game state.
     */
    this.character.setState(`quests.${questId}`, {
      totalDefeated: 4,
      totalToDefeat: 5,
      ...this.character.getState(`quests.${questId}`)
    });
  }

  onDefeat(id: string) {
    const totalDefeated = this.questData.totalDefeated;
    if (id === "testEnemy1" && totalDefeated < 5) {
      this.questData = { totalDefeated: totalDefeated + 1 };
    }
  }

  isCompleted() {
    const totalDefeated = this.questData.totalDefeated;
    const totalToDefeat = this.questData.totalToDefeat;
    return totalDefeated >= totalToDefeat;
  }
}

export default DefeatTestEnemy;
