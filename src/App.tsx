import Div from "@/components/atoms/div";
import ReactHtmlParser from "html-react-parser";
import reactStringReplace from "react-string-replace";
import { useEffect, useRef } from "react";
import { globalCss, styled } from "@/stitches.config";
import Inventory from "./components/molecules/inventory";
import { useGame } from "./hooks/useGame";
import FairyIcon from "@/components/icons/fairy";
import ElfIcon from "@/components/icons/elf";
import "./styles/styles.css";

const globalStyles = globalCss({
  "*": { boxSizing: "border-box" },
  body: {
    overflowY: "hidden",
    fontFamily: `'Inter var', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif`
  }
});

const Navbar = styled("div", {
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  right: 0,
  background: "white"
});

const Gameview = styled("div", {});

function App() {
  globalStyles();
  const { displayState, optionsState, turn, started } = useGame();

  const lastDate = useRef<undefined | string>();

  const scrollableContainer = useRef<undefined | HTMLDivElement>();

  useEffect(() => {
    if (scrollableContainer.current) {
      scrollableContainer.current.scrollTop =
        scrollableContainer.current.scrollHeight;
    }
  }, [displayState]);

  return (
    <div>
      {started && (
        <Navbar>
          <Inventory />
          <FairyIcon />
          <ElfIcon />
        </Navbar>
      )}
      <Gameview>
        <Div
          // @ts-ignore
          ref={scrollableContainer}
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "100vh",
            overflowY: "auto",
            padding: "43px 0.5rem 56px"
          }}
        >
          {displayState.map((display) => {
            let newDate = undefined;
            if (lastDate.current !== display.date?.toISOString()) {
              newDate = display.date;
            }
            lastDate.current = display.date?.toISOString();
            return (
              <>
                {newDate !== undefined && (
                  <Div
                    css={{
                      position: "relative"
                    }}
                  >
                    <Div
                      css={{
                        width: "100%",
                        borderBottom: "1px solid #ccc",
                        position: "absolute",
                        top: "10px"
                      }}
                    />
                    <Div
                      css={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Div
                        css={{
                          background: "white",
                          zIndex: 1,
                          padding: "0 .5rem"
                        }}
                      >
                        {newDate.format("D MMMM")}
                      </Div>
                    </Div>
                  </Div>
                )}
                <Div>
                  {reactStringReplace(
                    reactStringReplace(display.text, "%player%", (match, i) => (
                      <ElfIcon />
                    )),
                    "%fairy%",
                    (match, i) => <FairyIcon />
                  ).map((element) => {
                    if (typeof element === "string") {
                      return ReactHtmlParser(element);
                    }
                    return element;
                  })}
                </Div>
              </>
            );
          })}
        </Div>
        <Div
          css={{
            position: "fixed",
            left: 0,
            bottom: 0,
            right: 0,

            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            flexWrap: "nowrap",
            overflowX: "auto",
            background: "white",
            padding: "1rem",

            "& > button": {
              whiteSpace: "nowrap"
            }
          }}
        >
          {optionsState.map((option: any) => (
            <button
              onClick={() => {
                option.action();
                turn();
              }}
            >
              {option.text}
            </button>
          ))}
        </Div>
      </Gameview>
    </div>
  );
}

export default App;
