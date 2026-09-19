// ─── ABOUT PHOTO (with fallback) ────────────────────────────────────────────────

import { useState } from "react";
import { DISPLAY, MONO } from "../../data/portfolio";

export function AboutPhoto() {
  const [ok, setOk] = useState(true);
  return (
    <div className="reveal-up relative overflow-hidden rounded-2xl border border-border bg-secondary">
      <div className="relative aspect-[4/5] w-full">
        {ok ? (
          <img
            src="/piyush-photo.jpg"
            alt="Piyush Yadav"
            onError={() => setOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/25 via-card to-card">
            <span
              className="text-6xl font-bold text-primary/70"
              style={DISPLAY}
            >
              PY
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent px-4 pb-4 pt-12">
          <p
            className="text-[11px] leading-relaxed text-muted-foreground"
            style={MONO}
          >
            B.TECH CSE — CLASS OF 2027
          </p>
          <p
            className="text-[11px] leading-relaxed text-muted-foreground"
            style={MONO}
          >
            OPEN TO FULL-TIME ROLES
          </p>
        </div>
      </div>
    </div>
  );
}
