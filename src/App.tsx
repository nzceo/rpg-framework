import { globalCss, styled } from "../stitches.config";
import Inventory from "./components/molecules/inventory";
import { useGame } from "./hooks/useGame";

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
  right: 0
});

const Gameview = styled("div", {
  marginTop: "43px"
});

function App() {
  globalStyles();
  const { gameState, turn, started, game } = useGame();
  return (
    <div>
      {started && (
        <Navbar>
          <Inventory />
        </Navbar>
      )}
      <Gameview>
        <div className="flex flex-col">
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
