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
    wear: (game) => {
      const errorMessage =
        "You try your hardest to fit into the dress, but it just won't fit over your pregnany belly. You should give up on wearing this again or find a tailor.";
      if (game.player.dialogHelpers.waistIsAbove(20)) {
        if (game.player.armor.tailored) {
          return {
            result: true,
            message:
              "This dress has been tailored to fit over your pregnant body. Stretchy seams were added to its sides to accomodate your massive midsection. While you're able to wear it comfortably it still doesn't leave much to the immagination as your protruding belly button is clearly visible through the fabric, it's also quite easy to see any movements from within your womb."
          };
        } else {
          return {
            result: false,
            message: errorMessage
          };
        }
      } else if (game.player.dialogHelpers.waistIsAbove(13)) {
        return {
          result: true,
          message:
            "This dress already hugged your curves, now that you're visibly pregnant, the fabric is tightly stretches over your belly. Your belly button is poking through, leaving little to the immagination."
        };
      }
      return {
        result: true,
        message:
          "A brown dress. Not the kind of gear you would use for adventuring, however the way it hugs your curves is certainly enticing."
      };
    }
  },
  leatherArmor: {
    type: "armor",
    name: "leather armor",
    damageThreshold: 12,
    basePrice: 20,
    tailored: false,
    wear: (game) => {
      const errorMessage =
        "You try your hardest to get into the corset but it just won't fit over your belly, while your backside is simply too big to get into the trousers. You should find a tailor.";
      if (game.player.dialogHelpers.waistIsAbove(13)) {
        if (game.player.armor.tailored) {
          return {
            result: true,
            message:
              "This leather armor has been tailored to fit on your pregnant body. The corset's bottom has been replaced with stretchy fabric that gives your growing womb more space. The trousers have also been fitted to accomodate your growing hips and backside."
          };
        } else {
          return {
            result: false,
            message: errorMessage
          };
        }
      } else if (game.player.dialogHelpers.waistIsAbove(8)) {
        return {
          result: true,
          message:
            "The leather armor's corset is almost at its limit and your breasts are very close to spilling out of the neckline. You're also having some trouble fitting in the trousers."
        };
      }
      return {
        result: true,
        message:
          "Leather armor comprised of a tight corset which hugs your curves with a deep neckline that leaves very little to the immagination. The trousers tightly hug your legs."
      };
    }
  }
};

export default armors;
