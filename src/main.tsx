import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles/base.css";
import "./styles/index.css";

import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
