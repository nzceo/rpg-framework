import { config } from "../core/custom.rpg.config";
import townMaps from "../gameData/maps/town";

/**
 * A static config that we won't change exclusively for tests.
 */
export const testConfig = {
  ...config,

  defaultMap: townMaps[0]
};
