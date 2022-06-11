import { IArmor } from "../../core/types/IArmor";

const armors: {
  [name: string]: IArmor;
} = {
  clothes: {
    name: "clothes",
    damageThreshold: 1,
    basePrice: 1,
    tailored: false,
    wear: () => ({
      result: true,
      message: "You put on clothes."
    })
  },
  leatherArmor: {
    name: "leather armor",
    damageThreshold: 12,
    basePrice: 20,
    tailored: false,
    wear: () => ({
      result: true,
      message: "You put on your leather armor."
    })
  }
};

export default armors;
