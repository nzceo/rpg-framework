import useGame from "./hooks/useGame";

function App() {
  const { gameState, turn } = useGame();
  return (
    <div>
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
    </div>
  );
}

export default App;
