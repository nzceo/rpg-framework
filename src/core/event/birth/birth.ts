import CustomEvent from "../";
import Game from "../../game";

class BirthEvent extends CustomEvent {
  constructor(game: Game, data: any) {
    super(game, data);
    this.birthStart();
    this.birthEventPlaceholder();
  }

  birthStart() {
    this.addToDisplay([
      {
        text: `You get suddenly woken up by a sharp pain in your back. You hold your breath while trying to rub away the deep cramping.`,
        type: "dialog"
      },
      {
        text: `After a while the pain starts to fade, but as you breathe a sigh of relief thinking the worse has passed it comes back again.`,
        type: "dialog"
      },
      {
        text: `You heavily and awkwardly try to walk the recurring pains off but they just keep coming back over and over again.`,
        type: "dialog"
      },
      {
        text: `"Oh god... I think it's time..." You whimper to yourself, surrendering to the reality that you're finally in labor.`,
        type: "dialog"
      }
    ]);
  }

  birthEventPlaceholder() {
    this.addToDisplay([
      {
        text: `You can't tell how long you've been in labor for but it feels like an eternity. Your hard round tummy clenches into a hard fist one more time as another contraction tries to force the ${
          this.game.player.fertility.babies() === 0 ? `baby` : `babies`
        } out of you.`,
        type: "dialog"
      },
      {
        text: `"GGGGGGGGGGGGGGHUUUUUUUUUUUUUUUUUUuuuuuuuuuuu... HHHHHOOOOoooooooooo..." You moan trying to ride out the pain.`,
        type: "dialog"
      },
      {
        text: `The pains have been going on for what feels like days at this point but you still don't feel the urge to push.`,
        type: "dialog"
      },
      {
        text: `"I can't take it... HHHHHooooooo..." You moan trying to ride out the pain, one hand on the great taut mass of your straining abdomen.`,
        type: "dialog"
      },
      {
        text: `Suddenly a much stronger contraction tightens your uterus. You feel the ${
          this.game.player.fertility.babies() === 0
            ? `baby's head`
            : `head of the first baby`
        } drop into the birth canal.`,
        type: "dialog"
      },
      {
        text: `"HHHHHHHHHOOOOOOOOOOOOOOOO!!!! PRESSURE!!! OH GOD THE PRESSURE!!!" You scream, dropping into a deep squat tummy hanging low inches away from the ground.`,
        type: "dialog"
      },
      {
        text: `Your hands shoot to the underside of your tightly stretched stomach as you try to lift the hefty weight of the baby within to try an relieve some of the pressure. `,
        type: "dialog"
      },
      {
        text: `"I NEED TO PUSH!!! GGGGGGGGGHHHHHHHHHHHHHHAAAAAAAAAAAAA..." You scream at the top of your lungs as the contraction peaks.`,
        type: "dialog"
      },
      {
        text: `You bear down with all your might making your overburdened womb go as hard as a rock. 
        Pushing relieves some of the pressure but at the same time you become very aware of the size of the mass you're trying to push out.`,
        type: "dialog"
      },
      {
        text: `The huge child within you barely moves at all but makes its discomfort very apparent as its legs thrash in the upper part of your stomach.`,
        type: "dialog"
      },
      {
        text: `"Hoooo... Hooooooo... So big..." You pant trying to recover from the contraction, one hand on the vast ripe boulder of your straining abdomen.`,
        type: "dialog"
      },
      {
        text: `Some time later...`,
        type: "flavor"
      },
      {
        text: `"GGGGGGGHHHHHHHHHHHAAAAAAAAAAAAAAAAA!!! You shriek as you bear down for what feels like the thousandth time."`,
        type: "flavor"
      },
      {
        text: `With your arm stretched around your tightly packed womb to reach your stretched pussy, you feel the huge mass of the baby's head starting to
        spread you inch by inch.`,
        type: "flavor"
      },
      {
        text: `"Must't tear!! HHHHHHHHOOOOOOOOOOOOOOOOO!!! Can't tear!!!" You repeat to yourself, remembering some of the 
        birthing rituals you witnessed back at the village. You find yourself wishing you had paid more attention back then,
        as it would be of great use right about now. ${
          this.game.player.fertility.isFetusBiggerThanAverage()
            ? `Not that you've ever seen any women at the village birth
           something quite as huge as this child.`
            : ``
        }`,
        type: "flavor"
      },
      {
        text: `"Oh?! Nonononononononoooooo!!!" Suddenly you find yourself unable to hold back the head of your child as the pressure from within increases. You try to stop pushing 
        to stop the descent of the body within you but it's too late. Your lips are stretched to their limit as the head lurches forward.`,
        type: "flavor"
      },
      {
        text: `With a gush of fluid the head pushes past your battered pussy. You savor the release of pressure for a couple of seconds before it comes 
        back stronger than ever before, your body screaming at you to get this child out asap.`,
        type: "flavor"
      },
      {
        text: `"GGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHAAAAAAAAAAAAAAAAAAAAAA!!!!" You scream as you bear down. The huge body of the child in your pussy 
        starts to slowly rotate and move forward as your vagina strains to pass the baby's huge shoulders.`,
        type: "flavor"
      },
      {
        text: `With one final push the mass finally starts moving as the shoulders start to exit you. You grab the child just in time as it comes out from 
        under you. You sit down and put the newborn on your ${
          this.game.player.fertility.babies() === 1
            ? `emptied belly`
            : `still sizeable belly`
        }, 
        It's a ${this.game.player.fertility.fetusType} child.`,
        type: "flavor"
      },
      {
        text: `${
          this.game.player.fertility.babies() === 1
            ? ``
            : `With the first baby out, the other one is much easier to birth. It comes out just a couple of hours after the first.`
        }.`,
        type: "flavor"
      },
      {
        text: `You've given birth to ${
          this.game.player.fertility.babies() === 1
            ? `${
                this.game.player.fertility.statusData.pregnancy.fetusType
                  .menuText.single
              }. It weighs ${this.game.player.fertility.statusData.pregnancy.fetuses[0].weight.toFixed(
                2
              )}lb.`
            : `${this.game.player.fertility.babies()} ${
                this.game.player.fertility.statusData.pregnancy.fetusType
                  .menuText.multiple
              }. They weigh ${this.game.player.fertility.statusData.pregnancy.fetuses
                .map((f: any) => `${f.weight.toFixed(2)}lb `)
                .join("and ")} respectively.`
        }`,
        type: "flavor"
      }
    ]);
  }
}

export default BirthEvent;
