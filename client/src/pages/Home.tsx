import { useRef } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  GraduationCap,
  Layers,
  Lightbulb,
  Sparkles,
  Star,
  Workflow,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { chapters } from "@/data/chapters";

const features = [
  { icon: Brain, value: "9", title: "Learning modules", copy: "A connected path from research foundations to treatment and therapy.", tone: "#7d67d9" },
  { icon: Layers, value: "130+", title: "Key concepts", copy: "Short, focused cards designed for recall, connection, and review.", tone: "#4e89d9" },
  { icon: CircleHelp, value: "60", title: "Practice questions", copy: "Exam-style prompts with feedback and explanations after every choice.", tone: "#f08d7d" },
  { icon: GraduationCap, value: "1", title: "Personal study path", copy: "Mastery signals help you decide where to spend the next study session.", tone: "#71c8b4" },
];

const path = [
  { step: "01", title: "Find the foundations", copy: "Meet psychology as a discipline, then explore the biological systems that make behavior possible.", color: "#7d67d9" },
  { step: "02", title: "Trace the processes", copy: "Move through sensation, consciousness, learning, memory, motivation, and emotion.", color: "#4e89d9" },
  { step: "03", title: "Connect theory to care", copy: "Study disorders and treatment with the earlier modules still visible as context.", color: "#71c8b4" },
  { step: "04", title: "Practice the recall", copy: "Use a focused quiz session to identify what has settled and what needs another pass.", color: "#f08d7d" },
];

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, rotateX: -5 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-9% 0px -6%" }}
      transition={{ duration: reduceMotion ? 0.01 : 0.7, delay, ease }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

function CognitiveConstellation() {
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !target.current) return;
    const rect = target.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const topics = [
    { className: "one", icon: Lightbulb, label: "Perception", color: "#7d67d9" },
    { className: "two", icon: Brain, label: "Memory", color: "#4e89d9" },
    { className: "three", icon: Zap, label: "Emotion", color: "#f08d7d" },
    { className: "four", icon: Workflow, label: "Learning", color: "#71aE9c" },
  ];

  return (
    <div className="mx-auto mt-12 w-full max-w-[590px] [perspective:1200px] lg:mt-0">
      <motion.div ref={target} onPointerMove={move} onPointerLeave={reset} className="neural-orbit w-full" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <motion.div className="neural-core" style={{ translateZ: 70 }} animate={reduceMotion ? {} : { rotate: [0, 4, 0, -4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        {topics.map((topic, index) => (
          <motion.div
            key={topic.label}
            className={`neural-topic ${topic.className}`}
            style={{ translateZ: 42 + index * 18 }}
            animate={reduceMotion ? {} : { y: [0, index % 2 ? 8 : -7, 0] }}
            transition={{ duration: 5 + index * 0.55, repeat: Infinity, ease: "easeInOut", delay: index * 0.16 }}
          >
            <span className="neural-topic-icon" style={{ background: topic.color }}><topic.icon size={14} /></span>
            {topic.label}
          </motion.div>
        ))}
        <span aria-hidden="true" className="absolute left-[21%] top-[37%] h-px w-[28%] -rotate-[22deg] bg-gradient-to-r from-transparent via-[#7d67d9]/50 to-transparent" />
        <span aria-hidden="true" className="absolute right-[17%] top-[43%] h-px w-[26%] rotate-[24deg] bg-gradient-to-r from-transparent via-[#71c8b4]/55 to-transparent" />
        <span aria-hidden="true" className="absolute bottom-[29%] left-[36%] h-px w-[25%] rotate-[64deg] bg-gradient-to-r from-transparent via-[#f08d7d]/55 to-transparent" />
      </motion.div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const constellationY = useTransform(scrollYProgress, [0, 1], [0, 58]);
  const reduceMotion = useReducedMotion();

  return (
    <div className="neural-home min-h-screen">
      <Navbar />
      <div aria-hidden="true" className="neural-grain" />

      <section ref={heroRef} className="relative overflow-hidden px-6 pb-24 pt-24 sm:pb-32 sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-14rem] top-[12rem] h-[31rem] w-[31rem] rounded-full bg-[#b6efd9]/35 blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] top-[4rem] h-[32rem] w-[32rem] rounded-full bg-[#d8caff]/40 blur-[110px]" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div style={{ y: reduceMotion ? 0 : textY }} className="max-w-[610px]">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, ease }} className="neural-label">A field guide to the mind</motion.div>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.74, delay: 0.08, ease }} className="neural-display mt-6 text-[50px] font-bold leading-[0.91] sm:text-[65px] lg:text-[78px]">
              Make the invisible feel learnable.
            </motion.h1>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.67, delay: 0.16, ease }} className="neural-copy mt-7 max-w-[560px] text-[17px] leading-relaxed sm:text-[19px]">
              PsychMind gives psychology a shape you can return to: connected modules, concise concept cards, and focused practice that turns final review into a clearer next step.
            </motion.p>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, delay: 0.24, ease }} className="mt-9 flex flex-wrap gap-3">
              <Link href="/chapters"><span className="neural-button-primary">Explore learning modules <ArrowRight size={16} /></span></Link>
              <Link href="/quiz"><span className="neural-button-secondary">Take a practice quiz</span></Link>
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65, delay: 0.42 }} className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#66728f]">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#71c8b4] shadow-[0_0_10px_rgba(113,200,180,0.65)]" /> Recall, connect, and review</span>
              <a href="#learning-path" className="flex items-center gap-1.5 font-semibold text-[#6253bd] no-underline hover:text-[#26304f]">See the study path <ArrowDown size={14} /></a>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: reduceMotion ? 0 : constellationY }}><CognitiveConstellation /></motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-[1200px] gap-4 border-y border-[#676da1]/12 py-7 sm:grid-cols-4 sm:gap-0 sm:py-9">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.07} className="sm:border-l sm:border-[#676da1]/12 sm:px-6 first:sm:border-l-0 first:sm:pl-0">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ color: feature.tone, background: `${feature.tone}16` }}><feature.icon size={18} /></span>
                <div>
                  <p className="font-[var(--font-display)] text-[24px] font-[800] leading-none" style={{ color: feature.tone }}>{feature.value}</p>
                  <p className="mt-1.5 text-[12.5px] font-bold text-[#394662]">{feature.title}</p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-[#66728f]">{feature.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute right-[-13rem] top-[10rem] h-[28rem] w-[28rem] rounded-full bg-[#ffdbd4]/35 blur-[115px]" />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal>
            <span className="neural-label">Nine places to begin</span>
            <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="neural-display max-w-[690px] text-[40px] font-bold leading-[0.96] sm:text-[56px]">Knowledge does not arrive in a straight line. It gathers.</h2>
              <p className="max-w-[325px] text-[15px] leading-relaxed text-[#66728f]">Each module is a small ecosystem of terms and relationships. Choose the one that needs your attention now.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter, index) => (
              <Reveal key={chapter.id} delay={(index % 3) * 0.07}>
                <Link href={`/chapter/${chapter.id}`}>
                  <motion.article className="neural-module group relative h-full overflow-hidden rounded-3xl p-6" whileHover={reduceMotion ? {} : { y: -9, rotateX: 3, rotateY: index % 2 ? 2 : -2 }} transition={{ type: "spring", stiffness: 240, damping: 21 }}>
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: chapter.color }} />
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl text-[21px]" style={{ background: chapter.colorLight }}>{chapter.icon}</span>
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: chapter.color, background: chapter.colorLight }}>Week {chapter.week}</span>
                    </div>
                    <h3 className="mt-7 font-[var(--font-display)] text-[20px] font-[750] leading-tight" style={{ color: chapter.color }}>{chapter.title}</h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#66728f]">{chapter.subtitle}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-[#676da1]/10 pt-4">
                      <span className="text-[11.5px] text-[#75809a]">{chapter.keyConcepts.length} key concepts</span>
                      <span className="flex items-center gap-1 text-[12px] font-bold transition-all group-hover:gap-2" style={{ color: chapter.color }}>Enter module <ArrowRight size={14} /></span>
                    </div>
                  </motion.article>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-8 text-center"><Link href="/chapters"><span className="neural-button-secondary">View all modules <BookOpen size={16} /></span></Link></Reveal>
        </div>
      </section>

      <section id="learning-path" className="relative px-6 py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_50%_50%,rgba(204,199,255,0.24),transparent_58%)]" />
        <div className="relative mx-auto max-w-[1060px]">
          <Reveal className="text-center">
            <span className="neural-label">A learning path that breathes</span>
            <h2 className="neural-display mx-auto mt-5 max-w-[760px] text-[40px] font-bold leading-[0.96] sm:text-[57px]">Study the way understanding actually grows.</h2>
            <p className="mx-auto mt-5 max-w-[570px] text-[16px] leading-relaxed text-[#66728f]">Foundations become processes. Processes become patterns. Patterns become the context for application and care.</p>
          </Reveal>
          <div className="relative mt-16 grid gap-4 md:grid-cols-2">
            <div aria-hidden="true" className="neural-path-line absolute bottom-[12%] left-1/2 top-[12%] hidden w-px -translate-x-1/2 md:block" />
            {path.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.09} className={index % 2 ? "md:translate-y-12" : ""}>
                <motion.article className="neural-surface relative rounded-3xl p-7" whileHover={reduceMotion ? {} : { y: -6, rotateX: 2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
                  <span className="absolute -top-3 left-7 grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white shadow-lg" style={{ background: item.color }}>{item.step}</span>
                  <h3 className="font-[var(--font-display)] text-[22px] font-[750] text-[#26304f]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#66728f]">{item.copy}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-12 sm:pb-40 sm:pt-20">
        <Reveal>
          <div className="neural-surface relative mx-auto max-w-[1000px] overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#d8caff]/55" />
            <div aria-hidden="true" className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#b8eddb]/40" />
            <div className="relative">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#8a75df] to-[#5e9cde] text-white shadow-[0_12px_26px_rgba(102,100,199,0.24)]"><ClipboardCheck size={23} /></span>
              <h2 className="neural-display mx-auto mt-7 max-w-[680px] text-[40px] font-bold leading-[0.96] sm:text-[57px]">Give your recall a real rehearsal.</h2>
              <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-relaxed text-[#66728f]">Choose the chapters you want to revisit, set the session length, and let the practice questions show you the next useful place to study.</p>
              <Link href="/quiz"><span className="neural-button-primary mt-9">Start practice quiz <ArrowRight size={16} /></span></Link>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="neural-footer border-t py-10">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#8a75df] to-[#5e9cde] text-sm font-bold text-white">ψ</span><span className="font-[var(--font-display)] text-[15px] font-[750] text-[#26304f]">PsychMind</span></div>
          <p className="text-center text-[12px] text-[#66728f]">Psychology study hub · Contributor: Yehong Hu (James Hu)</p>
        </div>
      </footer>
    </div>
  );
}
