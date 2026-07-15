// StrictMode helps catch common development issues in React.
import { StrictMode } from "react";

// createRoot connects the React app to the root element in index.html.
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Analytics } from "@vercel/analytics/react";

// Import the main application, information pages, and global styles.
import App from "./App";
import About from "./About";
import Privacy from "./Privacy";
import "./styles.css";

// Add routes so each page has its own URL.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>

      <Analytics />
    </BrowserRouter>
  </StrictMode>,
);