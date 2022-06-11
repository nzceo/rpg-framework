import { IArmor } from "../../core/types/IArmor";

const armors: {
  [name: string]: IArmor;
} = {
  clothes: {
    name: "clothes",
    damageThreshold: 1,
    basePrice: 1,
    tailored: false
  },
  leatherArmor: {
    name: "leather armor",
    damageThreshold: 12,
    basePrice: 20,
    tailored: false
  }
};

export default armors;
