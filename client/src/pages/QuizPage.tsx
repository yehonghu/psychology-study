/*
 * Mindscape Design: Interactive quiz with polished UI
 * Chapter filter, shuffle, progress tracking, animated score, review mode
 */
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  RotateCcw,
  Trophy,
  ChevronLeft,
  Shuffle,
  Filter,
  Grid3X3,
  BookOpen,
  Target,
  Zap,
  Award,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { quizQuestions } from "@/data/quizQuestions";
import { chapters } from "@/data/chapters";

type QuizMode = "setup" | "active" | "result";

function getChapterColor(chapterId: string): string {
  return chapters.find((c) => c.id === chapterId)?.color || "#1e3a5f";
}

function getChapterTitle(chapterId: string): string {
  return chapters.find((c) => c.id === chapterId)?.title || "General";
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPage() {
  const [mode, setMode] = useState<QuizMode>("setup");
  const [questionCount, setQuestionCount] = useState(20);
  const [shuffled, setShuffled] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState<Set<string>>(
    new Set(chapters.map((c) => c.id))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(quizQuestions);
  const [showNavigator, setShowNavigator] = useState(false);

  const toggleChapter = (id: string) => {
    setSelectedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const availableCount = useMemo(
    () => quizQuestions.filter((q) => selectedChapters.has(q.chapter)).length,
    [selectedChapters]
  );

  const startQuiz = () => {
    let qs = quizQuestions.filter((q) => selectedChapters.has(q.chapter));
    if (shuffled) qs = shuffleArray(qs);
    qs = qs.slice(0, Math.min(questionCount, qs.length));
    setActiveQuestions(qs);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setMode("active");
  };

  const currentQ = activeQuestions[currentIndex];
  const hasAnswered = currentQ && selectedAnswers[currentQ.id] !== undefined;
  const isCorrect =
    currentQ && selectedAnswers[currentQ.id] === currentQ.correctIndex;

  const score = useMemo(() => {
    return activeQuestions.reduce((acc, q) => {
      return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [selectedAnswers, activeQuestions]);

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = activeQuestions.every(
    (q) => selectedAnswers[q.id] !== undefined
  );

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (hasAnswered) return;
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optionIndex,
      }));
      setShowExplanation(true);
    },
    [hasAnswered, currentQ]
  );

  const goNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(
        selectedAnswers[activeQuestions[currentIndex - 1].id] !== undefined
      );
    }
  };

  const finishQuiz = () => {
    setMode("result");
  };

  // ===== SETUP SCREEN =====
  if (mode === "setup") {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar />
        <div className="container pt-24 pb-16 max-w-3xl mx-auto">
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-sm text-[#2d3436]/45 hover:text-[#2d3436]/75 transition-colors mb-8">
              <ChevronLeft size={16} />
              Back to Home
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-[#1e3a5f] flex items-center justify-center">
                  <Target size={22} className="text-white" />
                </div>
                <div>
                  <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl font-800 text-[#1a1a2e]">
                    Practice Quiz
                  </h1>
                  <p className="text-sm text-[#2d3436]/50">
                    {quizQuestions.length} questions across{" "}
                    {chapters.length} modules
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Config */}
              <div className="lg:col-span-2 space-y-6">
                {/* Chapter filter */}
                <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter size={16} className="text-[#1e3a5f]" />
                    <h3 className="font-[var(--font-display)] font-700 text-sm text-[#1a1a2e]">
                      Select Chapters
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {chapters.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => toggleChapter(ch.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all border ${
                          selectedChapters.has(ch.id)
                            ? "border-transparent shadow-sm"
                            : "border-black/5 opacity-40 hover:opacity-60"
                        }`}
                        style={
                          selectedChapters.has(ch.id)
                            ? {
                                backgroundColor: ch.color + "10",
                                borderColor: ch.color + "25",
                              }
                            : {}
                        }
                      >
                        <span className="text-lg">{ch.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-semibold truncate text-xs"
                            style={
                              selectedChapters.has(ch.id)
                                ? { color: ch.color }
                                : { color: "#2d3436" }
                            }
                          >
                            Week {ch.week}
                          </p>
                          <p className="text-[10px] text-[#2d3436]/50 truncate">
                            {ch.title}
                          </p>
                        </div>
                        {selectedChapters.has(ch.id) && (
                          <Check size={14} style={{ color: ch.color }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question count + shuffle */}
                <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Grid3X3 size={16} className="text-[#1e3a5f]" />
                    <h3 className="font-[var(--font-display)] font-700 text-sm text-[#1a1a2e]">
                      Quiz Settings
                    </h3>
                  </div>

                  <label className="block text-xs font-semibold text-[#2d3436]/60 mb-3 uppercase tracking-wide">
                    Number of Questions
                  </label>
                  <div className="flex gap-2 flex-wrap mb-5">
                    {[10, 20, 30, 60].map((n) => (
                      <button
                        key={n}
                        onClick={() => setQuestionCount(n)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          questionCount === n
                            ? "bg-[#1e3a5f] text-white shadow-md shadow-[#1e3a5f]/15"
                            : "bg-[#1e3a5f]/5 text-[#1e3a5f] hover:bg-[#1e3a5f]/10"
                        }`}
                      >
                        {n}
                        {n === 60 ? " (All)" : ""}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShuffled(!shuffled)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-all w-full ${
                      shuffled
                        ? "bg-[#d4770b]/10 text-[#d4770b] border border-[#d4770b]/20"
                        : "bg-[#faf8f5] text-[#2d3436]/55 hover:text-[#2d3436]/75 border border-black/5"
                    }`}
                  >
                    <Shuffle size={16} />
                    {shuffled
                      ? "Shuffle enabled — random order"
                      : "Shuffle questions"}
                  </button>
                </div>
              </div>

              {/* Right: Summary + Start */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm sticky top-24">
                  <h3 className="font-[var(--font-display)] font-700 text-sm text-[#1a1a2e] mb-4">
                    Quiz Summary
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#2d3436]/50">Available</span>
                      <span className="font-bold text-[#1a1a2e]">
                        {availableCount} questions
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#2d3436]/50">Selected</span>
                      <span className="font-bold text-[#1a1a2e]">
                        {Math.min(questionCount, availableCount)} questions
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#2d3436]/50">Chapters</span>
                      <span className="font-bold text-[#1a1a2e]">
                        {selectedChapters.size} of {chapters.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#2d3436]/50">Order</span>
                      <span className="font-bold text-[#1a1a2e]">
                        {shuffled ? "Random" : "Sequential"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={startQuiz}
                    disabled={availableCount === 0}
                    className="w-full py-4 rounded-xl bg-[#1e3a5f] text-white font-bold text-sm hover:bg-[#1e3a5f]/90 transition-all shadow-lg shadow-[#1e3a5f]/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ===== RESULT SCREEN =====
  if (mode === "result") {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const grade =
      percentage >= 90
        ? { label: "Excellent!", emoji: "🏆", color: "#2d6a4f" }
        : percentage >= 70
        ? { label: "Good Job!", emoji: "🎯", color: "#0d7377" }
        : percentage >= 50
        ? { label: "Keep Studying", emoji: "📖", color: "#d4770b" }
        : { label: "Needs Improvement", emoji: "💪", color: "#c44536" };

    // Group wrong answers by chapter
    const wrongByChapter: Record<string, typeof activeQuestions> = {};
    activeQuestions.forEach((q) => {
      if (selectedAnswers[q.id] !== q.correctIndex) {
        if (!wrongByChapter[q.chapter]) wrongByChapter[q.chapter] = [];
        wrongByChapter[q.chapter].push(q);
      }
    });

    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar />
        <div className="container pt-24 pb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Score Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-black/5 text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl"
                style={{ backgroundColor: grade.color + "12" }}
              >
                {grade.emoji}
              </motion.div>
              <h1
                className="font-[var(--font-display)] text-3xl font-800 mb-2"
                style={{ color: grade.color }}
              >
                {grade.label}
              </h1>
              <p className="text-[#2d3436]/55 mb-8">
                You scored{" "}
                <span className="font-bold text-[#1a1a2e]">{score}</span> out of{" "}
                <span className="font-bold text-[#1a1a2e]">
                  {activeQuestions.length}
                </span>
              </p>

              {/* Score ring */}
              <div className="relative w-44 h-44 mx-auto mb-8">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full -rotate-90"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#f0ece6"
                    strokeWidth="7"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={grade.color}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 42 * (1 - percentage / 100),
                    }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="font-[var(--font-display)] text-4xl font-800"
                    style={{ color: grade.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {percentage}%
                  </motion.span>
                  <span className="text-[10px] text-[#2d3436]/40 font-semibold uppercase tracking-wider mt-1">
                    Score
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="text-center">
                  <div className="text-xl font-800 text-[#2d6a4f]">
                    {score}
                  </div>
                  <div className="text-[10px] text-[#2d3436]/40 font-semibold uppercase tracking-wide">
                    Correct
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-800 text-[#c44536]">
                    {activeQuestions.length - score}
                  </div>
                  <div className="text-[10px] text-[#2d3436]/40 font-semibold uppercase tracking-wide">
                    Wrong
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-800 text-[#1e3a5f]">
                    {activeQuestions.length}
                  </div>
                  <div className="text-[10px] text-[#2d3436]/40 font-semibold uppercase tracking-wide">
                    Total
                  </div>
                </div>
              </div>
            </div>

            {/* Review: Wrong Answers by Chapter */}
            {Object.keys(wrongByChapter).length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-black/5 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={18} className="text-[#c44536]" />
                  <h2 className="font-[var(--font-display)] font-700 text-base text-[#1a1a2e]">
                    Review Incorrect Answers
                  </h2>
                </div>
                <div className="space-y-6">
                  {Object.entries(wrongByChapter).map(([chId, qs]) => (
                    <div key={chId}>
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: getChapterColor(chId) }}
                        />
                        <span className="text-xs font-bold text-[#2d3436]/60 uppercase tracking-wide">
                          {getChapterTitle(chId)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {qs.map((q) => (
                          <div
                            key={q.id}
                            className="p-4 rounded-xl bg-[#faf8f5] border border-black/5"
                          >
                            <p className="text-sm font-medium text-[#1a1a2e] mb-2">
                              {q.question}
                            </p>
                            <div className="flex flex-col gap-1">
                              <p className="text-xs text-[#c44536]">
                                <span className="font-semibold">
                                  Your answer:
                                </span>{" "}
                                {q.options[selectedAnswers[q.id]]}
                              </p>
                              <p className="text-xs text-[#2d6a4f]">
                                <span className="font-semibold">Correct:</span>{" "}
                                {q.options[q.correctIndex]}
                              </p>
                              <p className="text-xs text-[#2d3436]/50 mt-1 italic">
                                {q.explanation}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All answers quick view */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-black/5 mb-8">
              <h2 className="font-[var(--font-display)] font-700 text-base text-[#1a1a2e] mb-4">
                All Answers
              </h2>
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                {activeQuestions.map((q, i) => {
                  const correct = selectedAnswers[q.id] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                        correct
                          ? "bg-[#2d6a4f]/10 text-[#2d6a4f]"
                          : "bg-[#c44536]/10 text-[#c44536]"
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setMode("setup");
                  setSelectedAnswers({});
                }}
                className="flex-1 py-4 rounded-xl bg-white border border-black/5 text-[#1e3a5f] font-bold text-sm hover:bg-[#1e3a5f]/5 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw size={16} />
                Try Again
              </button>
              <Link href="/" className="flex-1">
                <span className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1e3a5f] text-white font-bold text-sm hover:bg-[#1e3a5f]/90 transition-all shadow-lg shadow-[#1e3a5f]/15">
                  <BookOpen size={16} />
                  Back to Study
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ===== ACTIVE QUIZ SCREEN =====
  const progress = ((currentIndex + 1) / activeQuestions.length) * 100;
  const chapterColor = getChapterColor(currentQ.chapter);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />
      <div className="container pt-24 pb-16 max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to quit? Your progress will be lost."
                )
              ) {
                setMode("setup");
                setSelectedAnswers({});
              }
            }}
            className="flex items-center gap-2 text-sm text-[#2d3436]/45 hover:text-[#2d3436]/75 transition-colors"
          >
            <ChevronLeft size={16} />
            Quit
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-[#2d3436]/40">
              {answeredCount}/{activeQuestions.length} answered
            </span>
            <button
              onClick={() => setShowNavigator(!showNavigator)}
              className={`p-2 rounded-lg transition-all ${
                showNavigator
                  ? "bg-[#1e3a5f] text-white"
                  : "bg-white text-[#2d3436]/50 hover:text-[#2d3436] border border-black/5"
              }`}
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[11px] text-[#2d3436]/45 mb-2 font-medium">
            <span>
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span className="flex items-center gap-1.5">
              <Award size={12} />
              Score: {score}/{answeredCount}
            </span>
          </div>
          <div className="h-1.5 bg-[#f0ece6] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: chapterColor }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Navigator Drawer */}
        <AnimatePresence>
          {showNavigator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
                <p className="text-xs font-semibold text-[#2d3436]/40 mb-3 uppercase tracking-wide">
                  Jump to question
                </p>
                <div className="grid grid-cols-10 gap-2">
                  {activeQuestions.map((q, i) => {
                    const answered = selectedAnswers[q.id] !== undefined;
                    const correct = selectedAnswers[q.id] === q.correctIndex;
                    const isCurrent = i === currentIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentIndex(i);
                          setShowExplanation(
                            selectedAnswers[q.id] !== undefined
                          );
                          setShowNavigator(false);
                        }}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                          isCurrent
                            ? "bg-[#1e3a5f] text-white ring-2 ring-[#1e3a5f]/30"
                            : answered
                            ? correct
                              ? "bg-[#2d6a4f]/12 text-[#2d6a4f]"
                              : "bg-[#c44536]/12 text-[#c44536]"
                            : "bg-[#faf8f5] text-[#2d3436]/40 hover:bg-[#1e3a5f]/5"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden"
          >
            {/* Color bar */}
            <div className="h-1" style={{ backgroundColor: chapterColor }} />

            <div className="p-6 sm:p-8">
              {/* Chapter tag */}
              <span
                className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold text-white mb-5 uppercase tracking-wide"
                style={{ backgroundColor: chapterColor }}
              >
                {getChapterTitle(currentQ.chapter)}
              </span>

              <h2 className="font-[var(--font-display)] text-lg sm:text-xl font-700 text-[#1a1a2e] mb-7 leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentQ.id] === i;
                  const isCorrectOption = i === currentQ.correctIndex;
                  const answered = hasAnswered;

                  let optionClasses =
                    "border-[#e8e4df] hover:border-[#1e3a5f]/25 hover:bg-[#1e3a5f]/3";
                  let letterClasses =
                    "bg-[#1e3a5f]/8 text-[#1e3a5f]";

                  if (answered) {
                    if (isCorrectOption) {
                      optionClasses = "border-[#2d6a4f]/40 bg-[#2d6a4f]/6";
                      letterClasses = "bg-[#2d6a4f] text-white";
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses = "border-[#c44536]/40 bg-[#c44536]/6";
                      letterClasses = "bg-[#c44536] text-white";
                    } else {
                      optionClasses = "border-[#e8e4df] opacity-40";
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                      whileHover={!answered ? { scale: 1.01 } : {}}
                      whileTap={!answered ? { scale: 0.99 } : {}}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm flex items-center gap-4 ${optionClasses}`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${letterClasses}`}
                      >
                        {answered && isCorrectOption ? (
                          <Check size={14} />
                        ) : answered && isSelected && !isCorrectOption ? (
                          <X size={14} />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className="text-[#1a1a2e] leading-relaxed">
                        {opt}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && hasAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 overflow-hidden"
                  >
                    <div
                      className={`p-5 rounded-xl text-sm leading-relaxed ${
                        isCorrect
                          ? "bg-[#2d6a4f]/6 text-[#2d6a4f] border border-[#2d6a4f]/12"
                          : "bg-[#c44536]/6 text-[#c44536] border border-[#c44536]/12"
                      }`}
                    >
                      <p className="font-bold mb-1 flex items-center gap-2">
                        {isCorrect ? (
                          <>
                            <Check size={14} /> Correct!
                          </>
                        ) : (
                          <>
                            <X size={14} /> Incorrect
                          </>
                        )}
                      </p>
                      <p className="opacity-80">{currentQ.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-[#2d3436]/55 hover:text-[#2d3436] hover:bg-white transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          {currentIndex === activeQuestions.length - 1 && allAnswered ? (
            <motion.button
              onClick={finishQuiz}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#1e3a5f] text-white text-sm font-bold hover:bg-[#1e3a5f]/90 transition-all shadow-lg shadow-[#1e3a5f]/15"
            >
              <Trophy size={16} />
              See Results
            </motion.button>
          ) : (
            <button
              onClick={goNext}
              disabled={currentIndex === activeQuestions.length - 1}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-[#2d3436]/55 hover:text-[#2d3436] hover:bg-white transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
