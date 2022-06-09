import Game from "../../../core/game";
import { RandomMessagesSet } from "../../../core/types";

/**
 * Messages to display when enemy accepts player's submission
 */
const acceptSubmission: RandomMessagesSet[] = [
  {
    m: (game: Game) => {
      game.player.sex(game.enemyData[0].data.fertility!);
      return [
        `The enemy ${game.enemyData[0].name} walks up to you with lust in his eyes massaging his half erected cock.`,
        `Wasting no time he pulls out his dick and positions himself on top of you. Before you even have the chance to tell him to slow down
      his tip is already pressing against your lips.`,
        `"Hey wait a second, don't go that fa-" The words coming out of your mouth are interrupted by the feeling of his massive cock being shoved into you in a single stroke.`,
        `Before you know it the enemy ${game.enemyData[0].name} has put his entire weight on you as shoves his cock in and out of your battered pussy over and over.`,
        `"PleaseeeeeeeEEEE!!! You'rre crusHING MEEEE!!!" You barely manage to say as he speeds up his rhythm.`,
        `He suddenly grunts and pushes his dick as deep as possible inside you. A expected you start feeling his cum spurting out right at the entrance to your womb.`,
        game.player.dialogHelpers.isPregnancyKnown()
          ? `"NOOOOOOOOOOOO!!! Don't cum on the ${
              game.player.dialogHelpers.isKnownMultiples() ? "babies" : "baby"
            }!!!!" You scream as you try to get him off of you.`
          : `"NOOOOOOOOOOOO!!! Not insideeeee!!!!" You scream as you try to get him off of you.`,
        `He waits until every last bit of cum is squirted into you, drilling it deeper into your pussy with his still erect dick.`,
        `Cum soon starts dripping out and pooling onto the ground under you. He slowly gets up as you lay there, legs spread and cum drooping out of you. Obviously proud of his handy work he smirks and walks away.`,
        `Eventually you get up yourself, you try for a bit to get some of his cum out to no avail.`
      ];
    },
    display: (game: Game) => true
  }
];

export default acceptSubmission;
