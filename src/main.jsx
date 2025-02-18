import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Assure-toi que ce fichier existe bien
import App from "./App"; // Charge l'App principale

// Rendu de l'application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
