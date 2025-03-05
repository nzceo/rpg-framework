import Player from "../player/player";
import Actor from "../actor/actor";

const dialogFuncs: {
  [key: string]: Function;
} = {
  ifFlagExists: (prop: { classToCheck: Player | Actor; flagName: string }) => {
    console.log(prop.classToCheck);
    return prop.classToCheck.getState(`flags.${prop.flagName}`) ? true : false;
  }
};

export const dialog = dialogFuncs;
