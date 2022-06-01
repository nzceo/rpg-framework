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
import { isArray, merge } from "lodash";
import Roll from "roll";
import Status from "../status";
import Game from "../../game/game";
import BirthEvent from "../../event/birth";

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

  game!: Game;

  constructor(game: any, character: any) {
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
        // @ts-ignore
        const roll = new Roll();
        const chance = roll.roll("1d100").result;

        // A modifier to be added to the roll which increases each day
        const chanceModifier = progressDays + 14 - pregnancyDuration;

        if (chance + chanceModifier > 100) {
          this.game.player.setCustomState(BirthEvent, {});
          this.game.resetDaysToSleep();
        } else if (chance + chanceModifier > 60) {
          this.game.resetDaysToSleep();
          // bad contractions, no birth
          const a = returnRandomMessage(this.game, this, contractionMessages);
          if (isArray(a)) {
            a.forEach((message) => {
              this.game.extraDisplay.push({ text: message, type: "flavor" });
            });
          } else {
            this.game.extraDisplay.push({ text: a, type: "flavor" });
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
            this.game.extraDisplay.push({ text: a, type: "flavor" });
          });
        } else {
          this.game.extraDisplay.push({ text: alert, type: "flavor" });
        }
      });
    }
  }

  get weight() {
    if (this.isPregnancyKnown()) {
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

      return `${this.statusData.body.weight + weightGain}lb${
        weightGain > 0 ? `(+${weightGain}lb)` : ""
      }`;
    }
    return `${this.statusData.body.weight}lb`;
  }

  /**
   * Quick references to functions that can
   * be used to perform state checks in dialogs
   */
  dialogHelpers = {
    isPregnant: this.isPregnant,
    isFirstPregnancy: this.isFirstPregnancy,
    fetusType: () => this.fetusType,
    isMultiples: this.isMultiples,
    isKnownMultiples: this.isKnownMultiples,
    babies: () => this.babies(),
    isPregnancyKnown: () => this.isPregnancyKnown(),
    isFetusBiggerThanAverage: () => this.isFetusBiggerThanAverage(),
    getPregnancyTerm: () => this.getPregnancyTerm(),
    waistIsAbove: (inches: number) => {
      return waistIsAbove(this.statusData, inches);
    },
    waistIsBetween: (lowerInches: number, higherInches: number) => {
      return waistIsBetween(this.statusData, lowerInches, higherInches);
    },
    getAverageSize: () => {
      return getAverageSize(this);
    },
    sizeMatches: (sizes: Sizes) => {
      return sizeMatches(this, sizes);
    }
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
    return this.statusData.pregnancy.fetusType!.sizeIncrease > 1;
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
        babies: 2,
        publicBabies: 0,
        publicFetus: "",
        fetusType: fType.orc,
        fetuses: [],
        inches: 0,
        weight: 0,
        seenAlerts: []
      }
    };
  }
}

export default Fertile;
