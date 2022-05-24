import { ICharacter } from "../../types/ICharacter";

interface ICharacterArchetype {
  [key: string]: ICharacter["description"];
}

export default <ICharacterArchetype>{
  player: {
    pronouns: "you",
    sex: "male",
    appearance: "This is you, you look however you want."
  },
  normalMan: {
    pronouns: "he",
    sex: "male",
    appearance: "A normal looking man. Everything about him is normal."
  }
};
