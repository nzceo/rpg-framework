import { IPlayerItem } from "../../../../core/types";
import Div from "components/atoms/div";
import { Shield, TShirt } from "phosphor-react";
import { blackA } from "@radix-ui/colors";

const Item = ({ item }: { item: IPlayerItem }) => {
  switch (item.type) {
    default:
      return <></>;
    case "armor":
      return (
        <Div
          css={{
            display: "flex",
            flexDirection: "column",
            borderBottom: `1px solid ${blackA.blackA3}`,
            padding: `.5rem 0`
          }}
        >
          <Div
            css={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              fontSize: "1.25rem"
            }}
          >
            <TShirt size={20} weight="duotone" />
            {item.name}
          </Div>

          <Div
            css={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem"
            }}
          >
            <Shield size={20} weight="duotone" />
            Defence: {item.damageThreshold}
          </Div>
        </Div>
      );
  }
};

export default Item;
