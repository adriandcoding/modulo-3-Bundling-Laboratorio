import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

const App = () =>(
  <h1>Hola Mundo desde react</h1>
)
  ;

const rootElement = document.getElementById("app");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
