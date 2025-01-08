import { IMapContructorArg } from "../types/Imap";
import Salveable from "../saveable/saveable";
import Game from "../game/game";

class Map extends Salveable {
  data: IMapContructorArg;
  game: Game;

  /**
   * Map constructor
   */
  constructor(map: IMapContructorArg, generateConnections = true, game: Game) {
    super(game, map.id);
    this.data = map;
    this.game = game;

    if (generateConnections) {
      this.generateConnections();
    }
    this.generateActors();
  }

  /**
   * Returns the map name
   */
  get name() {
    return this.data.name;
  }

  /**
   * Returns connections
   */
  get connections() {
    return (
      this.data.connections?.filter((connection) => {
        if (connection.data.visible || connection.data.hidden) {
          if (
            this.game?.player &&
            connection.data.visible &&
            !connection.data.visible(this.game)
          ) {
            return false;
          }
          if (
            this.game?.player &&
            connection.data.hidden &&
            connection.data.hidden(this.game)
          ) {
            return false;
          }
        }
        return true;
      }) || []
    );
  }

  /**
   * Returns actors
   */
  get actors() {
    return this.data.actors?.filter((actor) => {
      if (actor.data.visible || actor.data.hidden) {
        if (
          this.game?.player &&
          actor.data.visible &&
          !actor.data.visible(this.game)
        ) {
          return false;
        }
        if (
          this.game?.player &&
          actor.data.hidden &&
          actor.data.hidden(this.game)
        ) {
          return false;
        }
      }
      return true;
    })!;
  }

  /**
   * Connects maps together by creating map classes
   */
  generateConnections() {
    const connections =
      this.data.connectionRefs && this.data.connectionRefs.length
        ? this.data.connectionRefs.map((connection) => {
            const foundMap = this.game.config.maps.filter(
              (map) => map.id === connection
            )[0];
            return new Map(foundMap, false, this.game);
          })
        : [];

    this.data.connections = connections as Map[];
  }

  /**
   * generates actors on this map
   */
  generateActors() {
    this.data.actors = this.data.actorRefs
      ? this.data.actorRefs.map((actor) => {
          return new this.game.config.classes.actor(actor, this.game!);
        })
      : [];
  }

  /**
   * Travels player to this map
   */
  travelTo() {
    this.game!.player.map = this;
    this.game!.player.setState("mapRef", this.id);

    this.generateConnections();
    this.generateActors();
    this.initiateEncounter();
  }

  initiateEncounter() {
    if (this.data.encounters && this.data.encounters.length > 0) {
      this.game.config.encounter(this.game!, this);
    }
  }
}

export default Map;
