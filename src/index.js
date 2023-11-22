import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css";
import ThemeToggleProvider from "./utils/ThemeToggle";

const rootContainer = createRoot(document.getElementById("root"));
rootContainer.render(
  <Provider store={store}>
    <ThemeToggleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeToggleProvider>
  </Provider>
);
