import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Ball, Boxes, Choose, Row, Stick, Token, UnderBrace } from "./components/Balls";
import { Body, Eyebrow, Formula, Heading, Pill, Rise } from "./components/Bits";
import { inter, lora, theme } from "./theme";

export type SceneProps = { dur: number };

const SLOT = (ball: number) => Math.round(ball * 1.36);
const GROUP = (n: number, ball: number, gap = 8) => n * SLOT(ball) + (n - 1) * gap;

const Column: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <AbsoluteFill
    style={{
      background: theme.bg,
      padding: "72px 96px 104px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      fontFamily: inter,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

const TwoUp: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: string;
}> = ({ left, right, ratio = "1fr 1fr" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 76 }}>
    <div style={{ flex: 1, minWidth: 0 }}>{left}</div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: ratio,
        gap: 20,
        flex: "0 0 auto",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {right}
    </div>
  </div>
);

/* a group of symbols with a brace under it ------------------------- */
const Group: React.FC<{
  tokens: Token[];
  ball: number;
  label: string;
  tone?: string;
  delay?: number;
  numbers?: boolean;
}> = ({ tokens, ball, label, tone, delay = 0, numbers = false }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
    <Row tokens={tokens} ball={ball} delayStep={3} numbers={numbers} />
    <UnderBrace width={GROUP(tokens.length, ball)} label={label} tone={tone} delay={delay} />
  </div>
);

/* ------------------------------------------------------------------ */
/* 01 — title                                                          */
/* ------------------------------------------------------------------ */

export const TitleScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center", textAlign: "center" }}>
    <Rise delay={2}>
      <div
        style={{
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: theme.faint,
        }}
      >
        Combinatorics · counting distributions
      </div>
    </Rise>
    <Rise delay={12}>
      <h1
        style={{
          fontSize: 100,
          fontWeight: 800,
          color: theme.ink,
          letterSpacing: "-0.035em",
          lineHeight: 1.02,
          margin: "26px 0 0",
        }}
      >
        Balls and sticks
      </h1>
    </Rise>
    <Rise delay={22}>
      <div style={{ marginTop: 22, fontFamily: lora, fontSize: 40, color: theme.body }}>
        why the answer is{" "}
        <Choose top="n + r − 1" bottom="r − 1" size={34} color={theme.accent} />
      </div>
    </Rise>
    <div style={{ marginTop: 54 }}>
      <Row
        tokens={["ball", "ball", "ball", "stick", "ball", "ball"]}
        ball={52}
        startDelay={34}
        delayStep={4}
      />
    </div>
    <Rise delay={60}>
      <div style={{ marginTop: 30, fontSize: 26, color: theme.muted }}>
        derived from nothing but a picture
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 02 — the question                                                   */
/* ------------------------------------------------------------------ */

export const ProblemScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>The question</Eyebrow>
          <Heading size={58}>
            n identical balls,
            <br />r different boxes
          </Heading>
          <Body size={32}>
            Every ball goes into one box, and a box may stay empty. Two outcomes differ only when
            some box holds a different number of balls.
          </Body>
          <Rise delay={40}>
            <div style={{ marginTop: 30, display: "flex", gap: 14 }}>
              <Pill tone="accent">balls are identical</Pill>
              <Pill tone="accent">boxes are labelled</Pill>
            </div>
          </Rise>
        </>
      }
      right={
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <Boxes counts={[2, 0, 3]} delay={20} box={118} ballSize={32} />
          <Rise delay={44}>
            <div style={{ fontFamily: lora, fontSize: 30, color: theme.muted }}>(2, 0, 3)</div>
          </Rise>
          <Rise delay={52}>
            <div style={{ fontSize: 22, color: theme.faint }}>one possible outcome</div>
          </Rise>
        </div>
      }
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 03 — the smallest case, listed by hand                              */
/* ------------------------------------------------------------------ */

const CASES: [number, number][] = [
  [3, 0],
  [2, 1],
  [1, 2],
  [0, 3],
];

export const SmallScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>Start small</Eyebrow>
          <Heading size={58}>
            Three balls,
            <br />two boxes
          </Heading>
          <Body size={32}>Just write every outcome down. Nothing clever yet.</Body>
          <Rise delay={52}>
            <div style={{ marginTop: 30 }}>
              <Pill tone="ok">4 outcomes</Pill>
            </div>
          </Rise>
        </>
      }
      right={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: "26px 42px",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {CASES.map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Boxes counts={c} delay={24 + i * 8} box={100} ballSize={28} />
              <div style={{ fontFamily: lora, fontSize: 24, color: theme.muted }}>
                ({c[0]}, {c[1]})
              </div>
            </div>
          ))}
        </div>
      }
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 04 — the same thing, drawn                                          */
/* ------------------------------------------------------------------ */

export const PictureScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center" }}>
    <Eyebrow>Same situation, drawn</Eyebrow>
    <Heading size={60}>One stick is one wall</Heading>
    <Body size={30} style={{ textAlign: "center", maxWidth: 1180 }}>
      Line the balls up. Drop a stick between them. Left of the stick is box one, right of it is
      box two.
    </Body>
    <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 34 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Row tokens={["ball", "ball"]} ball={70} startDelay={30} delayStep={5} />
        <UnderBrace width={GROUP(2, 70)} label="box 1 · 2 balls" delay={44} />
      </div>
      <div style={{ paddingBottom: 46 }}>
        <Stick h={96} delay={38} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Row tokens={["ball"]} ball={70} startDelay={42} delayStep={5} />
        <UnderBrace width={GROUP(1, 70)} label="box 2 · 1 ball" tone={theme.ok} delay={52} />
      </div>
    </div>
    <Rise delay={62}>
      <div style={{ marginTop: 44, fontFamily: lora, fontSize: 32, color: theme.muted }}>
        ●● | ● = (2, 1)
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 05 — every placement of the stick                                   */
/* ------------------------------------------------------------------ */

const PLACEMENTS: { tokens: Token[]; cap: string }[] = [
  { tokens: ["stick", "ball", "ball", "ball"], cap: "(0, 3)" },
  { tokens: ["ball", "stick", "ball", "ball"], cap: "(1, 2)" },
  { tokens: ["ball", "ball", "stick", "ball"], cap: "(2, 1)" },
  { tokens: ["ball", "ball", "ball", "stick"], cap: "(3, 0)" },
];

export const EmptyScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>Every placement</Eyebrow>
          <Heading size={58}>
            The stick may sit
            <br />
            at either end
          </Heading>
          <Body size={31}>
            Stick first and box one is empty. Stick last and box two is empty. Four positions for
            one stick, so four outcomes.
          </Body>
        </>
      }
      right={
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {PLACEMENTS.map((p, i) => (
            <Rise key={i} delay={26 + i * 10}>
              <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
                <Row tokens={p.tokens} ball={42} startDelay={30 + i * 10} delayStep={2} />
                <div style={{ fontFamily: lora, fontSize: 26, color: theme.muted, width: 92 }}>
                  {p.cap}
                </div>
              </div>
            </Rise>
          ))}
        </div>
      }
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 06 — generalise                                                     */
/* ------------------------------------------------------------------ */

export const GeneralScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center" }}>
    <Eyebrow>Generalise the picture</Eyebrow>
    <Heading size={58}>r boxes need r − 1 walls</Heading>
    <Body size={30} style={{ textAlign: "center", maxWidth: 1150 }}>
      Walls between boxes are one fewer than the boxes. The balls are unchanged. So the row holds
      n plus r minus one symbols.
    </Body>
    <div style={{ marginTop: 50, display: "flex", alignItems: "flex-start", gap: 44 }}>
      <Group tokens={["ball", "ball", "ball", "ball", "ball"]} ball={52} label="n balls" delay={28} />
      <div style={{ paddingTop: 34, fontFamily: lora, fontSize: 44, color: theme.faint }}>+</div>
      <Group tokens={["stick", "stick"]} ball={52} label="r − 1 sticks" tone={theme.blockLine} delay={34} />
      <div style={{ paddingTop: 34, fontFamily: lora, fontSize: 44, color: theme.faint }}>=</div>
      <Group
        tokens={["ball", "ball", "stick", "ball", "ball", "stick", "ball"]}
        ball={52}
        label="n + r − 1 positions"
        tone={theme.ink}
        delay={40}
      />
    </div>
    <Rise delay={58}>
      <div style={{ marginTop: 36, fontFamily: lora, fontSize: 32, color: theme.ink }}>
        one row, seven symbols, and the sticks are the walls
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 07 — choose the stick positions                                     */
/* ------------------------------------------------------------------ */

export const ChooseScene: React.FC<SceneProps> = ({ dur }) => {
  const frame = useCurrentFrame();
  const active = Math.min(3, Math.floor((frame / Math.max(1, dur)) * 4));
  return (
    <Column style={{ alignItems: "center" }}>
      <Eyebrow>Count the arrangements</Eyebrow>
      <Heading size={58}>Choose which positions hold sticks</Heading>
      <Body size={30} style={{ textAlign: "center", maxWidth: 1150 }}>
        The row has n plus r minus one positions. Pick r minus one of them for the sticks. Every
        other position must be a ball.
      </Body>
      <div style={{ marginTop: 54 }}>
        <Row
          tokens={["ball", "ball", "ball", "ball"]}
          ball={76}
          startDelay={26}
          delayStep={6}
          numbers
          highlight={[active]}
        />
      </div>
      <Rise delay={48}>
        <div style={{ marginTop: 34, fontSize: 28, color: theme.muted }}>
          one stick, four possible positions
        </div>
      </Rise>
      <Rise delay={58}>
        <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 18 }}>
          <Formula size={34} color={theme.accent}>
            4 positions
          </Formula>
          <Formula size={30} color={theme.faint}>
            →
          </Formula>
          <Choose top="4" bottom="1" size={34} color={theme.accent} />
          <Formula size={34}>= 4</Formula>
        </div>
      </Rise>
    </Column>
  );
};

/* ------------------------------------------------------------------ */
/* 08 — the formula                                                    */
/* ------------------------------------------------------------------ */

export const FormulaScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center", textAlign: "center" }}>
    <Eyebrow>The derivation</Eyebrow>
    <Rise delay={12}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Choose top="n + r − 1" bottom="r − 1" size={72} color={theme.accent} />
        <Formula size={56} color={theme.faint}>
          =
        </Formula>
        <Formula size={72}>number of ways</Formula>
      </div>
    </Rise>
    <Rise delay={34}>
      <div style={{ marginTop: 52, display: "flex", alignItems: "center", gap: 22 }}>
        <Formula size={34} color={theme.muted}>
          or, choosing the balls instead
        </Formula>
        <Choose top="n + r − 1" bottom="n" size={38} color={theme.ink} />
      </div>
    </Rise>
    <Rise delay={48}>
      <div
        style={{
          marginTop: 54,
          maxWidth: 1080,
          fontSize: 28,
          lineHeight: 1.5,
          color: theme.body,
        }}
      >
        Choosing which slots are sticks also decides which slots are balls, so the two forms count
        the same thing.
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 09 — check against the hand list                                    */
/* ------------------------------------------------------------------ */

export const CheckScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>Check it</Eyebrow>
          <Heading size={56}>The formula agrees</Heading>
          <Body size={31}>
            Three balls and two boxes gave four outcomes when we listed them by hand. The formula
            must give four as well.
          </Body>
          <Rise delay={44}>
            <div style={{ marginTop: 28 }}>
              <Pill tone="ok">hand list: 4</Pill>
            </div>
          </Rise>
        </>
      }
      right={
        <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "center" }}>
          <Rise delay={26}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Formula size={40}>3 + 2 − 1</Formula>
              <Formula size={36} color={theme.faint}>
                =
              </Formula>
              <Formula size={40}>4</Formula>
            </div>
          </Rise>
          <Rise delay={38}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Choose top="4" bottom="1" size={40} color={theme.accent} />
              <Formula size={36} color={theme.faint}>
                =
              </Formula>
              <Formula size={40}>4</Formula>
              <Formula size={40} color={theme.ok}>
                ✓
              </Formula>
            </div>
          </Rise>
        </div>
      }
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 10 — a case too big to list                                         */
/* ------------------------------------------------------------------ */

export const BiggerScene: React.FC<SceneProps> = () => (
  <Column>
    <TwoUp
      left={
        <>
          <Eyebrow>Too big to list</Eyebrow>
          <Heading size={56}>
            Five balls,
            <br />
            three boxes
          </Heading>
          <Body size={31}>
            Seven positions, two of them sticks. Seven choose two is twenty one.
          </Body>
        </>
      }
      right={
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
          <Rise delay={24}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Formula size={36}>5 + 3 − 1</Formula>
              <Formula size={32} color={theme.faint}>
                =
              </Formula>
              <Formula size={36}>7</Formula>
            </div>
          </Rise>
          <Rise delay={36}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Choose top="7" bottom="2" size={40} color={theme.accent} />
              <Formula size={32} color={theme.faint}>
                =
              </Formula>
              <Formula size={40} color={theme.accent}>
                21
              </Formula>
            </div>
          </Rise>
          <Rise delay={48}>
            <div style={{ fontFamily: lora, fontSize: 27, color: theme.muted }}>
              6 + 5 + 4 + 3 + 2 + 1 = 21
            </div>
          </Rise>
          <Rise delay={58}>
            <div style={{ fontSize: 21, color: theme.faint }}>counting by the first box agrees</div>
          </Rise>
        </div>
      }
    />
  </Column>
);

/* ------------------------------------------------------------------ */
/* 11 — the caution                                                    */
/* ------------------------------------------------------------------ */

export const PitfallScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center" }}>
    <Eyebrow>One warning</Eyebrow>
    <Heading size={54}>This counts labelled boxes</Heading>
    <div style={{ marginTop: 44, display: "flex", gap: 60, alignItems: "flex-start" }}>
      <Rise delay={22}>
        <div
          style={{
            background: theme.okSoft,
            border: `2px solid #cbe8d9`,
            borderRadius: 22,
            padding: "30px 34px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: theme.ok }}>labelled boxes</div>
          <div style={{ display: "flex", gap: 12 }}>
            <Boxes counts={[2, 1]} box={82} ballSize={22} delay={30} />
            <Boxes counts={[1, 2]} box={82} ballSize={22} delay={34} />
          </div>
          <div style={{ fontFamily: lora, fontSize: 25, color: theme.ok }}>
            (2, 1) and (1, 2) differ
          </div>
        </div>
      </Rise>
      <Rise delay={34}>
        <div
          style={{
            background: theme.badSoft,
            border: `2px solid #f6d6c6`,
            borderRadius: 22,
            padding: "30px 34px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: theme.bad }}>identical boxes</div>
          <div style={{ display: "flex", gap: 12 }}>
            <Boxes counts={[3, 0]} box={82} ballSize={22} delay={42} />
            <Boxes counts={[2, 1]} box={82} ballSize={22} delay={46} />
          </div>
          <div style={{ fontFamily: lora, fontSize: 25, color: theme.bad }}>
            only 2 outcomes — the formula overcounts
          </div>
        </div>
      </Rise>
    </div>
    <Rise delay={56}>
      <div style={{ marginTop: 40, fontSize: 27, color: theme.body, maxWidth: 1100, textAlign: "center" }}>
        Identical boxes would need a different method. Balls and sticks assumes every box has a
        name.
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */
/* 12 — recap                                                          */
/* ------------------------------------------------------------------ */

export const RecapScene: React.FC<SceneProps> = () => (
  <Column style={{ alignItems: "center", textAlign: "center" }}>
    <Eyebrow>Recap</Eyebrow>
    <div style={{ marginTop: 10 }}>
      <Row
        tokens={["ball", "ball", "stick", "ball", "ball", "stick", "ball"]}
        ball={54}
        startDelay={14}
        delayStep={4}
      />
    </div>
    <Rise delay={34}>
      <div style={{ marginTop: 34, fontSize: 32, color: theme.body }}>
        n balls, r − 1 sticks, n + r − 1 positions
      </div>
    </Rise>
    <Rise delay={44}>
      <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 22 }}>
        <Choose top="n + r − 1" bottom="r − 1" size={62} color={theme.accent} />
        <Formula size={40} color={theme.muted}>
          choose where the sticks go
        </Formula>
      </div>
    </Rise>
  </Column>
);

/* ------------------------------------------------------------------ */

export const SCENES: Record<string, React.FC<SceneProps>> = {
  "01-title": TitleScene,
  "02-problem": ProblemScene,
  "03-small": SmallScene,
  "04-picture": PictureScene,
  "05-empty": EmptyScene,
  "06-general": GeneralScene,
  "07-choose": ChooseScene,
  "08-formula": FormulaScene,
  "09-check": CheckScene,
  "10-bigger": BiggerScene,
  "11-pitfall": PitfallScene,
  "12-recap": RecapScene,
};
