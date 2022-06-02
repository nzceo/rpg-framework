import { PMessages } from "./pMessages";
import { growthCurves } from "./fTypes";
import Fertile, { IFertilityStatusData, PregnancyInterface } from "./fertile";
import { solveCubicBezier } from "./bezier";
import { isFunction, isArray, sample, random } from "lodash";
import Game from "../../game/game";

export const returnPregnancyWeightGain = (
  progressDays: number,
  fetusType: any,
  babies: number
): number => {
  const relativeProgress =
    /**
     * We add 20 days to the total duration since player
     * could be overdue. If we don't account for it values after
     * gestation are too high
     */
    progressDays / (fetusType.multiples[babies].duration + 20);

  const curve = growthCurves.standard;

  const growth = solveCubicBezier(
    0,
    curve[1],
    curve[3],
    1,
    relativeProgress
  )[0];

  const weightAtProgress = 10 * growth;

  return weightAtProgress;
};

const returnInchPerGrowthProgression = (
  progressDays: number,
  fetusType: any,
  babies: number
) => {
  const relativeProgress =
    /**
     * We add 20 days to the total duration since player
     * could be overdue. If we don't account for it values after
     * gestation are too high
     */
    progressDays / (fetusType.multiples[babies].duration + 20);

  const curve = fetusType.growthCurve;

  // relative progress mapped to growth curve
  const growth = solveCubicBezier(
    0,
    curve[1],
    curve[3],
    1,
    relativeProgress
  )[0];

  // Will reach 14ish when progress 1
  const inchesAtProgress =
    ((12 * growth) / 105) *
    // Apply race multipliers and multiples multipliers
    (fetusType.sizeIncrease * babies * fetusType.multiples[babies].size);

  return random(
    inchesAtProgress - inchesAtProgress * 3,
    inchesAtProgress + inchesAtProgress * 3
  );
};

const returnWeightPerGrowthProgression = (
  progressDays: number,
  fetusType: any,
  babies: number
) => {
  const relativeProgress = progressDays / fetusType.multiples[babies].duration;

  const curve = fetusType.growthCurve;

  // relative progress mapped to growth curve
  const growth = solveCubicBezier(
    0,
    curve[1],
    curve[3],
    1,
    relativeProgress
  )[0];

  const weightAtProgress =
    ((10 * growth) / 130) *
    // Apply race multipliers and multiples multipliers
    (fetusType.weightIncrease * fetusType.multiples[babies].size);

  return random(
    weightAtProgress - weightAtProgress,
    weightAtProgress + weightAtProgress
  );
};

export function returnPregCalc(pregnancy: PregnancyInterface) {
  const days = 1;
  pregnancy.progressDays += days;
  pregnancy.progressWeeks = Math.floor(pregnancy.progressDays / 7);

  if (pregnancy.progressWeeks > 0) {
    pregnancy.inches += returnInchPerGrowthProgression(
      pregnancy.progressDays,
      pregnancy.fetusType,
      pregnancy.babies
    );

    pregnancy.fetuses = pregnancy.fetuses.map(({ sex, weight }) => ({
      sex,
      weight:
        weight +
        returnWeightPerGrowthProgression(
          pregnancy.progressDays,
          pregnancy.fetusType,
          pregnancy.babies
        )
    }));
  }

  return pregnancy;
}

// function calculateArmorFit(bodyState) {
//   let armor = { ...player.equip.armor };
//   // console.log(publicPlayer.equip.armor.options[bodyState]);
//   if (armor.options && armor.options[bodyState].wearable === false) {
//     armor = {};
//   }
//   return armor;
// }

export function returnRandomMessage(
  game: Game,
  fertile: Fertile,
  arrayOfMessages: PMessages[]
): string | string[] {
  for (let i = 0; i < arrayOfMessages.length; i++) {
    const m = sample(arrayOfMessages)!;
    if (m?.display(fertile)) {
      if (isFunction(m.m)) {
        return m.m(game);
      }
      return m.m;
    }
  }
  // @ts-ignore
  return arrayOfMessages[0].m;
}

export function returnPregnancyProgressMessages(
  game: Game,
  fertile: Fertile,
  seenAlerts: string[]
) {
  let messages: any[] = [];
  let filteredAlerts: any[] = [...seenAlerts];
  fertile.pregnancyMessages.forEach(function (entry) {
    if (entry.display(fertile)) {
      let entryOutput;

      if (isFunction(entry.m)) {
        entryOutput = entry.m(game);
      } else {
        entryOutput = entry.m;
      }

      let entryMessages: string[] = [];

      if (!isArray(entryOutput)) {
        entryMessages = [entryOutput];
      } else {
        entryMessages = entryOutput;
      }

      entryMessages.forEach((message) => {
        const isAlreadySeen = seenAlerts?.includes(message);

        if (!isAlreadySeen) {
          messages.push(message);
          filteredAlerts.push(message);
        }
      });
    }
  });
  return { messages, filteredAlerts };
}

export const waistIsAbove = (
  fertility: IFertilityStatusData,
  waist: number
): boolean => {
  return waist < parseFloat(fertility.pregnancy?.inches!.toFixed(2));
};

export const waistIsBetween = (
  fertility: IFertilityStatusData,
  lowerWaist: number,
  higherWaist: number
): boolean => {
  return (
    parseFloat(fertility.pregnancy?.inches!.toFixed(2)) > lowerWaist &&
    parseFloat(fertility.pregnancy?.inches!.toFixed(2)) < higherWaist
  );
};

export const getAverageSize = (fertile: Fertile) => {
  let currentDay = 0;
  let averageSize = 0;
  const pregnancy = fertile.statusData.pregnancy;

  while (currentDay <= fertile.statusData.pregnancy.progressDays) {
    averageSize = returnInchPerGrowthProgression(
      pregnancy.progressDays,
      pregnancy.fetusType,
      pregnancy.babies
    );

    currentDay++;
  }

  const currentInches = fertile.statusData.pregnancy.inches;

  let sizeResult;
  if (currentInches - averageSize >= 3) {
    sizeResult = "large";
  } else if (currentInches - averageSize > 5) {
    sizeResult = "veryLarge";
  } else if (
    currentInches - averageSize < 5 &&
    currentInches - averageSize >= 0
  ) {
    sizeResult = "average";
  } else if (currentInches - averageSize < 0) {
    sizeResult = "small";
  } else {
    sizeResult = "average";
  }

  return sizeResult;
};

export type Sizes = "large" | "veryLarge" | "average" | "small" | "average";

export const sizeMatches = (fertile: Fertile, sizes: Sizes) => {
  return sizes.includes(getAverageSize(fertile));
};
