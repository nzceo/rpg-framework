import levels from "./levels";
import maps from "./maps";
import stats from "./stats";
import archetypes from "./archetypes/character";
import { IPlayer } from "../types/IPlayer";

const player: IPlayer = {
  name: "Hero",
  dialogRef: "",
  mapRef: maps[0].id,
  checkpointRef: maps[3].id,
  experience: {
    ...levels[0],
    current: 0
  },
  levelData: levels,
  combat: stats.strong,
  description: archetypes.player
};

export default player;
