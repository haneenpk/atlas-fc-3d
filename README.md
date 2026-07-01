<div align="center">

# ⚽ ATLAS FC — 3D Football Club Website

An award-style, fully animated football-club website — powered by a real-time
**Three.js** trophy and choreographed with **Framer Motion**, **GSAP** and
**Lenis** smooth scroll.

_"Fear the crest." — ATLAS FC, The Vanguard, est. 1904_

<br/>

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-black?style=for-the-badge&logo=react&logoColor=61DAFB)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## ✨ Highlights

- **🏆 Real-time 3D trophy** — a glTF championship trophy rendered with **Three.js / React Three Fiber**, floating in a procedural studio, reflecting live lighting, and **rotating as you scroll**.
- **🎬 Motion everywhere** — **Framer Motion** drives the animated navigation, mobile menu, carousels, counters, magnetic buttons and the custom cursor; **GSAP + ScrollTrigger** power the split-text headline reveals.
- **🪄 Buttery smooth scroll** — **Lenis** smooth scrolling, synced to GSAP's ticker so scroll and scroll-animations share one clock.
- **⚡ Adaptive performance** — the 3D scene measures real frame rate and automatically scales resolution / disables Bloom on weaker GPUs, and pauses entirely when off-screen.
- **📱 Fully responsive** — mobile → tablet → desktop, including breakpoint-aware 3D camera framing.
- **♿ Accessible** — respects `prefers-reduced-motion`, semantic markup, keyboard-navigable.

## 🧱 Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 15** (App Router) + **React 19** + **TypeScript** |
| 3D / WebGL | **Three.js**, **@react-three/fiber**, **@react-three/drei**, **@react-three/postprocessing** |
| Animation | **Framer Motion**, **GSAP** + ScrollTrigger |
| Smooth scroll | **Lenis** |
| Styling | **Tailwind CSS** (custom theme tokens) |
| State | **Zustand** |
| Icons | **react-icons** |

## 🚀 Getting started

```bash
# install
npm install

# develop
npm run dev          # http://localhost:3000

# production (best for judging real performance)
npm run build
npm run start
```

> Judge **frame-rate smoothness** from a production build — `next dev` adds
> development overhead that won't exist in the deployed site.

## 🗂️ Project structure

```
app/                 Root layout (fonts, metadata), page composition, global styles
components/
  sections/          Hero · Fixtures · Squad · Season · Partners · FanVoices · Membership
  three/             R3F scene: HeroCanvas, Trophy, TrophyGLB, CameraRig, Particles
  layout/            Navbar, MobileMenu, Footer, CustomCursor, Logo
  ui/                MagneticButton, TiltCard, Marquee, SectionHeading, Container
  animations/        Reveal, SplitText, Counter, MouseGlow
  providers/         SmoothScrollProvider (Lenis ⇄ GSAP)
hooks/               useScrollSpin, useMagnetic, useCountdown, usePointer, useReducedMotion
lib/                 data.ts (all content), constants.ts, accents.ts, utils.ts, gsap.ts
store/               uiStore.ts (Zustand)
public/models/       trophy.glb
```

## 🧩 Sections

| Section | What it does |
|---------|-------------|
| **Hero** | 3D trophy + split-text headline + next-match ribbon |
| **Fixtures** | Next match with live countdown, upcoming list, results ticker |
| **Squad** | Interactive player showcase with stats |
| **Season** | Animated counters, form guide, live momentum canvas |
| **Partners** | Infinite sponsor marquee |
| **Fan voices** | Supporter-quote carousel |
| **Membership** | Animated join-the-club call to action |

All editable content (fixtures, squad, stats, quotes, brand) lives in
[`lib/data.ts`](lib/data.ts) and [`lib/constants.ts`](lib/constants.ts).

## 🏆 Swapping the 3D model

The trophy loads from `public/models/trophy.glb`. To use a different model,
drop a `.glb` there — it's auto-centered and auto-scaled. Tuning knobs (target
height, resting angle) live in [`components/three/TrophyGLB.tsx`](components/three/TrophyGLB.tsx).
If the file is missing, a built-in procedural trophy renders as a fallback.

## ⚡ Performance strategy

- 3D bundle is `dynamic({ ssr: false })` — never blocks first paint.
- `PerformanceMonitor` adapts DPR + toggles Bloom to the device.
- Render loop pauses (`frameloop`) when the hero scrolls out of view.
- Transform/opacity-only animations (no repaint-heavy blur), baked contact shadows.

## 📄 License & credits

Code: MIT. This is a portfolio / concept project for a fictional club.

> **Note:** the trophy 3D model is under a **Personal-Use license**. Replace it
> with a commercially-licensed asset before any commercial deployment.
