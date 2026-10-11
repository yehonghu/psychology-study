/*
 * Neural Garden design: 404 page matching the warm academic aesthetic
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Brain } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-[#6253bd]/8 flex items-center justify-center mx-auto mb-6">
          <Brain size={36} className="text-[#6253bd]" />
        </div>
        <h1 className="font-[var(--font-display)] text-7xl font-extrabold text-[#6253bd] mb-2">
          404
        </h1>
        <h2 className="font-[var(--font-display)] text-xl font-bold text-[#26304f] mb-3">
          Page Not Found
        </h2>
        <p className="text-sm text-[#66728f]/50 leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#6253bd] text-white font-semibold text-sm hover:bg-[#162d4a] transition-all shadow-lg shadow-[#6253bd]/20">
            <ArrowLeft size={16} />
            Back to Home
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
