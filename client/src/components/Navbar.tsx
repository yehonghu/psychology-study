import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Brain, ClipboardCheck, Home, Menu, Sparkles, X } from "lucide-react";

const NAVIGATION = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/chapters", label: "Learning modules", icon: BookOpen },
  { href: "/quiz", label: "Practice quiz", icon: ClipboardCheck },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const active = (href: string) => (href === "/" ? location === "/" : location.startsWith(href));

  return (
    <header className={`neural-nav fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_32px_rgba(93,98,170,0.09)]" : ""}`}>
      <nav className="container flex h-[68px] items-center justify-between">
        <Link href="/">
          <span className="group flex items-center gap-2.5 font-[var(--font-display)] text-[19px] font-[800] tracking-[-0.045em] text-[#26304f]">
            <span className="relative grid h-9 w-9 place-items-center rounded-[14px] bg-gradient-to-br from-[#8a75df] via-[#5e9cde] to-[#72c8b4] text-white shadow-[0_8px_20px_rgba(101,105,201,0.26)] transition-transform group-hover:scale-105">
              <Brain size={19} />
              <span aria-hidden="true" className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#f8f7ff] bg-[#f08d7d]" />
            </span>
            PsychMind
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAVIGATION.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={`relative z-0 flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${active(item.href) ? "text-[#5548a7]" : "text-[#66728f] hover:text-[#26304f]"}`}>
                <item.icon size={15} />
                {item.label}
                {active(item.href) && <motion.span layoutId="neural-nav-active" className="absolute inset-0 -z-10 rounded-full bg-[#ebe7ff]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              </span>
            </Link>
          ))}
        </div>

        <Link href="/quiz">
          <span className="hidden items-center gap-2 rounded-full border border-[#7663d4] bg-[#7663d4] px-4 py-2 text-[12px] font-bold text-white shadow-[0_8px_20px_rgba(105,98,197,0.2)] md:flex">
            <Sparkles size={14} /> Start review
          </span>
        </Link>

        <button className="rounded-xl border border-[#6b6f9d]/15 bg-white/55 p-2 text-[#26304f] md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#31365f]/15 backdrop-blur-[2px] md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.2 }} className="absolute left-3 right-3 top-[74px] z-50 rounded-2xl border border-[#6c70a0]/15 bg-[#fbfaff]/95 p-3 shadow-[0_20px_50px_rgba(77,81,145,0.16)] backdrop-blur-xl md:hidden">
              {NAVIGATION.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Link href={item.href}>
                    <span className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-semibold ${active(item.href) ? "bg-[#ebe7ff] text-[#5548a7]" : "text-[#53607d] hover:bg-[#f0effa]"}`}>
                      <item.icon size={17} />
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <Link href="/quiz">
                <span className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7d67d9] to-[#4e89d9] px-4 py-3 text-[13px] font-bold text-white">
                  <Sparkles size={15} /> Start a practice quiz
                </span>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
