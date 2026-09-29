import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import PricingPage from "./pages/PricingPage";
import ProcessPage from "./pages/ProcessPage";
import ResultsPage from "./pages/ResultsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFoundPage from "./pages/NotFoundPage";

// Pages are imported eagerly (not lazy) so every route can be pre-rendered
// to static HTML at build time — that's what lets Google, Bing, AI search
// and WhatsApp/LinkedIn link previews read the content.
// The router itself lives in main.tsx (browser) and entry-server.tsx (build).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="process" element={<ProcessPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="terms-of-service" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
