import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const app = document.getElementById("root") as Element;
const root = ReactDOM.createRoot(app);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
