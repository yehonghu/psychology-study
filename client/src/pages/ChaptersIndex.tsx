/**
 * Chapters Index Page
 * Neural Garden design: Display all chapters in a grid with navigation
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { chapters } from "@/data/chapters";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export default function ChaptersIndex() {
  return (
    <div className="neural-home min-h-screen">
      <Navbar />
      <div aria-hidden="true" className="neural-grain" />

      {/* Header */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28">
        <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[#d8caff]/40 blur-[110px]" />
        <div className="container relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Link href="/">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#6253bd] hover:gap-2 transition-all mb-6 cursor-pointer">
                  <ArrowLeft size={16} />
                  Back to Home
                </span>
              </Link>
              <span className="neural-label">Nine modules, one field</span>
              <h1 className="neural-display mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                All chapters
              </h1>
              <p className="text-lg text-[#66728f] max-w-2xl leading-relaxed">
                Nine weeks of psychology, arranged as one connected field. Each module holds interactive concept cards and detailed explanations — choose the one that needs your attention now.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-12 pb-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {chapters.map((ch) => (
              <motion.div key={ch.id} variants={fadeUp} whileHover={{ y: -7 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                <Link href={`/chapter/${ch.id}`}>
                  <div
                    className="neural-module group relative rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(72,81,140,0.12)] cursor-pointer h-full"
                    style={{ backgroundColor: ch.colorLight }}
                  >
                    {/* Color bar */}
                    <div
                      className="h-1 w-full"
                      style={{ backgroundColor: ch.color }}
                    />
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <span
                          className="text-3xl select-none"
                          role="img"
                          aria-label={ch.title}
                        >
                          {ch.icon}
                        </span>
                        <span
                          className="text-[10px] font-bold px-2.5 py-1 rounded-md text-white tracking-wide"
                          style={{ backgroundColor: ch.color }}
                        >
                          WEEK {ch.week}
                        </span>
                      </div>
                      <h3
                        className="font-[var(--font-display)] text-lg font-bold mb-1.5 leading-snug"
                        style={{ color: ch.color }}
                      >
                        {ch.title}
                      </h3>
                      <p className="text-sm text-[#66728f]/55 mb-5 line-clamp-2 flex-grow">
                        {ch.subtitle}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-black/[0.05]">
                        <span className="text-xs text-[#66728f]/40 font-medium">
                          {ch.keyConcepts.length} key concepts
                        </span>
                        <span
                          className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                          style={{ color: ch.color }}
                        >
                          Study <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
