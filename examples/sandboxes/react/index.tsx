import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useGame from './useGame';

const App = () => {
  const { gameState, turn } = useGame();
  return (
    <div>
      <div>{gameState.display.map((display: any) => display.text)}</div>
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
};

ReactDOM.render(<App />, document.getElementById('root'));
