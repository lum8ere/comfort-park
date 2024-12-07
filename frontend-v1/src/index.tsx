import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { App } from "App";
import { BrowserRouter } from "react-router-dom";
import { store } from "store";

import './index.css';

const rootElement = document.getElementById("root");

const ComfortParkApp: React.FC = () => (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

if (rootElement) {
  const container = document.getElementById("root");
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<ComfortParkApp />);
} else {
  console.error("Root element not found!");
}

export default ComfortParkApp;
