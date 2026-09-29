import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

// Used only at build time by scripts/prerender.mjs.
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}

export { PAGES, NOT_FOUND_META, SITE_URL, BUSINESS_NAME, WHATSAPP_NUMBER, EMAIL } from "./site";
