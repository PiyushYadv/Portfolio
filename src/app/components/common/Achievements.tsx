// ─── ACHIEVEMENTS (count-up on view) ───────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, DISPLAY, MONO } from "../../data/portfolio";
import gsap from "gsap";

export function Counter({
  to,
  suffix,
  start,
  decimals = 0,
}: {
  to: number;
  suffix: string;
  start: boolean;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) =>
    (decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString()) +
    suffix;
  useEffect(() => {
    if (!start) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration: 1.7,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = fmt(obj.v);
      },
    });
    return () => {
      tween.kill();
    };
  }, [start, to, suffix, decimals]);
  return <span ref={ref}>{fmt(0)}</span>;
}

export function Achievements() {
  const wrap = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ACHIEVEMENTS.map((a) => {
        const Icon = a.icon;
        return (
          <div
            key={a.label}
            className="reveal-card group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/[0.07] blur-xl transition-opacity duration-300 group-hover:bg-primary/15" />
            <Icon size={20} className="mb-4 text-primary" />
            <div
              className="text-4xl font-bold tracking-tight text-foreground"
              style={DISPLAY}
            >
              <Counter
                to={a.value}
                suffix={a.suffix}
                decimals={a.decimals ?? 0}
                start={start}
              />
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">
              {a.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground" style={MONO}>
              {a.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}
