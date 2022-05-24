import Actor from "../actor/actor";
import Map from "../map/map";
import { IActor } from "./IActor";
import { ICharacter } from "./ICharacter";
import { IDisappearing } from "./IDisappearing";

export interface IMapContructorArg extends IDisappearing<Map> {
  /**
   * This map's unique ID
   */
  id: string;
  /**
   * The name of the map.
   */
  name: string;
  /**
   * Other maps Ids that this map is connected to, allowing travel between them.
   */
  connectionRefs?: string[];
  /**
   * Generated map classes for connections
   */
  connections?: Map[];
  /**
   * Characters that can be interacted with on this map.
   */
  actorRefs?: IActor[];
  /**
   * Generated actor classes that can be interacted with
   */
  actors?: Actor[];
  /**
   * Possible encounters when traveling to this map
   */
  encounters?: ICharacter[];

  encounterChance?: number;
}
