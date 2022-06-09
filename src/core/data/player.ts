import levels from "./levels";
import maps from "./maps";
import stats from "../../gameData/static/stats";
import archetypes from "./archetypes/character";
import { IPlayer } from "../types/IPlayer";

const player: IPlayer = {
  name: "Hero",
  dialogRef: "",
  mapRef: maps[0].id,
  checkpointRef: maps[3].id,
  purity: 100,
  experience: {
    ...levels[0],
    current: 0
  },
  levelData: levels,
  combat: stats.player,
  description: archetypes.player
};

export default player;
