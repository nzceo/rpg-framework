export interface FType {
  type: "human" | "orc" | "goblin";
  sizeIncrease: number;
  weightIncrease: number;
  growthCurve: number[];
  multiples: {
    [key: number]: {
      size: number;
      duration: number;
    };
  };
  strength: string;
  movement: string;
  menuText: {
    single: string;
    multiple: string;
  };
}

export const growthCurves = {
  standard: [0.5, 0, 0.28, 0.78]
};

export const fType: {
  [key: string]: FType;
} = {
  human: {
    type: "human",
    sizeIncrease: 1.2,
    weightIncrease: 0.8,
    growthCurve: growthCurves.standard,
    // could have up to triplets
    multiples: {
      1: {
        size: 1,
        duration: 273
      },
      2: {
        size: 0.8,
        duration: 259
      },
      3: {
        size: 0.7,
        duration: 245
      }
    },
    strength: "normal",
    movement: "normal",
    menuText: { single: "a human child", multiple: "human children" }
  },
  goblin: {
    type: "goblin",
    sizeIncrease: 0.4,
    weightIncrease: 0.4,
    growthCurve: growthCurves.standard,
    // normal is triplets, can go up to quintuplets
    multiples: {
      3: {
        size: 1,
        duration: 273
      },
      4: {
        size: 1,
        duration: 259
      },
      5: {
        size: 0.9,
        duration: 245
      }
    },
    strength: "normal",
    movement: "normal",
    menuText: { single: "a goblin child", multiple: "goblin children" }
  },
  orc: {
    type: "orc",
    sizeIncrease: 1.2,
    weightIncrease: 1.1,
    growthCurve: growthCurves.standard,
    // will never have more than twins
    multiples: {
      1: {
        size: 1,
        duration: 273
      },
      2: {
        size: 0.7,
        duration: 273
      }
    },
    strength: "high",
    movement: "high",
    menuText: { single: "an orc child", multiple: "orcish children" }
  }
};
