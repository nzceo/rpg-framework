import { Backpack } from "phosphor-react";
import { styled } from "stitches.config";
import { useGame } from "../../../hooks/useGame";
import Dialog from "../../atoms/dialog";
import Div from "../../atoms/div";
import Item from "./item";

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: ".25rem .5rem",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  defaultVariants: {
    variant: "violet"
  }
});

const Inventory = () => {
  const { game } = useGame();
  const items = game.player.inventory.items;

  return (
    <>
      <Dialog
        button={
          <Button>
            <Backpack size={24} weight="duotone" />
          </Button>
        }
        dialogTitle="Inventory"
        dialogContent={
          <Div
            css={{ display: "flex", flexDirection: "column", gap: ".25rem" }}
          >
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Div>
        }
      />
    </>
  );
};

export default Inventory;
