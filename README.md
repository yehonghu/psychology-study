# PsychMind

> An interactive psychology study hub for moving from concept recall to confident practice.

PsychMind is a React and TypeScript learning environment for foundational psychology. The upgraded **Neural Garden** experience treats each module as part of a connected field of knowledge: learners can open concise concept cards, record mastery, and use a focused quiz to identify what deserves another review session.

## Live Preview

The static interactive preview is published at [yehonghu.github.io/psychology-study](https://yehonghu.github.io/psychology-study/).

## Learning Experience

| Area | What learners can do |
|---|---|
| Module overview | Browse nine psychology modules, each with its own identity and concept inventory. |
| Concept practice | Reveal definitions on interactive cards, search a module, filter concepts, and record mastery. |
| Quiz preparation | Choose modules, configure a session length, and focus the review scope. |
| Quiz and feedback | Answer 60 practice questions, see immediate feedback, review explanations, and revisit missed topics. |
| Study path | Follow a clear progression from foundations and processes to application and final review. |

## Design System

The application uses **Neural Garden**, a high-key learning environment made from lilac, mineral blue, soft mint, and coral signals. A gentle scroll-progress filament, low-motion spatial effects, and a pointer-responsive cognitive constellation create visual character while preserving readable study surfaces and an accessible reduced-motion mode.

## Technology

| Area | Tools |
|---|---|
| Application | React 19, TypeScript, Wouter |
| Interface | Tailwind CSS 4, shadcn/ui, Lucide |
| Motion | Framer Motion |
| Build | Vite, esbuild, pnpm |
| Production server | Express static-file fallback for SPA routes |

## Local Development

### Requirements

- Node.js 18 or later
- pnpm 10 or later

### Commands

```bash
pnpm install
pnpm dev
```

Use the Vite URL printed in the terminal to open the local application.

```bash
pnpm check
pnpm build
pnpm start
```

`pnpm check` runs TypeScript validation. `pnpm build` produces the static frontend and bundled server. `pnpm start` serves the production build with SPA route fallback.

## Project Structure

```text
client/
  src/
    components/   # Navigation, shared UI, and progress feedback
    data/         # Chapter and quiz source data
    pages/        # Home, module index, chapter study, and quiz routes
    contexts/     # Theme state
    index.css     # Global tokens and Neural Garden visual system
server/
  index.ts        # Production static server
```

## Contributor

**Yehong Hu (James Hu)**
