/*
 * Mindscape Design: Bold color blocks, Swiss grid, stagger animations
 * Hero with brain illustration, learning path timeline, chapter grid, quiz CTA
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Sparkles,
  Brain,
  Layers,
  Zap,
  GraduationCap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { chapters } from "@/data/chapters";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663573211151/aVXFU6RBftDvP2qLXx9X5n/hero-brain-hW9ZS3Q2ovmeo5HebXTnVB.webp";

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

const features = [
  {
    icon: Brain,
    title: "9 Weekly Modules",
    desc: "From neurons to therapy — every topic covered with color-coded organization.",
    color: "#1e3a5f",
  },
  {
    icon: Layers,
    title: "130+ Key Concepts",
    desc: "Interactive flip cards for each concept — tap to reveal definitions instantly.",
    color: "#0d7377",
  },
  {
    icon: Zap,
    title: "60 Practice Questions",
    desc: "Real exam-style questions with instant feedback and detailed explanations.",
    color: "#d4770b",
  },
  {
    icon: GraduationCap,
    title: "Score Tracking",
    desc: "See your results at a glance with visual progress indicators and review mode.",
    color: "#5c2d91",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative pt-16 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container grid lg:grid-cols-2 gap-8 items-center min-h-[88vh] py-16 lg:py-0">
          {/* Left text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative z-10"
            style={{ y: heroTextY }}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a5f]/8 text-[#1e3a5f] text-xs font-semibold mb-6 tracking-wide uppercase"
            >
              <Sparkles size={14} />
              Principles of Psychology — Final Review
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-800 leading-[1.08] text-[#1a1a2e] tracking-tight"
            >
              Master Your
              <br />
              <span className="relative">
                <span className="text-[#1e3a5f]">Psychology</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 rounded-full bg-[#d4770b]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0, 0, 0.2, 1] as const }}
                />
              </span>{" "}
              Course
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-[#2d3436]/65 max-w-lg leading-relaxed"
            >
              A comprehensive study hub covering 9 weekly modules with
              interactive knowledge cards, 60 practice questions, and instant
              feedback to ace your final exam.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link href="/#chapters">
                <span className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1e3a5f] text-white font-semibold text-sm hover:bg-[#162d4a] transition-all shadow-lg shadow-[#1e3a5f]/20 hover:shadow-xl hover:shadow-[#1e3a5f]/25">
                  <BookOpen size={18} />
                  Explore Chapters
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </Link>
              <Link href="/quiz">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#1e3a5f]/15 text-[#1e3a5f] font-semibold text-sm hover:bg-[#1e3a5f]/5 hover:border-[#1e3a5f]/25 transition-all">
                  <ClipboardCheck size={18} />
                  Take Practice Quiz
                </span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="mt-14 flex gap-10">
              {[
                { num: "9", label: "Weekly Modules" },
                { num: "60", label: "Practice Questions" },
                { num: "130+", label: "Key Concepts" },
              ].map((s) => (
                <div key={s.label} className="relative">
                  <div className="font-[var(--font-display)] text-3xl font-800 text-[#1e3a5f]">
                    {s.num}
                  </div>
                  <div className="text-xs text-[#2d3436]/45 mt-1 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right illustration with floating elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0, 0, 0.2, 1] as const,
              delay: 0.2,
            }}
            className="relative flex items-center justify-center"
            style={{ y: heroImgY }}
          >
            {/* Decorative circles */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-[#d4770b]/15"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-8 -left-4 w-16 h-16 rounded-full bg-[#0d7377]/8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/4 -left-8 w-3 h-3 rounded-full bg-[#5c2d91]/30"
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1e3a5f]/3 via-transparent to-[#0d7377]/3 p-4">
              <img
                src={HERO_IMG}
                alt="Psychology Brain Illustration"
                className="relative w-full max-w-lg lg:max-w-xl object-contain"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-2 right-4 bg-white rounded-xl shadow-lg shadow-black/8 px-4 py-3 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center">
                <GraduationCap size={20} className="text-[#2d6a4f]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1a1a2e]">
                  Study Smart
                </div>
                <div className="text-[10px] text-[#2d3436]/50">
                  Interactive learning
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf8f5] to-transparent" />
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-16 relative">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group bg-white rounded-xl p-6 border border-black/[0.04] hover:border-black/[0.08] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: f.color + "12" }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="font-[var(--font-display)] font-700 text-[#1a1a2e] text-sm mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-[#2d3436]/50 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CHAPTERS GRID ===== */}
      <section id="chapters" className="py-20 scroll-mt-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14">
              <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1e3a5f]/8 text-[#1e3a5f] text-xs font-semibold tracking-wide uppercase mb-4">
                    Course Modules
                  </span>
                  <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-800 text-[#1a1a2e] tracking-tight">
                    9 Weeks of Knowledge
                  </h2>
                  <p className="mt-3 text-[#2d3436]/55 max-w-md">
                    Each module is color-coded for quick identification. Click to
                    explore key concepts.
                  </p>
                </div>
                <Link href="/quiz">
                  <span className="text-sm font-semibold text-[#1e3a5f] flex items-center gap-1 hover:gap-2 transition-all">
                    Test all chapters <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {chapters.map((ch) => (
                <motion.div key={ch.id} variants={fadeUp}>
                  <Link href={`/chapter/${ch.id}`}>
                    <div
                      className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer border border-black/[0.03]"
                      style={{ backgroundColor: ch.colorLight }}
                    >
                      {/* Color bar */}
                      <div
                        className="h-1 w-full"
                        style={{ backgroundColor: ch.color }}
                      />
                      <div className="p-6">
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
                          className="font-[var(--font-display)] text-lg font-700 mb-1.5 leading-snug"
                          style={{ color: ch.color }}
                        >
                          {ch.title}
                        </h3>
                        <p className="text-sm text-[#2d3436]/55 mb-5 line-clamp-2">
                          {ch.subtitle}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-black/[0.05]">
                          <span className="text-xs text-[#2d3436]/40 font-medium">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== LEARNING PATH TIMELINE ===== */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full bg-[#0d7377]/8 text-[#0d7377] text-xs font-semibold tracking-wide uppercase mb-4">
                Learning Path
              </span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-800 text-[#1a1a2e] tracking-tight">
                Your Study Journey
              </h2>
              <p className="mt-3 text-[#2d3436]/55 max-w-md mx-auto">
                Follow this structured path from foundations to mastery.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#1e3a5f]/20 via-[#0d7377]/20 to-[#5c2d91]/20" />

              {[
                {
                  step: "01",
                  title: "Build Foundations",
                  desc: "Start with Introduction to Psychology and Biological Bases of Behavior to understand the core framework.",
                  color: "#1e3a5f",
                  weeks: "Week 1-2",
                },
                {
                  step: "02",
                  title: "Explore Processes",
                  desc: "Dive into Sensation & Perception, Consciousness, and Learning to understand how we experience the world.",
                  color: "#0d7377",
                  weeks: "Week 3-5",
                },
                {
                  step: "03",
                  title: "Understand the Mind",
                  desc: "Study Memory and Motivation & Emotion to grasp how we store information and what drives behavior.",
                  color: "#d4770b",
                  weeks: "Week 6-7",
                },
                {
                  step: "04",
                  title: "Apply Knowledge",
                  desc: "Learn about Psychological Disorders and Treatment to see how theory connects to real-world practice.",
                  color: "#5c2d91",
                  weeks: "Week 9-10",
                },
                {
                  step: "05",
                  title: "Test & Review",
                  desc: "Take the 60-question practice quiz, review your answers, and identify areas for improvement.",
                  color: "#c44536",
                  weeks: "Final Review",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="relative pl-16 pb-10 last:pb-0"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 top-1 w-5 h-5 rounded-full border-[3px] border-white"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: item.color + "12",
                            color: item.color,
                          }}
                        >
                          {item.weeks}
                        </span>
                      </div>
                      <h3 className="font-[var(--font-display)] font-700 text-[#1a1a2e] text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#2d3436]/55 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== QUIZ CTA ===== */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#4a3f8f]" />
            <div className="absolute inset-0 opacity-[0.07] bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310519663573211151/aVXFU6RBftDvP2qLXx9X5n/quiz-bg-V9JpucHV8EroR79wkBVurg.webp')] bg-cover bg-center" />
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full border border-white/10" />
            <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border border-white/5" />

            <div className="relative z-10 px-8 py-20 sm:px-16 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-6 backdrop-blur-sm">
                <ClipboardCheck size={14} />
                Practice Makes Perfect
              </span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-800 text-white tracking-tight">
                Ready to Test Your
                <br />
                Knowledge?
              </h2>
              <p className="mt-5 text-white/60 max-w-lg mx-auto leading-relaxed">
                60 carefully curated questions covering all 9 modules. Get
                instant feedback with detailed explanations for every answer.
              </p>
              <Link href="/quiz">
                <span className="group inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-xl bg-white text-[#1e3a5f] font-bold text-sm hover:bg-white/95 transition-all shadow-xl shadow-black/15">
                  Start Practice Quiz
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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
