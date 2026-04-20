/*
 * Mindscape Design: Chapter detail page with color-coded header
 * Knowledge concept cards with flip animation, search filter, progress tracking
 */
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Search,
  CheckCircle2,
  RotateCcw,
  ClipboardCheck,
  Layers,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { chapters } from "@/data/chapters";
import { useState, useMemo } from "react";

const CHAPTER_IMAGES: Record<string, string> = {
  bio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663573211151/aVXFU6RBftDvP2qLXx9X5n/chapter-neuroscience-6GnMenfDFDtB2VAz8eBEE2.webp",
  perception:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663573211151/aVXFU6RBftDvP2qLXx9X5n/chapter-perception-jtU36u8Z3bKNYN98m76nxr.webp",
  therapy:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663573211151/aVXFU6RBftDvP2qLXx9X5n/chapter-therapy-Pyukt2ABkDrc6TEb5JQvRH.webp",
};

function ConceptCard({
  term,
  definition,
  color,
  index,
  mastered,
  onToggleMastered,
}: {
  term: string;
  definition: string;
  color: string;
  index: number;
  mastered: boolean;
  onToggleMastered: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      className="perspective-[1000px] h-56 cursor-pointer group"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] rounded-xl border bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
          style={{
            borderColor: mastered ? color + "40" : "rgba(0,0,0,0.05)",
          }}
          onClick={() => setFlipped(true)}
        >
          <div>
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-1 rounded-full"
                style={{ backgroundColor: color }}
              />
              {mastered && (
                <CheckCircle2 size={18} style={{ color }} className="shrink-0" />
              )}
            </div>
            <h4 className="font-[var(--font-display)] font-700 text-[15px] text-[#1a1a2e] leading-snug">
              {term}
            </h4>
          </div>
          <div className="flex items-center justify-between mt-auto pt-3">
            <p className="text-[11px] text-[#2d3436]/35 font-medium">
              Tap to reveal
            </p>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: color + "12" }}
            >
              <RotateCcw size={12} style={{ color }} />
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl p-6 flex flex-col justify-between"
          style={{ backgroundColor: color }}
          onClick={() => setFlipped(false)}
        >
          <p className="text-sm text-white/95 leading-relaxed flex-1 flex items-center">
            {definition}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-white/15">
            <p className="text-[11px] text-white/40 font-medium">
              Tap to flip back
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMastered();
              }}
              className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-all ${
                mastered
                  ? "bg-white/25 text-white"
                  : "bg-white/15 text-white/70 hover:bg-white/25 hover:text-white"
              }`}
            >
              {mastered ? "✓ Mastered" : "Mark as mastered"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ChapterPage() {
  const { id } = useParams<{ id: string }>();
  const chapter = chapters.find((c) => c.id === id);
  const chapterIndex = chapters.findIndex((c) => c.id === id);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const [filterMode, setFilterMode] = useState<"all" | "mastered" | "remaining">(
    "all"
  );

  const toggleMastered = (term: string) => {
    setMasteredSet((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  };

  const filteredConcepts = useMemo(() => {
    if (!chapter) return [];
    let concepts = chapter.keyConcepts;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      concepts = concepts.filter(
        (c) =>
          c.term.toLowerCase().includes(q) ||
          c.definition.toLowerCase().includes(q)
      );
    }

    if (filterMode === "mastered") {
      concepts = concepts.filter((c) => masteredSet.has(c.term));
    } else if (filterMode === "remaining") {
      concepts = concepts.filter((c) => !masteredSet.has(c.term));
    }

    return concepts;
  }, [chapter, searchQuery, filterMode, masteredSet]);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <Navbar />
        <div className="text-center pt-20">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">
            Chapter not found
          </h1>
          <Link href="/">
            <span className="text-[#1e3a5f] underline mt-4 inline-block">
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = CHAPTER_IMAGES[chapter.id];
  const masteredCount = chapter.keyConcepts.filter((c) =>
    masteredSet.has(c.term)
  ).length;
  const progressPercent = Math.round(
    (masteredCount / chapter.keyConcepts.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      {/* Chapter Hero */}
      <section
        className="pt-16 relative overflow-hidden"
        style={{ backgroundColor: chapter.colorLight }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(${chapter.color} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container py-14 lg:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <span className="inline-flex items-center gap-2 text-sm text-[#2d3436]/45 hover:text-[#2d3436]/75 transition-colors mb-6">
                  <ArrowLeft size={16} />
                  Back to all chapters
                </span>
              </Link>
              <div
                className="inline-block px-3 py-1 rounded-md text-[10px] font-bold text-white mb-4 tracking-wide uppercase"
                style={{ backgroundColor: chapter.color }}
              >
                Week {chapter.week}
              </div>
              <h1
                className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-800 tracking-tight leading-tight"
                style={{ color: chapter.color }}
              >
                {chapter.icon} {chapter.title}
              </h1>
              <p className="mt-4 text-base text-[#2d3436]/55 leading-relaxed">
                {chapter.subtitle}
              </p>

              {/* Stats row */}
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-[#2d3436]/45">
                  <Layers size={16} />
                  {chapter.keyConcepts.length} concepts
                </div>
                <div className="flex items-center gap-2 text-sm text-[#2d3436]/45">
                  <CheckCircle2 size={16} />
                  {masteredCount} mastered
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#2d3436]/40 font-medium">
                    Progress
                  </span>
                  <span style={{ color: chapter.color }} className="font-bold">
                    {progressPercent}%
                  </span>
                </div>
                <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: chapter.color }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>

            {heroImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <img
                  src={heroImage}
                  alt={chapter.title}
                  className="w-full max-w-sm rounded-2xl object-contain"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center items-center"
              >
                <div
                  className="w-48 h-48 rounded-3xl flex items-center justify-center text-7xl"
                  style={{ backgroundColor: chapter.color + "12" }}
                >
                  {chapter.icon}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div
          className="h-1 w-full"
          style={{ backgroundColor: chapter.color }}
        />
      </section>

      {/* Toolbar: Search + Filter */}
      <section className="py-8 border-b border-black/5 bg-white sticky top-16 z-30">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2d3436]/30"
              />
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-black/5 text-sm text-[#1a1a2e] placeholder:text-[#2d3436]/30 focus:outline-none focus:border-[#1e3a5f]/20 focus:ring-2 focus:ring-[#1e3a5f]/5 transition-all"
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-2">
              {(["all", "remaining", "mastered"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                    filterMode === mode
                      ? "text-white shadow-sm"
                      : "bg-[#faf8f5] text-[#2d3436]/50 hover:text-[#2d3436]/70"
                  }`}
                  style={
                    filterMode === mode
                      ? { backgroundColor: chapter.color }
                      : {}
                  }
                >
                  {mode === "all"
                    ? `All (${chapter.keyConcepts.length})`
                    : mode === "mastered"
                    ? `Mastered (${masteredCount})`
                    : `Remaining (${chapter.keyConcepts.length - masteredCount})`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Concept Cards Grid */}
      <section className="py-12">
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredConcepts.length > 0 ? (
              <motion.div
                key={filterMode + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredConcepts.map((concept, i) => (
                  <ConceptCard
                    key={concept.term}
                    term={concept.term}
                    definition={concept.definition}
                    color={chapter.color}
                    index={i}
                    mastered={masteredSet.has(concept.term)}
                    onToggleMastered={() => toggleMastered(concept.term)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search size={40} className="mx-auto text-[#2d3436]/15 mb-4" />
                <p className="text-sm text-[#2d3436]/40">
                  No concepts match your search or filter.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Quiz CTA for this chapter */}
      <section className="py-10">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 text-center border border-black/5 bg-white"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: chapter.color + "12" }}
            >
              <ClipboardCheck size={24} style={{ color: chapter.color }} />
            </div>
            <h3 className="font-[var(--font-display)] font-700 text-lg text-[#1a1a2e] mb-2">
              Test This Chapter
            </h3>
            <p className="text-sm text-[#2d3436]/50 mb-6">
              Ready to test your knowledge? Take the practice quiz covering all
              modules.
            </p>
            <Link href="/quiz">
              <span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 shadow-md"
                style={{
                  backgroundColor: chapter.color,
                  boxShadow: `0 4px 14px ${chapter.color}30`,
                }}
              >
                <ClipboardCheck size={16} />
                Start Practice Quiz
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Navigation between chapters */}
      <section className="py-10 border-t border-black/5">
        <div className="container flex items-center justify-between">
          {prevChapter ? (
            <Link href={`/chapter/${prevChapter.id}`}>
              <span className="flex items-center gap-3 text-sm font-medium text-[#2d3436]/55 hover:text-[#2d3436] transition-colors group">
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                <span>
                  <span className="block text-[10px] text-[#2d3436]/35 uppercase tracking-wide font-semibold">
                    Previous
                  </span>
                  {prevChapter.title}
                </span>
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <Link href={`/chapter/${nextChapter.id}`}>
              <span className="flex items-center gap-3 text-sm font-medium text-[#2d3436]/55 hover:text-[#2d3436] transition-colors text-right group">
                <span>
                  <span className="block text-[10px] text-[#2d3436]/35 uppercase tracking-wide font-semibold">
                    Next
                  </span>
                  {nextChapter.title}
                </span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e3a5f]/8 py-10 bg-[#faf8f5]">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-bold">
                ψ
              </span>
              <span className="font-[var(--font-display)] text-sm font-700 text-[#1a1a2e]">
                PsychMind
              </span>
            </div>
            <p className="text-xs text-[#2d3436]/40">
              Principles of Psychology — Complete Final Review Study Hub
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
