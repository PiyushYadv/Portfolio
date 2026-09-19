import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  MapPin,
  Calendar,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import {
  DISPLAY,
  EDUCATION,
  EXPERIENCE,
  MONO,
  PROJECTS,
  RESUME_URL,
  SKILLS,
} from "./data/portfolio";
import { CodeforcesMark, LeetCodeMark } from "./components/common/Logo";
import { ProjectCard } from "./components/common/ProjectCard";
import { Achievements } from "./components/common/Achievements";
import { AboutPhoto } from "./components/common/AboutPhoto";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-md border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
      style={MONO}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="reveal-up mb-12 flex items-center gap-4">
      <span className="text-xs text-primary" style={MONO}>
        {n}
      </span>
      <span className="h-px w-10 bg-gradient-to-r from-primary/60 to-transparent" />
      <h2
        className="text-3xl font-bold tracking-tight text-foreground"
        style={DISPLAY}
      >
        {label}
      </h2>
    </div>
  );
}

// Magnetic hover for buttons / links
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const leave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return ref;
}

// Terminal-style typing animation for the code panel
export function useTyping(lines: string[], delayStart = 600) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    let char = 0;
    let interval: ReturnType<typeof setInterval>;
    const startDelay = setTimeout(
      () => {
        interval = setInterval(() => {
          const line = lines[currentLine];
          if (char < line.length) {
            char++;
            setDisplayed((prev) => {
              const next = [...prev];
              next[currentLine] = line.slice(0, char);
              return next;
            });
          } else {
            clearInterval(interval);
            if (currentLine < lines.length - 1) {
              setTimeout(() => setCurrentLine((l) => l + 1), 160);
            } else {
              setDone(true);
            }
          }
        }, 26);
      },
      currentLine === 0 ? delayStart : 0,
    );
    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [currentLine, done]);

  return { displayed, done };
}

// GSAP-free character scramble that decodes into the target text
export function ScrambleText({
  text,
  className,
  style,
  start,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  start: boolean;
}) {
  const [out, setOut] = useState(text.replace(/[^ ]/g, " "));
  useEffect(() => {
    if (!start) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#$%&*01";
    let frame = 0;
    let raf = 0;
    const tick = () => {
      const revealed = frame / 2.2;
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          s += " ";
          continue;
        }
        if (i < revealed) s += text[i];
        else s += chars[Math.floor(Math.random() * chars.length)];
      }
      setOut(s);
      frame++;
      if (revealed <= text.length) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, text]);
  return (
    <span className={className} style={style}>
      {out}
    </span>
  );
}

// ─── HERO EMBER FIELD (canvas) ──────────────────────────────────────────────────

export function EmberField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0,
      raf = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    let particles: ReturnType<typeof make>[] = [];
    const make = () => ({
      x: Math.random() * w,
      y: h + Math.random() * h,
      r: (Math.random() * 2 + 0.5) * dpr,
      vy: -(Math.random() * 0.35 + 0.12) * dpr,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      hue: 28 + Math.random() * 22,
      alpha: Math.random() * 0.5 + 0.15,
      seed: Math.random() * 1000,
    });

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
      const count = Math.min(90, Math.floor(canvas.offsetWidth / 11));
      particles = Array.from({ length: count }, make);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left - r.width / 2) / r.width;
      mouse.ty = (e.clientY - r.top - r.height / 2) / r.height;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    const loop = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin((p.y + p.seed) * 0.008) * 0.3 * dpr;
        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        const px = p.x + mouse.x * 46 * dpr * p.r;
        const py = p.y + mouse.y * 22 * dpr;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 92%, 62%, ${p.alpha})`;
        ctx.shadowBlur = 9 * dpr;
        ctx.shadowColor = `hsla(${p.hue}, 92%, 55%, 0.85)`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
  );
}

// ─── FOLLOWER GLOW ───────────────────────────────────────────────────────────

export function FollowerGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) =>
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(246,182,76,0.10) 0%, rgba(246,182,76,0) 65%)",
        willChange: "transform",
      }}
    />
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function App() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroReady, setHeroReady] = useState(false);

  const primaryBtn = useMagnetic<HTMLButtonElement>(0.3);

  const terminalLines = [
    "const dev = {",
    '  name: "Piyush Yadav",',
    '  role: "Software Developer",',
    '  status: "open to work",',
    "};",
  ];
  const { displayed, done } = useTyping(terminalLines, 700);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 350);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      );

      gsap.fromTo(
        ".hero-stagger",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.35,
        },
      );

      ScrollTrigger.batch(".reveal-up", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
            },
          ),
        start: "top 88%",
      });
      ScrollTrigger.batch(".reveal-card", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 28, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.09,
            },
          ),
        start: "top 90%",
      });
      ScrollTrigger.batch(".reveal-left", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { x: -22, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.08,
            },
          ),
        start: "top 90%",
      });

      ScrollTrigger.create({
        start: "top -70",
        onUpdate: (self) => {
          if (!navRef.current) return;
          gsap.to(navRef.current, {
            backgroundColor:
              self.progress > 0 ? "rgba(23,16,10,0.82)" : "rgba(23,16,10,0)",
            backdropFilter: self.progress > 0 ? "blur(12px)" : "blur(0px)",
            borderBottomColor:
              self.progress > 0 ? "rgba(58,42,28,1)" : "rgba(58,42,28,0)",
            duration: 0.25,
          });
        },
      });
    });
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 70 },
        duration: 0.8,
        ease: "power2.inOut",
      });
  };

  const socials = (
    <>
      <a
        href="https://github.com/PiyushYadv"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        <Github size={17} />
      </a>
      <a
        href="https://linkedin.com/in/piyushyadav276"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        <Linkedin size={17} />
      </a>
      <a
        href="https://leetcode.com/PiyushYadv"
        target="_blank"
        rel="noreferrer"
        aria-label="LeetCode"
        className="rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        <LeetCodeMark size={17} />
      </a>
      <a
        href="https://codeforces.com/profile/piyush.y276"
        target="_blank"
        rel="noreferrer"
        aria-label="Codeforces"
        className="rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        <CodeforcesMark size={17} />
      </a>
      <a
        href="mailto:iampiyushyadv@gmail.com"
        aria-label="Email"
        className="rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        <Mail size={17} />
      </a>
    </>
  );

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <FollowerGlow />

      {/* ── NAV ── */}
      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollTo("top")}
            className="text-base font-bold tracking-tight text-foreground"
            style={DISPLAY}
          >
            Piyush Yadav
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {[
              { id: "work", label: "work" },
              { id: "achievements", label: "achievements" },
              { id: "about", label: "about" },
              { id: "experience", label: "experience" },
              { id: "education", label: "education" },
              { id: "skills", label: "skills" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="rounded-md px-3 py-1.5 text-sm capitalize text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
          </div>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Download size={14} /> Resume
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="top"
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        <EmberField />
        {/* ambient glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[120px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#f6b64c 1px,transparent 1px),linear-gradient(90deg,#f6b64c 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%,#000,transparent)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="hero-stagger mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-muted-foreground">
                Open to full-time SWE roles · 2027
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={11} /> India / Remote
              </span>
            </div>

            <h1
              className="hero-stagger mb-5 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
              style={DISPLAY}
            >
              <span className="block text-foreground">Hi, I&apos;m</span>
              <ScrambleText
                text="Piyush Yadav"
                start={heroReady}
                className="block bg-gradient-to-r from-primary via-[#ffd089] to-primary bg-clip-text text-transparent"
              />
            </h1>

            <p className="hero-stagger mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Final-year CS student building full-stack web apps and developer
              tools. I care about clean systems, fast interfaces, and shipping
              software that people actually use.
            </p>

            <div className="hero-stagger mb-8 flex flex-wrap items-center gap-3">
              <button
                ref={primaryBtn}
                onClick={() => scrollTo("work")}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_0_0_rgba(246,182,76,0.4)] transition-shadow hover:shadow-[0_10px_40px_-8px_rgba(246,182,76,0.5)]"
              >
                View my work <ArrowUpRight size={16} />
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Download size={15} /> Download CV
              </a>
            </div>

            <div className="hero-stagger flex flex-wrap items-center gap-2.5">
              {socials}
            </div>
          </div>

          {/* code panel */}
          <div className="hero-stagger">
            <div className="relative rounded-2xl border border-border bg-card/80 shadow-2xl backdrop-blur-sm">
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
              <div className="relative flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#e5533b]/80" />
                <span className="h-3 w-3 rounded-full bg-[#f6b64c]/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                <span
                  className="ml-3 text-[11px] text-muted-foreground"
                  style={MONO}
                >
                  ~/dev/profile.ts
                </span>
              </div>
              <div className="relative p-6">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex gap-4 text-[13px] leading-7"
                    style={MONO}
                  >
                    <span className="select-none text-muted-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        line.startsWith("  ")
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }
                    >
                      {displayed[i] ?? ""}
                      {i === displayed.length - 1 && !done && (
                        <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-0.5 animate-pulse bg-primary align-middle" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
              {/* competitive badges */}
              <div className="relative grid grid-cols-2 gap-px border-t border-border bg-border">
                <a
                  href="https://leetcode.com/PiyushYadv"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 bg-card px-4 py-3.5 transition-colors hover:bg-secondary"
                >
                  <LeetCodeMark size={18} />
                  <div className="min-w-0">
                    <p
                      className="text-[11px] text-muted-foreground"
                      style={MONO}
                    >
                      LeetCode
                    </p>
                    <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      1000+ solved
                    </p>
                  </div>
                </a>
                <a
                  href="https://codeforces.com/profile/piyush.y276"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 bg-card px-4 py-3.5 transition-colors hover:bg-secondary"
                >
                  <CodeforcesMark size={18} />
                  <div className="min-w-0">
                    <p
                      className="text-[11px] text-muted-foreground"
                      style={MONO}
                    >
                      Codeforces
                    </p>
                    <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      Specialist · 1459
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-widest text-muted-foreground"
          style={MONO}
        >
          SCROLL ↓
        </div>
      </section>

      {/* ── WORK / PROJECTS ── */}
      <section id="work" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal-up mb-12 flex items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs text-primary" style={MONO}>
                01
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-primary/60 to-transparent" />
              <h2 className="text-3xl font-bold tracking-tight" style={DISPLAY}>
                Selected Work
              </h2>
            </div>
            <a
              href="https://github.com/PiyushYadv"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary sm:flex"
            >
              All on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="02" label="Achievements" />
          <Achievements />
          <div className="reveal-up mt-5 flex flex-wrap gap-3">
            {[
              "🏅 Flipkart GRiD 8.0 — Semi-Finalist",
              "⭐ 3-Star coder on CodeChef",
              "💻 1500+ Problems Solved — LeetCode & Codeforces",
              // "🥇 Class Rank 1 — Class X",
            ].map((b) => (
              <span
                key={b}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="03" label="About" />
          <div className="grid gap-12 md:grid-cols-[320px_1fr]">
            <AboutPhoto />
            <div className="reveal-up flex flex-col justify-center space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a final-year Computer Science student who loves
                building resilient systems and clean, user-focused applications.
              </p>
              <p>
                Between shipping features in my internship, optimizing APIs for
                full-stack personal projects, and contributing to my college
                club, I&apos;ve spent the last two years learning how to build
                software that scales. I pick up new concepts fast, ask the hard
                questions, and care about writing code that lasts.
              </p>
              <p>
                When I&apos;m not building projects, you&apos;ll usually find me
                gaming, grinding through tough competitive programming problems,
                or going down a rabbit hole to learn a new skill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="04" label="Experience" />
          <div className="relative space-y-5 md:pl-8">
            <span className="absolute left-[5px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/50 via-border to-transparent md:block" />
            {EXPERIENCE.map((e, i) => (
              <div
                key={i}
                className="reveal-card relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/35"
              >
                <span className="absolute -left-8 top-8 hidden h-3 w-3 rounded-full border-2 border-primary bg-background md:block" />
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3
                      className="font-semibold text-foreground"
                      style={DISPLAY}
                    >
                      {e.role}
                    </h3>
                    <p className="text-sm text-primary">{e.company}</p>
                  </div>
                  <div className="flex flex-col gap-1 sm:items-end">
                    <span
                      className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
                      style={MONO}
                    >
                      {e.type}
                    </span>
                    <span
                      className="flex items-center gap-1 text-[11px] text-muted-foreground"
                      style={MONO}
                    >
                      <Calendar size={11} /> {e.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {e.points.map((pt, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <ChevronRight
                        size={14}
                        className="mt-0.5 flex-shrink-0 text-primary"
                      />{" "}
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="border-t border-border py-[95px]">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="05" label="Education" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EDUCATION.map((ed, i) => (
              <div
                key={i}
                className="reveal-card flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/35"
              >
                <p
                  className="mb-1 font-semibold leading-snug text-foreground"
                  style={DISPLAY}
                >
                  {ed.degree}
                </p>
                <p className="mb-3 text-sm text-primary">{ed.institution}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span
                    className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-muted-foreground"
                    style={MONO}
                  >
                    <Calendar size={10} /> {ed.period}
                  </span>
                  <span
                    className="rounded-full bg-primary/12 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                    style={MONO}
                  >
                    {ed.score}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {ed.details.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight
                        size={13}
                        className="mt-0.5 flex-shrink-0 text-primary"
                      />{" "}
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel n="06" label="Skills" />
          <div className="space-y-6">
            {SKILLS.map((group) => (
              <div
                key={group.category}
                className="reveal-left flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-start sm:gap-8"
              >
                <p
                  className="w-40 flex-shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground"
                  style={MONO}
                >
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p
            className="reveal-up mt-8 text-xs text-muted-foreground"
            style={MONO}
          >
            {"// currently exploring: system design + distributed systems"}
          </p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t border-border py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal-up relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center md:p-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]" />
            <span className="relative text-xs text-primary" style={MONO}>
              07 — Contact
            </span>
            <h2
              className="relative mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl"
              style={DISPLAY}
            >
              Let&apos;s build something worth shipping.
            </h2>
            <p className="relative mx-auto mt-5 max-w-lg text-muted-foreground">
              I&apos;m actively looking for software engineering roles and
              internships. Recruiter, founder, or fellow engineer — my inbox is
              always open.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:iampiyushyadv@gmail.com"
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <Mail size={15} /> iampiyushyadv@gmail.com
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Download size={14} /> Resume
              </a>
            </div>
            <div className="relative mt-7 flex items-center justify-center gap-2.5">
              {socials}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-7">
        <div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-xs text-muted-foreground sm:flex-row"
          style={MONO}
        >
          <span>© 2027 Piyush Yadav · brewed with ☕</span>
          <span>React · GSAP · Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
