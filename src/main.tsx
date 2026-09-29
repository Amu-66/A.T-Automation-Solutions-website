import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Old links used hash routing (/#/services). Send them to the real page.
const legacyHash = window.location.hash.startsWith("#/");
if (legacyHash) window.location.replace(window.location.hash.slice(1));

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages are pre-rendered at build time; hydrate them when present.
if (legacyHash) {
  // redirecting — don't boot the app on the wrong page
} else if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
