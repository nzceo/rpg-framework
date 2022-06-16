import { IPlayerItem } from "../../../../core/types";
import Div from "components/atoms/div";
import { TShirt } from "phosphor-react";

const Item = ({ item }: { item: IPlayerItem }) => {
  switch (item.type) {
    default:
      return <></>;
    case "armor":
      return (
        <Div
          css={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem"
          }}
        >
          <TShirt size={20} weight="duotone" />
          {item.name}
        </Div>
      );
  }
};

export default Item;
