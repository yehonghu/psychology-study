import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Resets scroll position on client-side route changes so each page
 * starts at the top, like a full page load would.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  return null;
}
