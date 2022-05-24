import { dialog } from "../helpers/disappearingHelpers";
import { IMapContructorArg } from "../types/Imap";
import testMap1Actors from "./testMap1/actors";
import enemies from "./enemies";

/**
 * This is essentially test data, the client should send its own
 * mapdata
 */
const maps: IMapContructorArg[] = [
  {
    id: "test-map-1",
    name: "Test map",
    connectionRefs: ["test-map-2", "test-map-3"],
    actorRefs: testMap1Actors
  },
  {
    id: "test-map-2",
    name: "Test map 2",
    connectionRefs: ["test-map-1"]
  },
  {
    id: "test-map-3",
    name: "Test map 3",
    connectionRefs: ["test-map-1"],
    visible: (c) =>
      dialog.ifFlagExists({
        flagName: "aflagthatdoesntexist",
        classToCheck: c
      })
  },
  {
    id: "test-map-4",
    name: "Test map 5",
    connectionRefs: ["test-map-1"],
    hidden: (c) =>
      dialog.ifFlagExists({
        flagName: "aflagthatdoesntexist",
        classToCheck: c
      })
  },
  {
    id: "test-map-5",
    name: "Map connected to map with enemies",
    connectionRefs: ["enemy-test-map-1"],
    actorRefs: testMap1Actors
  },
  {
    id: "enemy-test-map-1",
    name: "Map with enemies",
    connectionRefs: ["test-map-5"],
    encounters: [enemies.testEnemy]
  }
];

export default maps;
