import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Download,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import {
  ABOUT,
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  FOOTER,
  NAV_ITEMS,
  PROFILE,
  PROJECTS,
  RESUME_URL,
  SECTION_HEADINGS,
  SKILLS,
  STATS,
  UI_TEXT,
  // ACHIEVEMENTS,
} from "./data/portfolio";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function useScrambleText(target: string, duration = 1200) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);

  const run = () => {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolved = Math.floor(progress * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < resolved) {
          out += target[i];
        } else if (target[i] === " ") {
          out += " ";
        } else {
          out +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const t = setTimeout(run, 300);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return display;
}

function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", {
      duration: 0.28,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(ring, "y", {
      duration: 0.28,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.25 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const cursorTargets = Array.from(
      document.querySelectorAll("a, button, [data-cursor]"),
    );

    document.addEventListener("mousemove", onMove);
    cursorTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cursorTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60"
        style={{ willChange: "transform" }}
      />
    </>
  );
}

function CountUp({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  const formatValue = (n: number) =>
    decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toString();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;

        gsap.to(
          { v: 0 },
          {
            v: value,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = formatValue(this.targets()[0].v) + suffix;
            },
            onComplete: () => {
              el.textContent = formatValue(value) + suffix;
            },
          },
        );
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix, decimals]);

  return <span ref={ref}>{formatValue(0)}{suffix}</span>;
}

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const DISPLAY: React.CSSProperties = {
  fontFamily: "'Archivo Black', sans-serif",
  lineHeight: 0.92,
};

export default function App() {
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const heroName = useScrambleText(PROFILE.name, 900);
  const heroRole = useScrambleText(PROFILE.role, 1200);
  const emailHref = `mailto:${PROFILE.social.email}`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );

      gsap.fromTo(
        [subtitleRef.current, heroMetaRef.current, heroCTARef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.9,
        },
      );

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { clipPath: "inset(0 100% 0 0)", y: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            duration: 1.1,
            ease: "power4.inOut",
            delay: 0.5,
          },
        );
      }

      gsap.set(".reveal-up", { y: 48, opacity: 0 });
      gsap.set(".project-row", { x: -30, opacity: 0 });
      gsap.set(".exp-row", { x: 30, opacity: 0 });
      gsap.set(".skill-cell", { scale: 0.88, opacity: 0 });
      gsap.set(".edu-card", { y: 36, opacity: 0 });

      ScrollTrigger.batch(".reveal-up", {
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
          }),
        start: "top 88%",
        once: true,
      });

      ScrollTrigger.batch(".project-row", {
        onEnter: (els) =>
          gsap.to(els, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          }),
        start: "top 90%",
        once: true,
      });

      ScrollTrigger.batch(".exp-row", {
        onEnter: (els) =>
          gsap.to(els, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
          }),
        start: "top 90%",
        once: true,
      });

      ScrollTrigger.batch(".skill-cell", {
        onEnter: (els) =>
          gsap.to(els, {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: "back.out(1.5)",
            stagger: 0.04,
          }),
        start: "top 88%",
        once: true,
      });

      ScrollTrigger.batch(".edu-card", {
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.18,
          }),
        start: "top 88%",
        once: true,
      });

      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor:
                self.progress > 0.01 ? "rgba(12,12,12,0.95)" : "transparent",
              backdropFilter: self.progress > 0.01 ? "blur(12px)" : "none",
              duration: 0.3,
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 72 },
        duration: 0.9,
        ease: "power3.inOut",
      });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif", cursor: "none" }}
    >
      <CursorFollower />

      {/* NAV */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 opacity-0 md:px-16"
      >
        <button
          className="font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          style={MONO}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {PROFILE.navBrand}
        </button>
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              style={MONO}
            >
              {s}
            </button>
          ))}
        </div>
        <a
          href={RESUME_URL}
          download
          className="flex items-center gap-1.5 border border-primary/40 px-3 py-1.5 text-[11px] font-mono tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          style={MONO}
        >
          <Download size={11} />
          {UI_TEXT.navResume}
        </a>
      </nav>

      {/* HERO */}
      <section
        className="relative flex min-h-screen flex-col justify-end px-6 pb-20 pt-32 md:px-16 lg:px-24"
        id="hero"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#b6ff00 1px, transparent 1px), linear-gradient(90deg, #b6ff00 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div
          className="absolute top-28 right-6 md:right-16 lg:right-24 flex flex-col items-end gap-1 opacity-0"
          ref={heroMetaRef}
        >
          <span
            className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground"
            style={MONO}
          >
            {PROFILE.heroMeta[0]}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground"
            style={MONO}
          >
            {PROFILE.heroMeta[1]}
          </span>
        </div>

        <div className="relative z-10 max-w-6xl">
          <p
            ref={subtitleRef}
            className="mb-6 font-mono text-xs tracking-[0.3em] text-primary opacity-0"
            style={MONO}
          >
            {PROFILE.portfolioLabel}
          </p>

          <h1
            ref={titleRef}
            className="mb-2 block overflow-hidden tracking-tight text-foreground"
            style={{
              ...DISPLAY,
              clipPath: "inset(0 100% 0 0)",
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              willChange: "clip-path",
            }}
          >
            {heroName}
          </h1>

          <p
            className="mb-12 font-mono tracking-widest text-muted-foreground"
            style={{ ...MONO, fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)" }}
          >
            {heroRole}
          </p>

          <div
            ref={heroCTARef}
            className="flex flex-wrap items-center gap-4 opacity-0"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group flex items-center gap-3 bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary/80"
            >
              {UI_TEXT.primaryCta}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <a
              href={RESUME_URL}
              download
              className="group flex items-center gap-2 border border-border px-7 py-3.5 text-sm font-mono tracking-wide text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-200"
              style={MONO}
            >
              <Download size={14} />
              {UI_TEXT.secondaryCta}
            </a>
            <div className="flex items-center gap-4 ml-2">
              <a
                href={PROFILE.social.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={emailHref}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 md:right-16 flex flex-col items-center gap-2 opacity-40">
          <span
            className="font-mono text-[9px] tracking-[0.3em] rotate-90 text-muted-foreground"
            style={MONO}
          >
            {UI_TEXT.scrollHint}
          </span>
          <div className="h-12 w-px bg-muted-foreground/40" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border py-12 px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="reveal-up">
              <p
                className="text-4xl font-black leading-none text-primary mb-1"
                style={DISPLAY}
              >
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p
                className="font-mono text-[10px] tracking-widest text-muted-foreground"
                style={MONO}
              >
                {s.label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-24 px-6 md:px-16 lg:px-24 border-t border-border"
      >
        <div className="grid max-w-6xl gap-16 md:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] md:items-start">
          <div>
            <p
              className="mb-3 font-mono text-xs tracking-[0.3em] text-primary reveal-up"
              style={MONO}
            >
              {ABOUT.eyebrow}
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight mb-8 reveal-up"
              style={DISPLAY}
            >
              {ABOUT.title}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed reveal-up">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative h-[420px] max-h-[90vh] w-full overflow-hidden bg-card reveal-up md:h-[520px]">
            <img
              src={PROFILE.image.src}
              alt={PROFILE.image.alt}
              className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1">
              <p
                className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground"
                style={MONO}
              >
                {PROFILE.image.meta[0]}
              </p>
              <p
                className="font-mono text-[10px] tracking-[0.25em] text-primary"
                style={MONO}
              >
                {PROFILE.image.meta[1]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 md:px-16 lg:px-24">
        <div className="mb-14 flex items-end justify-between reveal-up">
          <div>
            <p
              className="mb-2 font-mono text-xs tracking-[0.3em] text-primary"
              style={MONO}
            >
              {SECTION_HEADINGS.projects.eyebrow}
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={DISPLAY}
            >
              {SECTION_HEADINGS.projects.title}
            </h2>
          </div>
          <a
            href={PROFILE.social.github}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            style={MONO}
          >
            {SECTION_HEADINGS.projects.githubLabel} <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="divide-y divide-border">
          {PROJECTS.map((p) => (
            <div
              key={p.index}
              className="project-row group grid grid-cols-1 md:grid-cols-[72px_1fr_auto] gap-4 md:gap-8 py-8 cursor-pointer"
              data-cursor
            >
              <span
                className="font-mono text-xs text-muted-foreground self-start pt-1"
                style={MONO}
              >
                {p.index}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3
                    className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-200"
                    style={DISPLAY}
                  >
                    {p.title}
                  </h3>
                  <span
                    className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground border border-border px-2 py-0.5"
                    style={MONO}
                  >
                    {p.year}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-widest text-primary/80 border border-primary/20 px-2 py-0.5 bg-primary/5"
                      style={MONO}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title={UI_TEXT.projectGithubTitle}
                >
                  <Github size={15} />
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-200"
                    title={UI_TEXT.projectLiveTitle}
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="py-24 px-6 md:px-16 lg:px-24 border-t border-border"
      >
        <p
          className="mb-3 font-mono text-xs tracking-[0.3em] text-primary reveal-up"
          style={MONO}
        >
          {SECTION_HEADINGS.experience.eyebrow}
        </p>
        <h2
          className="text-4xl md:text-5xl font-black leading-tight mb-14 reveal-up"
          style={DISPLAY}
        >
          {SECTION_HEADINGS.experience.title}
        </h2>

        <div className="space-y-0 divide-y divide-border">
          {EXPERIENCE.map((e, i) => (
            <div
              key={i}
              className="exp-row grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 py-10"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase size={13} className="text-primary flex-shrink-0" />
                  <span
                    className="font-mono text-[10px] tracking-widest text-primary uppercase"
                    style={MONO}
                  >
                    {e.type}
                  </span>
                </div>
                <p className="text-base font-medium text-foreground leading-snug">
                  {e.company}
                </p>
                <p
                  className="font-mono text-xs text-muted-foreground"
                  style={MONO}
                >
                  {e.period}
                </p>
              </div>
              <div>
                <h3
                  className="text-lg font-black mb-4 text-foreground"
                  style={DISPLAY}
                >
                  {e.role}
                </h3>
                <ul className="space-y-2.5">
                  {e.points.map((pt, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-2 h-px w-4 bg-primary/50 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        className="py-24 px-6 md:px-16 lg:px-24 border-t border-border"
      >
        <p
          className="mb-3 font-mono text-xs tracking-[0.3em] text-primary reveal-up"
          style={MONO}
        >
          {SECTION_HEADINGS.education.eyebrow}
        </p>
        <h2
          className="text-4xl md:text-5xl font-black leading-tight mb-14 reveal-up"
          style={DISPLAY}
        >
          {SECTION_HEADINGS.education.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((ed, i) => (
            <div
              key={i}
              className="edu-card border border-border p-8 bg-card hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <GraduationCap
                  size={20}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <span
                  className="font-mono text-[10px] tracking-widest text-muted-foreground ml-auto"
                  style={MONO}
                >
                  {ed.period}
                </span>
              </div>
              <h3
                className="text-lg font-black leading-snug mb-1 text-foreground"
                style={DISPLAY}
              >
                {ed.degree}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {ed.institution}
              </p>
              <div className="flex items-center gap-2 mb-5">
                <Award size={12} className="text-primary" />
                <span className="font-mono text-xs text-primary" style={MONO}>
                  {ed.gpa}
                </span>
              </div>
              {ed.highlights.length > 0 && (
                <ul className="space-y-1.5">
                  {ed.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="h-px w-3 bg-primary/40 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/*
      Future section: uncomment ACHIEVEMENTS in the import above, the data in
      portfolio.ts, and the nav item when you have 3-5 strong achievements.

      <section
        id="achievements"
        className="py-24 px-6 md:px-16 lg:px-24 border-t border-border"
      >
        <p
          className="mb-3 font-mono text-xs tracking-[0.3em] text-primary reveal-up"
          style={MONO}
        >
          {SECTION_HEADINGS.achievements.eyebrow}
        </p>
        <h2
          className="text-4xl md:text-5xl font-black leading-tight mb-14 reveal-up"
          style={DISPLAY}
        >
          {SECTION_HEADINGS.achievements.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={`${achievement.title}-${achievement.year}`}
              className="reveal-up border border-border p-7 bg-card hover:border-primary/30 transition-colors duration-300"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <Award size={18} className="text-primary flex-shrink-0" />
                <span
                  className="font-mono text-[10px] tracking-widest text-muted-foreground"
                  style={MONO}
                >
                  {achievement.year}
                </span>
              </div>
              <h3
                className="text-lg font-black leading-snug mb-2 text-foreground"
                style={DISPLAY}
              >
                {achievement.title}
              </h3>
              <p className="text-sm text-primary mb-4">
                {achievement.organization}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      */}

      {/* SKILLS */}
      <section
        id="skills"
        className="py-24 px-6 md:px-16 lg:px-24 border-t border-border"
      >
        <p
          className="mb-3 font-mono text-xs tracking-[0.3em] text-primary reveal-up"
          style={MONO}
        >
          {SECTION_HEADINGS.skills.eyebrow}
        </p>
        <h2
          className="text-4xl md:text-5xl font-black leading-tight mb-14 reveal-up"
          style={DISPLAY}
        >
          {SECTION_HEADINGS.skills.title}
        </h2>

        <div
          ref={skillsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {SKILLS.map((group) => (
            <div key={group.category} className="skill-cell space-y-4">
              <p
                className="font-mono text-[10px] tracking-[0.25em] text-primary border-b border-primary/20 pb-3"
                style={MONO}
              >
                {group.category.toUpperCase()}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="h-px w-3 bg-primary/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-32 px-6 md:px-16 lg:px-24 border-t border-border"
      >
        <div className="max-w-4xl">
          <p
            className="mb-3 font-mono text-xs tracking-[0.3em] text-primary reveal-up"
            style={MONO}
          >
            {CONTACT.eyebrow}
          </p>
          <h2
            className="font-black leading-none tracking-tight text-foreground mb-8 reveal-up"
            style={{ ...DISPLAY, fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            {CONTACT.title}
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-12 reveal-up">
            {CONTACT.description}
          </p>
          <div className="flex flex-wrap gap-4 reveal-up">
            <a
              href={emailHref}
              className="group flex items-center gap-3 border border-primary px-8 py-4 text-sm font-mono tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              style={MONO}
            >
              {PROFILE.social.email}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={RESUME_URL}
              download
              className="flex items-center gap-3 border border-border px-8 py-4 text-sm font-mono tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200"
              style={MONO}
            >
              <Download size={14} />
              {UI_TEXT.contactResume}
            </a>
            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border border-border px-8 py-4 text-sm font-mono tracking-widest text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-200"
              style={MONO}
            >
              <Linkedin size={14} />
              {UI_TEXT.linkedinLabel}
            </a>
            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border border-border px-8 py-4 text-sm font-mono tracking-widest text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-200"
              style={MONO}
            >
              <Github size={14} />
              {UI_TEXT.githubLabel}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span
          className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground"
          style={MONO}
        >
          © {new Date().getFullYear()} {PROFILE.name.toUpperCase()} —{" "}
          {FOOTER.suffix}
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground"
          style={MONO}
        >
          {FOOTER.credit}
        </span>
      </footer>
    </div>
  );
}
