import ReactDOM from "react-dom/client";
// add the beginning of your app entry
import "vite/modulepreload-polyfill";
import App from "./App.jsx";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
