import { waistIsAbove, sizeMatches } from "./pFuncs";
import Fertile from "./fertile";
import Game from "../../game/game";
import { Message } from "../../types/IGame";

export interface PMessages {
  m: Message;
  display: (fertile: Fertile) => boolean;
}

export const pMessages: PMessages[] = [
  {
    m: "Your period seems to be late.",
    display: (fertile: Fertile) =>
      fertile.statusData.pregnancy.progressDays > 28
  },
  {
    m: "You're feeling nauseous.",
    display: (fertile: Fertile) =>
      fertile.statusData.pregnancy.progressDays > 42
  },
  {
    m: (game: Game) => {
      if (game.player.fertility.isFirstPregnancy()) {
        return [
          `%fairy% "You're looking a bit chubby, you should look after your figure more."`,
          `%player% "Am I? Strange, I don't think I've been eating more than usual."`
        ];
      } else {
        return [
          `%fairy% "Have you looked at yourself in the mirror lately? I think you're getting fat again! Wait did you even get your period this month?"`,
          `%player% "No... I'm a bit late but I'm sure it's nothing."`,
          `%fairy% "Don't tell me you've gotten yourself impregnated again?! How many times does it need to happen before you stop fucking around?"`,
          "You really hope she isn't right, but it's hard to deny your stomach swelling outwards..."
        ];
      }
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 2)
  },
  {
    m: (game: Game) => {
      game.player.fertility.setPregnancyKnown();
      return [
        "Your waist has been thickening for a few weeks now. As you touch the small roundness that has appeared on your once-flat stomach you finally succumb to what you've been trying to avoid thinking about for so long. You're pregnant, you're not sure when it happened but there's a child growing inside you.",
        `%fairy% "You better not let this affect your quest, there's no way I'm going to sit around for 9 months before you push your bastard out."`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 4)
  },
  {
    m:
      "Every morning you wake up and your belly looks a bit rounder than the day before. If you wear large enough clothes you can still hide the swell of your tummy, but once your clothes are off you look clearly pregnant. ",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 5)
  },
  {
    m: [
      "As you put on some clothes and get ready for the day you look down below your engorged breasts. Your belly is now obviously protruting from your body, your womb has expanded exponentially and the skin feels warm but hard when you touch it.",
      `%fairy% "We don't have time to waste for you playing proud mother, come on let's get going."`
    ],
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 6)
  },
  {
    m: (game: Game) => {
      if (
        game.player.fertility.isMultiples() &&
        !game.player.fertility.isKnownMultiples()
      ) {
        return [
          `%fairy% "Haha! Look at you, you're getting huge. I bet the father would be very proud to know you're growing him such a healthy bastard!"`,
          `%player% "I'm not that much bigger than normal, and it's not like I wanted this in the first place."`,
          "Is she right? Are you growing faster than normal? You don't remember anyone from the village getting as big as you so quickly.",
          "You're not completely sure but you think you can feel more movement than a single baby should be capable of. You decide to keep that for yourself though."
        ];
      }
      return [
        `%fairy% "Haha! Look at you, you're getting huge. I bet the father would be very proud to know you're growing him such a healthy bastard!"`,
        `%player% "I'm not that much bigger than normal, and it's not like I wanted this in the first place."`,
        "Is she right? Are you growing faster than normal? You don't remember anyone from the village getting as big as you so quickly."
      ];
    },
    display: (fertile: Fertile) =>
      waistIsAbove(fertile.statusData, 7) &&
      sizeMatches(fertile, ["large", "veryLarge"])
  },
  // {
  //   m:
  //     "A dark line that goes from your pubic area and your belly button seems to have appeared, it divides your pregnant belly in two perfectly.",
  //   display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 7)
  // },
  {
    m: (game: Game) => {
      return [
        "Like every other day for the past couple of weeks you wake up sore and tired. The more your belly grows and the heavier your womb becomes, the harder it is to find a comfortable position to sleep in.",
        `%player% "Ugh, this belly is really starting to get heavy. My back is killing me."`,
        `%fairy% "Serves you right, it's an appropriate punishment for being a slut."`,
        "You rest your hands on the small of your back to give you some respite over carrying your heavy womb wherever you go, but it doesn't do much to improve the constant discomfort."
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 10)
  },
  {
    m: "Your belly button has recently popped and become an outie. ",
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 12)
  },
  {
    m: (game: Game) => {
      if (game.player.fertility.isMultiples()) {
        return [
          "Your stomach is now big enough to be a nuisance during your daily activities. Your womb's weight and size make it difficult to get up when you're sitting and slow down your movements considerably.",
          "For the first time you clearly feel kicks from two opposites sides within your womb, your hands shoot to where you felt the movement.",
          `%fairy% "What is it now?"`,
          `%player% "I think I felt two kicks..."`,
          `%fairy% "You're telling me you didn't just get yourself bred by a stranger, but you're also having twins? You're unbelieveable. I can't believe I'm stuck with you."`,
          "Giving birth to one child is already a lot to think about, but having multiples? You can't even imagine how difficult that's going to be.",
          "You shudder thinking at how big you're going to be in a couple months time."
        ];
      }
      return [
        "Your stomach is now big enough to be a nuisance during your daily activities. Your womb's weight and size make it difficult to get up when you're sitting and slow down your movements considerably, movements from within have also started increasing in frequency it's hard to go a day without feeling a kick or a punch.",
        `%fairy% "Nice waddle, now you really look like a pregnant woman."`,
        "You hadn't noticed, but she's right, your walk has slowly developed into a deep waddle to accomodate the size of your stomach."
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 13)
  },
  {
    m: [
      "You try to get out of bed you suddenly realize how difficult moving your heavy body has become.",
      `%fairy% "Come on fatass, I don't have time to wait for your huge pregnant ass to get up."`,
      `%player% "Shut up! I'm trying my best here, I can barely rollover with this thing in me.`,
      "Once you're on your feet, you feel your womb shift downwards and its weight settling deep within your pelvis.",
      "You place a hand under your burgeoning stomach and try to lift its weight, it relieves you of some of the enormous pressure you're feeling, but it's only temporary."
    ],
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 15)
  },
  // Something about not being able to breathe?
  {
    m: (game: Game) => {
      if (game.player.fertility.isMultiples()) {
        return [
          "Your belly is huge, you are surprised that it could've grown so much in such a short amount of time.",
          `%player% "I'm huge..."`,
          `%fairy% "Yeah you are and I hope you're ready to get bigger, you're nowhere close to being done."`,
          "The babies are getting heavier and heavier by the day and you are really starting to wish you could get this whole thing over with, but you know you're probably not even close to getting them out of you.",
          "As you cup your swelling stomach, it's hard to imagine how much further these babies will stretch you before they're ready to come out."
        ];
      }
      return [
        "Your belly is huge, you are surprised that it could've grown so much in such a short amount of time.",
        `%player% "I'm huge..."`,
        `%fairy% "Yeah you are and I hope you're ready to get bigger, you're nowhere close to being done."`,
        "The babies are getting heavier and heavier by the day and you are really starting to wish you could get this whole thing over with."
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 17)
  },
  {
    m: (game: Game) => {
      return [
        `%player% "Ow! Owowowowowowow... Gah!" You complain, one hand on your straining uterus as ${
          game.player.dialogHelpers.isKnownMultiples()
            ? "the babies painfully shift"
            : "the baby painfully shifts"
        } inside you in the hope of finding more space.`,
        `%player% "So much movement..." You caress your huge womb trying to soothe ${
          game.player.dialogHelpers.isKnownMultiples()
            ? "its occupants"
            : "its occupant"
        }`,
        `%fairy% "${
          game.player.dialogHelpers.isKnownMultiples()
            ? "It looks"
            : "They look"
        } pretty huge and strong, but look on the bright side at least you can't be that far from pushing them out."`,
        `You sure hope she's right, but every day you keep waking up a bit bigger.`,
        `${
          ["first", "second"].includes(
            game.player.dialogHelpers.getPregnancyTerm()
          )
            ? `You try to do the math in your head but realise you're nowhere close to full-term. Your heart sinks at the thoughts of what you'll have to give birth to.`
            : ""
        }`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 18)
  },
  {
    m: (game: Game) => {
      return [
        `You sit on the edge of the bed with your feet on the ground and your bulging womb between your legs. You're too big to simply get up, instead you shift your weight back and forth until the momentum and the weight of your stomach allows you stand up.`,
        `%player% "OOOooooofff... There we go." You tell yourself.`,
        `%fairy% "You looked absolutely ridiculous doing that, who's ever going to hire an adventurer that can't even stand up by herself!?"`,
        `%player% "I'll have you know I'm a great adventurer, pregnant or not!"`,
        "You know she's right though, the more your uterus expands the less able you are at fighting.",
        "The alternative is to go work in a brothel until you give birth, so you're not quite sure what would be worse."
      ];
    },
    display: (fertile: Fertile) => fertile.dialogHelpers.fetusWeightIsAbove(10)
  },
  {
    m: (game: Game) => {
      return [
        `%player% "Guh... So much pressure..."`,
        `When standing up, the huge weight of ${
          game.player.dialogHelpers.isKnownMultiples()
            ? "the children"
            : "the child"
        } you're carrying settles low within your pelvis.`,
        `%fairy% "Heh, the way your swing that belly left and right with each step tells me whatever's stuck between your legs must be huge!"`,
        `%player% "Shut up ${game.fairyName}, this is uncomfortable enough without your comments."`
      ];
    },
    display: (fertile: Fertile) => fertile.dialogHelpers.fetusWeightIsAbove(12)
  },
  {
    m: (game: Game) => {
      return [
        `%fairy% "Are you sure you only have one in there? Maybe you or the doc made a mistake."`,
        `%player% "I already told you a thousand times: yes! I think I'd know if I was having more than one at this point."`,
        `%fairy% "Hey don't take it out on me, I wasn't the slut that got bred by a monster ❤"`,
        `%player% "Shut up, it's not a monster, it's just a big child!"`,
        `Or so you can keep telling yourself, you've felt the baby's muscular body through the thin walls of your overstretched womb and there's no way they feel normal. Not that you'd ever admit that to ${game.fairyName}.`
      ];
    },
    display: (fertile: Fertile) =>
      fertile.dialogHelpers.waistIsAbove(fertile.statusData, 22) &&
      !fertile.dialogHelpers.isKnownMultiples() &&
      fertile.dialogHelpers.isMonsterPregnancy()
  },
  {
    m: (game: Game) => {
      return [
        `There's no way you should be this big. Your great taut ball of a womb is so stretched and full it greatly restricts your movement options.`,
        `Turning your torso, bending over, leaning back... With your waistline now more than doubled these are all things of the past.`,
        `Just how big ${
          game.player.dialogHelpers.isKnownMultiples()
            ? "are these babies?"
            : "is this baby?"
        }`
      ];
    },
    display: (fertile: Fertile) =>
      fertile.dialogHelpers.waistIsAbove(25) &&
      fertile.dialogHelpers.sizeMatches(["large", "veryLarge"])
  }
  // This should be specifically for singleton and larger babies

  // Dexterity penalties
  //   {
  //     m: "With your belly growing bigger by the day you find yourself having a harder time moving around. It's not a huge problem for now, but you wonder how worse it will get the more your womb expands. You get a Dexterity penalty until you have the baby.",
  //     waistStart: 9,
  //     waistEnd: 14,
  //     statPenalty: "size",
  //   },
  //   {
  //     m: "Your belly is now a major nuisance for you, because of its size you find yourself having a much harder time moving around than a few months ago.  You get a Dexterity penalty until you have the baby.",
  //     waistStart: 14,
  //     waistEnd: 26,
  //     statPenalty: "size",
  //   },
  //   {
  //     m: "Honestly, with the size your womb has reached you should not be doing anything at all that involves being quick and agile. Your gravid womb is constantly in the way, it not only slows you down, but it also throws off your balance since it sticks out so far in front of you. You get a Dexterity penalty until you have the baby.",
  //     waistStart: 26,
  //     waistEnd: 999,
  //     statPenalty: "size",
  //   },

  //   // Constitution buffs
  //   {
  //     m: "Thanks to your advancing condition, your body has started to fatten up in all the right places. Not only you find yourself to have become more curvy, but the extra layer of protection on your bones does wonders for your defense. You get a Constitution bonus until the baby is born.",
  //     waistStart: 9,
  //     waistEnd: 14,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "To help protect your developing baby, your body is now covered by a layer of fat that you didn't have before getting pregnant. While some extra protection is nice, you can't help but be a bit angry that the baby has completely taken over your body, leaving you almost no control over these changes. You get a Constitution bonus until the baby is born.",
  //     waistStart: 14,
  //     waistEnd: 26,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "Your once taut body is now covered by a thick layer of protective pregnancy fat. Luckily for you the fat you've been gaining is barely noticeable thanks to the gargantuan size your belly has grown to. You get a Constitution bonus until the baby is born.",
  //     waistStart: 26,
  //     waistEnd: 999,
  //     statPenalty: "weight",
  //   },

  //   // Strength buffs
  //   {
  //     m: "Either because of developing motherly instincts or because your body is getting used to move more weight than usual, your muscles have become stronger. You get a Strength bonus until the baby is born.",
  //     waistStart: 9,
  //     waistEnd: 14,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "Thanks to all the pregnancy weight you've been stacking on and because of the pregnancy hormones subconsciously telling you to protect your baby, you find yourself becoming stronger. You get a Strength bonus until the baby is born.",
  //     waistStart: 14,
  //     waistEnd: 26,
  //     statPenalty: "weight",
  //   },
  //   {
  //     m: "Sure, you might feel bad about just how bloated your body feels, especially your stomach, but you have to admit to yourself that the fat brought on by the pregnancy has definitely made you more resistant. You get a Constitution bonus until the baby is born.",
  //     waistStart: 26,
  //     waistEnd: 999,
  //     statPenalty: "weight",
  //   },
];

export const contractionMessages: PMessages[] = [
  {
    m: [
      "While getting ready for the day you start feeling a sharp pain developing at the bottom of your spine which slowly travels to the lower curve of your belly. The sharp pain winds you, forcing your to double over loudly inhaling and exhaling.",
      `"OOOOOOOOoooooooooooooooh..." A guttural moan escapes your lips.`,
      "After a couple of minutes the pain slowly starts fading and you regain your composure. Your face is pale and beads of sweat trickle down your forehead from the sudden effort. You caress your belly to try and calm down the movement from within, you must not have long to go."
    ],
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 10)
  },
  {
    m: (game: Game) => {
      return [
        "As you struggle to lift your heavy body to a standing position your womb suddenly contracts harder than you've ever felt it. The pain winds you and you double over, your hands reaching to the undercurve of your massive belly.",
        "Looking down, you can tell your usually protruding belly has signficantly shrunk because of the contraction, it feels hard as rock to the touch.",
        `Your hand caresses your womb aimlessly in a vain attempt to stop the contraction and to try to soothe the ${
          game.player.fertility.isMultiples() ? "children" : "child"
        } inside as your face goes red from the strong pressure.`,
        `"GGGGGGGGGGGGGUUUUUUUUUUuuuuuuuuuuuuuuh... uuuuuuuuuuuuuughhhhhhh..." Moans and guttural sounds escape your throat as you breathe through the searing pain.`,
        `After a lot of breathing in and out the pain starts fading and the muscles in your womb relax. The ${
          game.player.fertility.isMultiples() ? "children" : "child"
        } inside takes a couple more minutes to stop its frantic thrashing. As you try to compose yourself you realise you probably don't have long before birth.`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 12)
  },
  {
    m: (game: Game) => {
      return [
        `Without warning your midsection is gripped by what feels like red-hot iron band wrapping around your womb. The shock of the sudden pain makes your knees go limp and forces you into a deep squat, your legs spread far apart and belly hanging low between them.`,
        `With your hands on your knees for balance you instinctively bring your chin to your chest. The more your womb contracts the harder the ${
          game.player.fertility.isMultiples()
            ? "head of the first baby"
            : "baby's head"
        } is forced into your pelvis.`,
        `"GGGGGGGGGGGGGGgggaaaaaaaaaaaaaaaaaahhhhhhhhhh! WWWWWWWWHOoooooooooooooooooooo... Wwwwwwwwwwhooooooooooooo..." You exhale and inhale through the pain.`,
        `"OOOOOOOOOOOOOOOOOOOOooooooooooooooooaaaaaaaaaaaaaaaah!!!! PRESSUREEEE!!!" You cry out as the contraction peaks.`,
        `As the pain starts fading away you regain composure, your face red and clammy from the sudden effort. You lower yourself on all four, before slowly lifting yourself up to a standing position.`,
        `You're quite worried about the size of the head you felt during the contraction, it was like a coconut being squeezed through a sleeve, just how big ${
          game.player.fertility.isMultiples()
            ? "are the children"
            : "is the child"
        } inside you?`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 12)
  },
  {
    m: (game: Game) => {
      return [
        `All of a sudden, with barely any warning, a sudden pain grips your stomach. As your run your hands protectively over your huge, low hanging belly you feel it rise up, taut and hard like a clenched fist as the contraction quickly starts taking over your womb.`,
        `"HHHHHHhooooooooooooooooo... GGGGGGGGGHHHHHHHHHHOOOOOOOOoooooooooooooooo..." You let out a low hard groan, your face distorted into a grimace.`,
        `You can feel ${
          game.player.fertility.isMultiples()
            ? "on of your children's heads"
            : "the baby's head"
        } driving hard into your pelvis as the muscles of your uterus try to squeeze the child into a more suitable position for birth.`,
        `Just as it came, the contraction slowly subsides leaving you panting.`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 12)
  },
  {
    m: (game: Game) => {
      return [
        `Out of nowhere the almost constant backache caused by your enourmous protruding abdomen suddenly intensifies as a burning cramping feeling clutches your stomach.`,
        `“Ooohhh,” you gasp, “OOOOHhhhh!” pressing with your fingertips into your burning and suddenly very tight belly.`,
        `“OOoooohhh… HHnnnngggh,” you grunt as you fight to ride out the crest of cramping pain clutching at your tummy.`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 12)
  },
  {
    m: (game: Game) => {
      return [
        `Out of nowhere you feel your womb contracting, pain starts from your back and quickly it encircles your entire midsection. You suddenly feel your womb and the ${
          game.player.fertility.isMultiples() ? "children" : "child"
        } within being squeezed harder than than ever as the pressure in your uterus increases more and more.`,
        `You instinctively reach your hands below the swell of your stomach to try and relieve some of the pressure in your pelvis as your body tries to squeeze the ${
          game.player.fertility.isMultiples() ? "children" : "child"
        } out, but you quickly realize that it doesn't help much.`,
        `Instead you end up running the palms of your hands over your rock-hard stomach in the hope of stopping the contraction or calming the ${
          game.player.fertility.isMultiples() ? "babies" : "baby"
        } within.`,
        `As you caress the taut skin of your belly, your contracting womb muscles squeezing down on the ${
          game.player.fertility.isMultiples() ? "children" : "child"
        } within you give you an idea of just how big ${
          game.player.fertility.isMultiples()
            ? "their bodies are."
            : "its body is."
        }`,
        `"Oooooooooooooooooofff..." You exhale as the contraction slowly ebbs. `
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 13)
  },
  {
    m: (game: Game) => {
      return [
        `While you're getting ready for your day you start feeling a dull pain radiating from your straining uterus. Before your can even react and brace yourself, your eyes go wide with shock as the pain ramps up all of a sudden.`,
        `"A a a a a a g g g h h h h ! ! . . . H h o o o ! . . . H h o o o ! . . ." You cry out, as the agonising band of pain travels across the low swell of your abdomen.`,
        `You try to take control over the excrutiating contraction that has taken hold of your enormous mound, but you can't do much except let the pain wash over you.`,
        `Eventually the contraction fades away as quickly as it started. You try to recompose yourself as best as you can from the scare.`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 13)
  },
  {
    m: (game: Game) => {
      return [
        `Right as you get get up, you feel an all too common heavy shift within your overripe belly as ${
          game.player.fertility.isMultiples()
            ? "the babies within you readjust themselves"
            : "the baby within your readjusts itself"
        }.`,
        `You brace yourself as you know the process is usually followed by a lot of movement, however rather than the usual pushing and kicking you're met with a searing band of pain flaring around the widest part of your outstretched tummy.`,
        `"Oh!" You blurt out in surprise. Your gasp very quickly turns into a low moan. "HHHHHHHHOooooooooooooooooooo..."`,
        `Holding on for support with one arm, you try your best to massage away the firmness and tension of your overstretched muscular walls to no avail.`,
        ` "Whooooooooooooooo... Whooooooooooooooo... Whooooooooooooooo..." You loudly blow out air in and out of your mouth to regain a semblance of control over the situation.`,
        `Much to your surprise this seems to work as the contraction slowly fades.`
      ];
    },
    display: (fertile: Fertile) => waistIsAbove(fertile.statusData, 13)
  }
];
