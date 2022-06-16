import { IArmor } from "../../core/types/IArmor";

const armors: {
  [name: string]: IArmor;
} = {
  clothes: {
    type: "armor",
    name: "clothes",
    damageThreshold: 1,
    basePrice: 1,
    tailored: false,
    describe: (game) => ({
      message: "You're wearing clothes."
    }),
    wear: () => ({
      result: true,
      message: "You put on clothes."
    })
  },
  dress: {
    type: "armor",
    name: "dress",
    damageThreshold: 2,
    basePrice: 20,
    tailored: false,
    describe: (game) => {
      if (game.player.dialogHelpers.waistIsAbove(20)) {
        return {
          message:
            "This dress has been tailored to fit over your pregnant body. Stretchy seams were added to its sides to accomodate your massive midsection. While you're able to wear it comfortably it still doesn't leave much to the immagination as your protruding belly button is clearly visible through the fabric, it's also quite easy to see any movements from within your womb."
        };
      } else if (game.player.dialogHelpers.waistIsAbove(13)) {
        return {
          message:
            "This dress already hugged your curves, now that you're visibly pregnant, the fabric is tightly stretches over your belly. Your belly button is poking through, leaving little to the immagination."
        };
      }
      return {
        message:
          "A brown dress. Not the kind of gear you would use for adventuring, however the way it hugs your curves is certainly enticing."
      };
    },
    wear: (game) => {
      const errorMessage =
        "You try your hardest to fit into the dress, but it just won't fit over your pregnany belly. You should give up on wearing this again or find a tailor.";
      if (game.player.dialogHelpers.waistIsAbove(20)) {
        if (game.player.armor.tailored) {
          return {
            result: true,
            message:
              "With some effort you manage to put on your dress. The stretchy sides of the dress allow the fabric to expand to fit around your bulging womb, the fabric strains around the widest part of your belly and clearly shows your bellybutton before draping down to the ground in a tent-like fashion."
          };
        } else {
          return {
            result: false,
            message: errorMessage
          };
        }
      }
      return {
        result: true,
        message: "You put on a dress."
      };
    }
  },
  leatherArmor: {
    type: "armor",
    name: "Ecluvian leather armor",
    damageThreshold: 12,
    basePrice: 20,
    tailored: false,
    describe: (game) => {
      if (game.player.dialogHelpers.waistIsAbove(15)) {
        return {
          result: true,
          message: [
            "This leather armor has been tailored to fit on your pregnant body.",
            "The breastplate's bottom has been entirely removed to give your growing womb more space to expand outwards. The trousers have also been fitted to accomodate your growing hips and backside.",
            "Your huge womb protrudes far enough outwards that the armor's undershirt now barely covers it. It stops just under your bellybutton, leaving your belly's underside completely exposed."
          ]
        };
      } else if (game.player.dialogHelpers.waistIsAbove(10)) {
        return {
          result: true,
          message: [
            "This leather armor has been tailored to fit on your pregnant body.",
            "The breastplate's bottom has been entirely removed to give your growing womb more space to expand outwards. The trousers have also been fitted to accomodate your growing hips and backside.",
            "Your belly is mostly covered by a fabric undershirt which is draped over your rounding uterus."
          ]
        };
      } else if (game.player.dialogHelpers.waistIsAbove(8)) {
        return {
          result: true,
          message:
            "You can barely fit in it. Your breasts breasts are almost spilling out of the breastplate and your stomach is straining against the tight leather. You're also having some trouble fitting in the trousers."
        };
      }
      return {
        result: true,
        message:
          "Leather armor comprised of a tight breastplate which hugs your curves with a deep neckline that leaves very little to the immagination. The trousers tightly hug your legs."
      };
    },
    wear: (game) => {
      if (game.player.dialogHelpers.waistIsAbove(10)) {
        if (game.player.armor.tailored) {
          return {
            result: true,
            message: [
              "You put on your tailored leather armor. First you wear the undershirt which drapes over your round tummy and ends just under your bellybutton, leaving the underside of your belly out in the open.",
              "The trousers have been made more stretchy to fit over your fattened backside, they now fit snugly.",
              "Finally you put on the breastplate which ends just above the swell of your stomach.",
              `"Is this really okay for me to wear? I don't feel very protected..." You say caressing the exposed curve of your low hanging tummy.`
            ]
          };
        } else {
          return {
            result: false,
            message:
              "You try your hardest to get into the breastplate but it just won't fit over your belly, while your backside is simply too big to get into the trousers. If you plan to wear this again before giving birth you should have it tailored."
          };
        }
      }
      return {
        result: true,
        message: "You put on your leather armor."
      };
    }
  },
  fighterTunic: {
    type: "armor",
    name: "fighter tunic",
    damageThreshold: 1,
    basePrice: 1,
    tailored: false,
    describe: (game) => {
      if (game.player.dialogHelpers.waistIsAbove(15)) {
        return {
          message: [
            "A tunic worn by dark skinned fighters from a far away land.",
            "A single piece of fabric usually fastened at the waist, the tunic drapes over the roundness of your tummy. You've noticed that while moving the dress would slip to the sides of your belly so you've started fastening it below the swell of your stomach.",
            "Your bellybuton is very much visible through the fabric.",
            "Under the tunic you wear shorts and a strap made of dark cloth to cover your breasts. Thankfully they're both quite stretchy."
          ]
        };
      } else if (game.player.dialogHelpers.waistIsAbove(8)) {
        return {
          message: [
            "A tunic worn by dark skinned fighters from a far away land.",
            "A single piece of fabric fastened at the waist, the tunic flows over the curve of your belly. You're a bit too big for fastening it at the waist so you've opted for fastening it just under your growing breasts.",
            "It makes your growing womb stick out much more than expected.",
            "Under the tunic you wear shorts and a strap made of dark cloth to cover your breasts."
          ]
        };
      }
      return {
        message: [
          "A tunic worn by dark skinned fighters from a far away land.",
          "A single piece of fabric fastened at the waist, the tunic extends down to your knees in front of you and behind you.",
          "Under the tunic you wear shorts and a strap made of dark cloth to cover your breasts."
        ]
      };
    },
    wear: (game) => {
      if (game.player.dialogHelpers.waistIsAbove(15)) {
        return {
          result: true,
          message: [
            "You try to pull up the black shorts over your belly but they reach just under your protruding bellybutton and eventually slide down the curve of your pregnant mound.",
            "You put on the tunic and fasten it just above your groin. Most of the front of your belly is covered, but its protruding sides are left exposed. Without the shorts covering your stomach, your belly button ends up poking through the fabric."
          ]
        };
      } else if (game.player.dialogHelpers.waistIsAbove(8)) {
        return {
          result: true,
          message: [
            "You slip into the black undergarments, the shorts are quite stretchy and allow you to pull them up over your rounding belly.",
            "You put on the tunic and fasten it below your breasts instead of your waist."
          ]
        };
      }
      return {
        result: true,
        message: [
          "You put on the black undergarments before donning the light tunic on top. You then fasten it around your waist."
        ]
      };
    }
  },
  fighterTunicNaked: {
    type: "armor",
    name: "fighter tunic (naked)",
    damageThreshold: 1,
    basePrice: 1,
    tailored: false,
    describe: (game) => {
      if (game.player.dialogHelpers.waistIsAbove(15)) {
        return {
          message: [
            "A tunic worn by dark skinned fighters from a far away land.",
            "A single piece of fabric usually fastened at the waist worn with dark fabric shorts and bra.",
            "You've decided to forego wearing the undergarments and opted to simply drape the tunic over your gravid form.",
            "Your engorged breasts sometimes spill out of the side of the tunic, and when they don't your nipples clearly poke through the fabric.",
            "The tunic stretches over your belly and remains fastened just above your groin. It's very clear to anyone you're fully naked under the tunic."
          ]
        };
      } else if (game.player.dialogHelpers.waistIsAbove(8)) {
        return {
          message: [
            "A tunic worn by dark skinned fighters from a far away land.",
            "A single piece of fabric usually fastened at the waist worn with dark fabric shorts and bra.",
            "You've decided to forego wearing the undergarments and opted to simply drape the tunic over your gravid form.",
            "Your nipples clearly poke through the fabric.",
            "The tunic drapes over your belly and remains fastened just under your breasts. Movement and wind easily moves the tunic aside revealing the swell of your pregnancy and your bare pussy underneath."
          ]
        };
      }
      return {
        message: [
          "A tunic worn by dark skinned fighters from a far away land.",
          "A single piece of fabric usually fastened at the waist worn with dark fabric shorts and bra.",
          "You've decided to forego wearing the undergarments and opted to simply drape the tunic over your body.",
          "Your nipples clearly poke through the fabric.",
          "The tunic falls gracefully down your body but movement and wind can easily move the tunic aside to reveal your bare pussy underneath."
        ]
      };
    },
    wear: (game) => {
      if (game.player.dialogHelpers.waistIsAbove(15)) {
        return {
          result: true,
          message: [
            "You put on the tunic over your naked pregnant form and fasten it just above your groin. Most of the front of your belly is covered, but its protruding sides are left exposed."
          ]
        };
      } else if (game.player.dialogHelpers.waistIsAbove(8)) {
        return {
          result: true,
          message: [
            "You put on the tunic and fasten it below your breasts instead of your waist."
          ]
        };
      }
      return {
        result: true,
        message: [
          "You wear the light tunics. You then fasten it around your waist."
        ]
      };
    }
  }
};

export default armors;
