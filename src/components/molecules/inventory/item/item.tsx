import { IPlayerItem } from "../../../../core/types";
import Div from "@/components/atoms/div";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/atoms/dropdown";
import { DotsThreeVertical, Shield, TShirt } from "phosphor-react";
import { blackA } from "@radix-ui/colors";
import { useGame } from "@/hooks/useGame";
import { styled } from "@/stitches.config";
import { useDialog } from "@/components/atoms/dialog/dialog";

const IconButton = styled("button", {
  position: "absolute",
  right: 0,
  top: "0",
  bottom: "0",
  all: "unset",
  background: "transparent",
  border: "none",
  borderRadius: "999px",
  aspectRatio: "1/1",

  "&:hover": {
    backgroundColor: blackA.blackA3
  }
});

const Item = ({ item }: { item: IPlayerItem }) => {
  const { game, turn } = useGame();
  const { close } = useDialog();
  switch (item.type) {
    default:
      return <></>;
    case "armor":
      return (
        <>
          <Div
            css={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              borderBottom: `1px solid ${blackA.blackA3}`,
              padding: `.5rem 0`
            }}
          >
            {item.id === game.player.armor.id && (
              <Div
                css={{
                  backgroundColor: blackA.blackA3,
                  borderRadius: ".25rem",
                  padding: ".25rem .5rem"
                }}
              >
                Equipped
              </Div>
            )}
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

            <Div
              css={{
                position: "absolute",
                right: 0
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton>
                    <DotsThreeVertical size={20} weight="duotone" />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={5}>
                  <DropdownMenuItem
                    onClick={() => {
                      game.player.inventory.equip(item);
                      turn();
                      close();
                    }}
                  >
                    Wear
                  </DropdownMenuItem>
                  <DropdownMenuArrow offset={12} />
                </DropdownMenuContent>
              </DropdownMenu>
            </Div>
          </Div>
        </>
      );
  }
};

export default Item;
