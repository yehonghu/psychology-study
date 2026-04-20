/*
 * Mindscape Design: Clean top navigation with bold typography
 * DM Sans display font for brand, IBM Plex Sans for links
 * Smooth scroll-aware background, mobile drawer
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, BookOpen, ClipboardCheck, Home } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/#chapters", label: "Chapters", icon: BookOpen },
    { href: "/quiz", label: "Practice Quiz", icon: ClipboardCheck },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16">
        <Link href="/">
          <span className="font-[var(--font-display)] text-xl font-800 tracking-tight text-[#1e3a5f] flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-[#1e3a5f] flex items-center justify-center text-white text-sm group-hover:scale-105 transition-transform">
              ψ
            </span>
            PsychMind
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? location === "/"
                : location.startsWith(link.href.replace("/#", "/"));
            return (
              <Link key={link.href} href={link.href}>
                <span
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? "text-[#1e3a5f]"
                      : "text-[#2d3436]/55 hover:text-[#2d3436]/85"
                  }`}
                >
                  <link.icon size={15} />
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-[#1e3a5f]/8 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#1e3a5f]/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={22} className="text-[#1a1a2e]" />
          ) : (
            <Menu size={22} className="text-[#1a1a2e]" />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 md:hidden bg-white/98 backdrop-blur-xl border-t border-[#1e3a5f]/8 shadow-xl z-50"
            >
              <div className="container py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={link.href}>
                      <span className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-[#2d3436]/75 hover:bg-[#1e3a5f]/5 hover:text-[#1e3a5f] transition-all">
                        <link.icon size={18} />
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
