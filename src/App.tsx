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
  paddingTop: 43
});

function App() {
  globalStyles();
  const { gameState, turn, started } = useGame();
  return (
    <div>
      {started && (
        <Navbar>
          <Inventory />
        </Navbar>
      )}
      <Gameview>
        <div>
          {gameState.display.map((display: any) => (
            <div>{display.text}</div>
          ))}
        </div>
        <div>
          {gameState.options.map((option: any) => (
            <button
              onClick={() => {
                option.action();
                turn();
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </Gameview>
    </div>
  );
}

export default App;
