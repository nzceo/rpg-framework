import Character from "../../core/character/character";
import Game from "../../core/game/game";
import Status from "../../core/status/status";
import { addCapital } from "../../core/helpers/dialogHelpers";

class TestableStatus extends Status {
  constructor(
    game: Game,
    character: Character,
    {
      eachTurn,
      eachDay,
      onRemove
    }: {
      eachTurn?: () => any;
      eachDay?: () => any;
      onRemove?: () => any;
    } = {}
  ) {
    super(game, character, {
      type: "testableStatus",
      name: "Just a testable status",
      explanation: "The explanation"
    });
    this.statusData = {
      otherStuff: {
        testData: `${
          this.character.isYou() ? "don't" : "doesn't"
        } look very good`
      }
    };
    if (eachTurn && eachDay && onRemove) {
      this.eachTurn = eachTurn;
      this.eachDay = eachDay;
      this.onRemove = onRemove;
    }
  }

  describe() {
    return `${addCapital(this.character.pronoun)} ${
      this.statusData.otherStuff.testData
    }.`;
  }
}

export default TestableStatus;
