import { ICharacter } from "../../types/ICharacter";

interface ICharacterArchetype {
  [key: string]: ICharacter["description"];
}

const archetypes: ICharacterArchetype = {
  player: {
    race: "human",
    pronouns: "you",
    sex: "male",
    appearance: "This is you, you look however you want."
  },
  normalMan: {
    race: "human",
    pronouns: "he",
    sex: "male",
    appearance: "A normal looking man. Everything about him is normal."
  }
};

export default archetypes;
