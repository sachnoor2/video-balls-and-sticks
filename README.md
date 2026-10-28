# Balls and sticks — where `n + r − 1 choose r − 1` comes from

A narrated explainer (English, Kokoro-82M voice `am_michael`) that derives the
stars-and-bars / ball-and-stick formula from scratch, with no formula quoted before it is
earned.

## The argument the video makes

1. **The question.** `n` identical balls, `r` labelled boxes, empty boxes allowed. Count the
   outcomes.
2. **List the smallest case.** Three balls, two boxes: `(3,0) (2,1) (1,2) (0,3)` — four outcomes.
3. **Draw it instead.** Line the balls up and drop one stick in the row. Left of the stick is
   box 1, right of it is box 2. The stick is the wall between boxes.
4. **Empty boxes fall out for free.** Stick at the very start means box 1 is empty; stick at the
   very end means box 2 is empty. One stick, four positions, four outcomes.
5. **Generalise.** `r` boxes need `r − 1` walls, and there are still `n` balls, so the row holds
   `n + r − 1` symbols.
6. **Count arrangements.** Choose which `r − 1` of those positions hold sticks; the rest are
   balls. Hence `C(n + r − 1, r − 1)`, equal to `C(n + r − 1, n)`.
7. **Check.** `3 + 2 − 1 = 4`, `C(4,1) = 4` — matches the hand list. Then `n = 5, r = 3`:
   `C(7,2) = 21`, confirmed by `6 + 5 + 4 + 3 + 2 + 1`.
8. **Caution.** The formula counts *labelled* boxes. Identical boxes would overcount.

## Build

```bash
npm install
pip install kokoro-onnx numpy
curl -L -o kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -L -o voices-v1.0.bin  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
python3 scripts/tts_kokoro.py --model kokoro-v1.0.onnx --voices voices-v1.0.bin
npx tsc --noEmit
npx remotion render src/index.ts BallsAndSticks out/balls-and-sticks.mp4 --gl=swangle
```

Scene length is never typed by hand: `scripts/tts_kokoro.py` speaks each scene, measures the WAV
and writes `frames = round((seconds + pad) * fps)` into `src/manifest.json`, so the animation
always fits the voice.

Rendering happens in GitHub Actions (`.github/workflows/render.yml`), never locally — Remotion's
bundler needs more wasm memory than a chat sandbox gives it.

The narration script lives in `narration.json`; the visuals are `src/scenes.tsx` plus the
ball/stick primitives in `src/components/Balls.tsx`.
