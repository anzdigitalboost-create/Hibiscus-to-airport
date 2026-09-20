import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Report Web Vitals (INP, CLS, LCP) for performance monitoring
if (typeof window !== 'undefined') {
  import('web-vitals').then(({ onINP, onCLS, onLCP, onFCP, onTTFB }) => {
    const report = (metric) => {
      // Log to console in development
      if (import.meta.env.DEV) {
        console.log(metric.name, metric.value);
      }
      // Send to PostHog if available
      if (window.posthog) {
        window.posthog.capture('web_vital', {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
        });
      }
    };
    onINP(report);
    onCLS(report);
    onLCP(report);
    onFCP(report);
    onTTFB(report);
  }).catch(() => {});
}
