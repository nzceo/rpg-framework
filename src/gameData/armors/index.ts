import { IArmor } from "ts-rpg-framework/dist/core/types";

const armors: {
  [name: string]: IArmor;
} = {
  clothes: {
    name: "clothes",
    damageThreshold: 1
  }
};

export default armors;
