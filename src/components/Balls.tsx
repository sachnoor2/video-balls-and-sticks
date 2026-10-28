import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { inter, lora, theme } from "../theme";

/* ------------------------------------------------------------------ */
/* primitives: a ball and a stick                                      */
/* ------------------------------------------------------------------ */

export type Token = "ball" | "stick";

export const Ball: React.FC<{
  size?: number;
  delay?: number;
  tone?: "solid" | "muted";
}> = ({ size = 64, delay = 0, tone = "solid" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.6 },
    durationInFrames: 16,
  });
  const bg =
    tone === "solid"
      ? `radial-gradient(circle at 34% 28%, #8e88f2 0%, ${theme.accent} 48%, #3730a3 100%)`
      : "radial-gradient(circle at 34% 28%, #e9e4d6 0%, #cfc8b6 60%, #b8b09c 100%)";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        opacity: Math.min(1, p * 1.2),
        transform: `scale(${0.45 + 0.55 * p})`,
        boxShadow: tone === "solid" ? "0 6px 16px rgba(79,70,229,0.26)" : "none",
        flex: "0 0 auto",
      }}
    />
  );
};

export const Stick: React.FC<{ h?: number; delay?: number; tone?: "solid" | "muted" }> = ({
  h = 80,
  delay = 0,
  tone = "solid",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, mass: 0.6 },
    durationInFrames: 16,
  });
  return (
    <div
      style={{
        width: Math.max(9, Math.round(h * 0.15)),
        height: h * (0.6 + 0.4 * p),
        borderRadius: 999,
        background:
          tone === "solid"
            ? `linear-gradient(180deg, #f0b96a 0%, #d9973c 100%)`
            : "#cdc5b2",
        opacity: Math.min(1, p * 1.2),
        boxShadow: tone === "solid" ? "0 4px 12px rgba(217,151,60,0.3)" : "none",
        flex: "0 0 auto",
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/* a row of symbols in fixed slots, so positions can be counted        */
/* ------------------------------------------------------------------ */

export const Row: React.FC<{
  tokens: Token[];
  ball?: number;
  gap?: number;
  highlight?: number[];
  startDelay?: number;
  delayStep?: number;
  numbers?: boolean;
  highlightColor?: string;
}> = ({
  tokens,
  ball = 66,
  gap = 8,
  highlight = [],
  startDelay = 0,
  delayStep = 4,
  numbers = false,
  highlightColor = theme.accent,
}) => {
  const slotW = Math.round(ball * 1.36);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap }}>
        {tokens.map((t, i) => (
          <div
            key={i}
            style={{
              width: slotW,
              height: Math.round(ball * 1.6),
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {highlight.includes(i) ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 14,
                  background: "rgba(79,70,229,0.09)",
                  border: `3px solid ${highlightColor}`,
                }}
              />
            ) : null}
            {t === "ball" ? (
              <Ball size={ball} delay={startDelay + i * delayStep} />
            ) : (
              <Stick h={Math.round(ball * 1.28)} delay={startDelay + i * delayStep} />
            )}
          </div>
        ))}
      </div>
      {numbers ? (
        <div style={{ display: "flex", justifyContent: "center", gap }}>
          {tokens.map((_, i) => (
            <div
              key={i}
              style={{
                width: slotW,
                textAlign: "center",
                fontFamily: inter,
                fontSize: 19,
                fontWeight: 700,
                color: highlight.includes(i) ? highlightColor : theme.faint,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* a brace under a span, to label "n balls"                            */
/* ------------------------------------------------------------------ */

export const UnderBrace: React.FC<{
  width: number;
  label: string;
  tone?: string;
  delay?: number;
}> = ({ width, label, tone = theme.accent, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 16 });
  return (
    <div style={{ width, display: "flex", flexDirection: "column", alignItems: "center", opacity: p }}>
      <div
        style={{
          width: "100%",
          height: 13,
          borderLeft: `2px solid ${tone}`,
          borderRight: `2px solid ${tone}`,
          borderBottom: `2px solid ${tone}`,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
        }}
      />
      <div
        style={{
          marginTop: 8,
          fontFamily: inter,
          fontSize: 22,
          fontWeight: 700,
          color: tone,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* boxes, for the hand-listed outcomes                                 */
/* ------------------------------------------------------------------ */

export const Boxes: React.FC<{
  counts: number[];
  box?: number;
  ballSize?: number;
  delay?: number;
  captions?: string[];
}> = ({ counts, box = 108, ballSize = 30, delay = 0, captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 16 });
  return (
    <div style={{ display: "flex", gap: 14, opacity: p, transform: `translateY(${(1 - p) * 12}px)` }}>
      {counts.map((c, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: box,
              height: box,
              borderRadius: 14,
              border: `2px solid ${theme.line}`,
              background: theme.card,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: 9,
              boxSizing: "border-box",
            }}
          >
            {Array.from({ length: c }, (_, j) => (
              <div
                key={j}
                style={{
                  width: ballSize,
                  height: ballSize,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 34% 28%, #8e88f2 0%, ${theme.accent} 50%, #3730a3 100%)`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: theme.faint,
            }}
          >
            {captions ? captions[i] : `box ${i + 1}`}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* a proper binomial, stacked                                          */
/* ------------------------------------------------------------------ */

export const Choose: React.FC<{
  top: React.ReactNode;
  bottom: React.ReactNode;
  size?: number;
  color?: string;
}> = ({ top, bottom, size = 44, color = theme.ink }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      fontFamily: lora,
      color,
      fontSize: size,
      fontWeight: 500,
    }}
  >
    <span style={{ fontSize: size * 1.45, fontWeight: 400, lineHeight: 1 }}>(</span>
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1.1,
        padding: "0 3px",
        whiteSpace: "nowrap",
      }}
    >
      <span>{top}</span>
      <span>{bottom}</span>
    </span>
    <span style={{ fontSize: size * 1.45, fontWeight: 400, lineHeight: 1 }}>)</span>
  </span>
);
