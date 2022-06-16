import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { GameContextProvider } from "./hooks/useGame";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </StrictMode>
);
