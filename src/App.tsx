import Div from "components/atoms/div";
import { globalCss, styled } from "stitches.config";
import Inventory from "./components/molecules/inventory";
import { useGame } from "./hooks/useGame";
import "./styles/styles.css";

const globalStyles = globalCss({
  "*": { boxSizing: "border-box" },
  body: {
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

const Gameview = styled("div", {
  paddingTop: 43,
  paddingBottom: 56,
  paddingLeft: ".5rem",
  paddingRight: ".5rem"
});

function App() {
  globalStyles();
  const { displayState, optionsState, turn, started } = useGame();
  return (
    <div>
      {started && (
        <Navbar>
          <Inventory />
        </Navbar>
      )}
      <Gameview>
        <div>
          {displayState.map((display: any) => (
            <div dangerouslySetInnerHTML={{ __html: display.text }}></div>
          ))}
        </div>
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
