// ─── PROJECT CARD (spotlight + tilt) ──────────────────────────────────────────

import { useRef, useState } from "react";
import { DISPLAY, MONO, PROJECTS } from "../../data/portfolio";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Tag } from "../../App";

export function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
    const rx = (my / r.height - 0.5) * -6;
    const ry = (mx / r.width - 0.5) * 6;
    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="reveal-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/45"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* cover image — only rendered when a cover is provided (drop images in later) */}
      {p.cover && imgOk && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-secondary">
          {p.cover && (
            <img
              src={p.cover}
              alt={p.coverAlt}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <span
            className="absolute right-3 top-3 rounded-md border border-border bg-background/70 px-2 py-0.5 text-[11px] text-muted-foreground backdrop-blur"
            style={MONO}
          >
            {p.year}
          </span>
        </div>
      )}

      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(246,182,76,0.13), transparent 55%)",
        }}
      />

      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3
              className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary"
              style={DISPLAY}
            >
              {p.title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{p.subtitle}</p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            {!p.cover && (
              <span
                className="mr-1 rounded-md border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                style={MONO}
              >
                {p.year}
              </span>
            )}
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Github size={16} />
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="relative mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {p.description}
        </p>

        <div className="relative flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div
          className="relative mt-5 flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary group-hover:opacity-100"
          style={MONO}
        >
          view case study <ArrowUpRight size={13} />
        </div>
      </div>
    </div>
  );
}
