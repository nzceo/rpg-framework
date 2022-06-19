import Game from "../game/game";
import Map from "../map/map";
import Dice from "roll";

const dice = new Dice();

const encounters = (game: Game, map: Map) => {
  const mapEncounterChance = map.data.encounterChance || 100;
  const chanceRoll = dice.roll("d100");

  if (chanceRoll.result < mapEncounterChance) {
    const encounterRoll = dice.roll(`d${map.data.encounters!.length}`);
    // @ts-ignore
    const encounter = map.data.encounters[encounterRoll.result - 1];
    // @ts-ignore
    game.addEnemy(encounter);
    game.player.switchState("combat");
    game.addToExtraDisplay({
      type: "flavor",
      text: `${encounter.name} wants to fight!`
    });
  }
};

export default encounters;
