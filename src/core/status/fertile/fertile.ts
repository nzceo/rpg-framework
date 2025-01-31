import { pMessages, contractionMessages, PMessages } from "./pMessages";
import {
  getAverageSize,
  returnPregCalc,
  returnPregnancyProgressMessages,
  returnPregnancyWeightGain,
  returnRandomMessage,
  sizeMatches,
  Sizes,
  waistIsAbove,
  waistIsBetween
} from "./pFuncs";
import { fType, FType } from "./fTypes";
import { bind, isArray, merge, random } from "lodash";
import Roll from "roll";
import Chance from "chance";
import Status from "../status";
import Game from "../../game/game";
import BirthEvent from "../../event/birth";
import { Races } from "../../types";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface IFertilityStatusData {
  initialised: boolean;
  isPregnant: boolean;
  cycleProgress: number;
  fertility: number;
  body: {
    height: number;
    weightBase: number;
    waistBase: number;
    weight: number;
    waist: number;
  };
  pregnancies: number;
  births: number;
  pregnancy: PregnancyInterface;
}

export interface PregnancyInterface {
  known: boolean;
  progressDays: number;
  progressWeeks: number;
  publicProgressWeeks: number;
  babies: number;
  publicBabies: number;
  publicFetus: string;
  fetusType?: FType;
  fetuses: {
    weight: number;
    sex: "male" | "female";
  }[];
  inches: number;
  weight: number;
  seenAlerts: string[];
}

class Fertile extends Status {
  contractionMessages!: PMessages[];
  pregnancyMessages!: PMessages[];

  constructor(game: any, character: any) {
    console.log('initiating fertility', game, character)
    super(game, character, {
      type: "fertile",
      name: "Fertile",
      explanation: "The explanation"
    });



    this.init();
  }

  /**
   * Initialise the status, sets data only if status has never been initialised
   */
  init() {
    this.contractionMessages = contractionMessages;
    this.pregnancyMessages = pMessages;
    if (!this.statusData.initialised) {
      this.statusData = {
        initialised: true,
        isPregnant: false,
        // start follicular
        cycleProgress: 5,
        // out of 100
        fertility: 20,
        body: {
          height: 5.6,
          weightBase: 138,
          waistBase: 28,
          weight: 138,
          waist: 28
        },
        pregnancies: 0,
        births: 0,
        pregnancy: {
          known: false,
          progressDays: 0,
          progressWeeks: 0,
          publicProgressWeeks: 0,
          babies: 0,
          publicBabies: 0,
          publicFetus: "",
          fetusType: undefined,
          fetuses: [],
          inches: 0,
          weight: 0,
          seenAlerts: []
        }
      };
    }
  }

  /**
   * Returns all the extra data from the status
   * Do whatever you want with it
   */
  get statusData(): IFertilityStatusData {
    return this.character.getState(`statuses.${this.type}`);
  }

  /**
   * Sets data to the game status.
   * Old object and new object are merged automatically, specify only values that you want to change.
   */
  set statusData(value: RecursivePartial<IFertilityStatusData>) {
    this.character.setState(
      `statuses.${this.type}`,
      merge(this.statusData, value)
    );
  }

  eachDay() {
    this.progressCycle();
    this.progressPregnancy();
    this.checkForBirth();
  }

  checkForBirth() {
    if (this.isPregnant()) {
      const progressDays = this.statusData.pregnancy.progressDays;
      const pregnancyDuration = this.statusData.pregnancy.fetusType!.multiples[
        this.babies()
      ].duration;
      if (progressDays > pregnancyDuration - 14) {
        const roll = new Roll();
        const chance = roll.roll("1d100").result;

        // A modifier to be added to the roll which increases each day
        const chanceModifier = progressDays + 14 - pregnancyDuration;

        // below console logs a bunch of stuff
        // console.log({
        //   progressDays,
        //   waist: this.waist,
        //   weight: this.weight,
        //   eachBabyWeight: this.statusData.pregnancy.fetuses.map(({ weight }) =>
        //     weight.toFixed(2)
        //   ),
        //   totalBabyWeight: this.statusData.pregnancy.fetuses
        //     .reduce((p: number, c: { weight: number }) => p + c.weight, 0)
        //     .toFixed(2)
        // });

        if (chance + chanceModifier > 100) {
          this.game.player.setCustomState(BirthEvent, {});
          this.game.resetDaysToSleep();
        } else if (chance + chanceModifier > 60) {
          this.game.resetDaysToSleep();
          // bad contractions, no birth
          const a = returnRandomMessage(this.game, this, contractionMessages);
          if (isArray(a)) {
            a.forEach((message) => {
              this.game.addToExtraDisplay({ text: message, type: "flavor" });
            });
          } else {
            this.game.addToExtraDisplay({ text: a, type: "flavor" });
          }
        }
      }
    }
  }

  progressCycle() {
    if (!this.statusData.isPregnant) {
      this.statusData = {
        cycleProgress: this.statusData.cycleProgress + 1
      };

      if (
        this.statusData.cycleProgress >= 0 &&
        this.statusData.cycleProgress < 5
      ) {
        this.statusData = {
          fertility: 0
        };
      } else if (
        this.statusData.cycleProgress >= 5 &&
        this.statusData.cycleProgress < 11
      ) {
        this.statusData = {
          fertility: 20
        };
      } else if (
        this.statusData.cycleProgress >= 11 &&
        this.statusData.cycleProgress < 14
      ) {
        this.statusData = {
          fertility: 85
        };
      } else if (
        this.statusData.cycleProgress >= 14 &&
        this.statusData.cycleProgress < 15
      ) {
        this.statusData = {
          fertility: 75
        };
      } else if (
        this.statusData.cycleProgress >= 15 &&
        this.statusData.cycleProgress < 18
      ) {
        this.statusData = {
          fertility: 65
        };
      } else if (
        this.statusData.cycleProgress >= 18 &&
        this.statusData.cycleProgress < 29
      ) {
        this.statusData = {
          fertility: 35
        };
      } else if (this.statusData.cycleProgress >= 29) {
        this.statusData = {
          cycleProgress: 0
        };

        this.progressCycle();
      }
    } else {
      this.statusData = {
        cycleProgress: 5,
        fertility: 20
      };
    }
  }

  /**
   * Generates fetuses if pregnant. This mean we don't have to have this logic in the sex funcs.
   */
  generateFetuses() {
    if (this.isPregnant() && this.statusData.pregnancy.fetuses.length === 0) {
      this.statusData = {
        ...this.statusData,
        pregnancy: {
          ...this.statusData.pregnancy,
          fetuses: Array.from(
            { length: this.statusData.pregnancy.babies },
            (_, i) => ({
              sex: "male",
              weight: 0
            })
          )
        }
      };
    }
  }

  /**
   * Resets pregnancy state
   */
  endPregnancy() {
    this.statusData = {
      isPregnant: false,
      births: this.statusData.births + this.babies(),
      pregnancies: this.statusData.pregnancies + 1,
      body: {
        weight: this.statusData.body.weightBase,
        waist: this.statusData.body.waistBase
      },
      pregnancy: {
        known: false,
        progressDays: 0,
        progressWeeks: 0,
        publicProgressWeeks: 0,
        babies: 0,
        publicBabies: 0,
        publicFetus: "",
        fetusType: {},
        fetuses: [],
        inches: 0,
        weight: 0,
        seenAlerts: []
      }
    };
  }

  /**
   * Progresses pregnancy stats, including belly size and fetus weight
   */
  progressPregnancy() {
    if (this.isPregnant()) {
      this.generateFetuses();
      this.statusData = {
        pregnancy: returnPregCalc(this.statusData.pregnancy)
      };
      const progressAlerts = returnPregnancyProgressMessages(
        this.game as Game,
        this,
        this.statusData.pregnancy.seenAlerts
      );
      this.statusData = {
        pregnancy: {
          ...this.statusData.pregnancy,
          seenAlerts: progressAlerts.filteredAlerts
        }
      };
      progressAlerts.messages.forEach((alert) => {
        if (isArray(alert)) {
          alert.forEach((a) => {
            this.game.addToExtraDisplay({ text: a, type: "flavor" });
          });
        } else {
          this.game.addToExtraDisplay({ text: alert, type: "flavor" });
        }
      });
    }
  }

  get waist() {
    const waist = this.statusData.body.waist;
    const inchesIncrease = this.statusData.pregnancy.inches;
    const randomisedWaist = random(waist - waist / 50, waist + waist / 50);

    if (this.isPregnancyKnown()) {
      return `${(randomisedWaist + inchesIncrease).toFixed(2)}in${
        inchesIncrease > 0 ? `(+${inchesIncrease.toFixed(2)}in)` : ""
      }`;
    }

    return (randomisedWaist + inchesIncrease).toFixed(2);
  }

  /**
   * Get player's weight, including fetus weight if pregnant
   */
  get weight() {
    const weight = this.statusData.body.weight;
    const randomisedWeight = random(weight - weight / 50, weight + weight / 50);
    const pWeightGain = returnPregnancyWeightGain(
      this.statusData.pregnancy.progressDays,
      this.statusData.pregnancy.fetusType,
      this.statusData.pregnancy.babies
    );

    const babyWeight = this.statusData.pregnancy.fetuses.reduce(
      (p: number, c: { weight: number }) => p + c.weight,
      0
    );

    let weightGain = pWeightGain + babyWeight;
    weightGain = parseFloat(weightGain.toFixed(2));

    if (this.isPregnancyKnown()) {
      return `${(randomisedWeight + weightGain).toFixed(2)}lb${
        weightGain > 0 ? `(+${weightGain.toFixed(2)}lb)` : ""
      }`;
    }
    return `${(randomisedWeight + weightGain).toFixed(2)}lb`;
  }

  get fertility() {
    return this.statusData.fertility;
  }

  /**
   * Quick references to functions that can
   * be used to perform state checks in dialogs
   */
  dialogHelpers = {
    isPregnant: this.isPregnant.bind(this),
    isFirstPregnancy: this.isFirstPregnancy.bind(this),
    fetusType: () => this.fetusType,
    isMultiples: this.isMultiples.bind(this),
    isKnownMultiples: this.isKnownMultiples.bind(this),
    babies: () => this.babies.bind(this)(),
    isPregnancyKnown: () => this.isPregnancyKnown.bind(this)(),
    isFetusBiggerThanAverage: this.isFetusBiggerThanAverage.bind(this),
    getPregnancyTerm: () => this.getPregnancyTerm.bind(this)(),
    waistIsAbove: bind((inches: number) => {
      return waistIsAbove(this.statusData, inches);
    }, this),
    waistIsBetween: bind((lowerInches: number, higherInches: number) => {
      return waistIsBetween(this.statusData, lowerInches, higherInches);
    }, this),
    getAverageSize: bind(() => {
      return this.isPregnant() && getAverageSize(this);
    }, this),
    sizeMatches: bind((sizes: Sizes[]) => {
      return this.isPregnant() && sizeMatches(this, sizes);
    }, this)
  };

  getPregnancyTerm(): "first" | "second" | "third" | "late" {
    const weeks = this.statusData.pregnancy.progressWeeks;
    if (weeks < 12) {
      return "first";
    } else if (weeks >= 12 && weeks < 24) {
      return "second";
    } else if (weeks >= 24 && weeks < 36) {
      return "third";
    } else {
      return "late";
    }
  }

  /**
   * Returns whether the character is pregnant, known or not
   */
  isPregnant() {
    return this.statusData.isPregnant;
  }

  /**
   * Returns true if this is the chars first pregnancy
   */
  isFirstPregnancy() {
    return this.statusData.pregnancies === 0;
  }

  /**
   * Returns the fetus' race
   */
  get fetusType() {
    return this.statusData.pregnancy.fetusType?.type;
  }

  /**
   * Returns true if pregnant with 2 or more babies
   */
  isMultiples() {
    return this.statusData.pregnancy.babies > 1;
  }

  /**
   * Returns true if character knows they're pregnant with 2 or more babies
   */
  isKnownMultiples() {
    return this.statusData.pregnancy.publicBabies > 1;
  }

  /**
   * Returns how many fetuses the char is pregnant with
   */
  babies() {
    return this.statusData.pregnancy.babies;
  }

  /**
   * Returns true if pregnancy is known
   */
  isPregnancyKnown() {
    return this.statusData.pregnancy.known;
  }

  /**
   * Returns true if current fetus type is larger than an average human fetus
   */
  isFetusBiggerThanAverage() {
    return (
      this.isPregnant() && this.statusData.pregnancy.fetusType!.sizeIncrease > 1
    );
  }

  setPregnancyKnown() {
    this.statusData = {
      ...this.statusData,
      pregnancy: {
        ...this.statusData.pregnancy,
        known: true
      }
    };
  }

  makePregnant(race: Races) {
    /**
     * The father's race data
     */
    const f = fType[race];
    /**
     * How many babies can player get pregnant with by this race
     */
    const number = Object.keys(f.multiples).map((n) => parseInt(n));

    let totalChanceUsed = 0;
    /**
     * This will generate realistic-ish chances of having multiples
     * Lower numbers will have a high chance, twins and up will be much rarer
     */
    const weights = number.map((n, i) => {
      let chanceRemaining = 100 - totalChanceUsed;

      if (i + 1 === number.length) {
      }

      const x = chanceRemaining / number.length;
      totalChanceUsed += chanceRemaining - x;
      return chanceRemaining - x;
    });

    const chance = new Chance();

    const outcome = chance.weighted(number, weights);

    console.log(`pregnant with ${outcome} child/children`);

    this.statusData = {
      isPregnant: true,
      pregnancy: {
        babies: outcome,
        fetusType: f
      }
    };
  }

  debugPregnancy() {
    this.statusData = {
      initialised: true,
      isPregnant: true,
      // start follicular
      cycleProgress: 5,
      // out of 100
      fertility: 20,
      body: {
        height: 5.4,
        weightBase: 138,
        waistBase: 25,
        weight: 138,
        waist: 25
      },
      pregnancies: 0,
      births: 0,
      pregnancy: {
        known: false,
        progressDays: 0,
        progressWeeks: 0,
        publicProgressWeeks: 0,
        babies: 4,
        publicBabies: 0,
        publicFetus: "",
        fetusType: fType.goblin,
        fetuses: [],
        inches: 0,
        weight: 0,
        seenAlerts: []
      }
    };
  }
}

export default Fertile;
