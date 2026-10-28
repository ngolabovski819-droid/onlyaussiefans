'use client';

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface Props {
  word: string;
  /** Tracked outbound link, identical to the card's overlay link. */
  href: string;
  creatorName: string;
  username: string;
  /** The card's name, handle and price rows; the box fills the blank space beside them. */
  children: ReactNode;
}

type Stage = 'hidden' | 'revealing' | 'revealed';
type RevealMethod = 'scratch' | 'tap' | 'keyboard';

/** Scratch brush diameter in CSS pixels. */
const BRUSH_SIZE = 14;
/** Share of the foil scratched away before the rest clears itself. */
const AUTO_REVEAL_SHARE = 0.65;
/** Pointer travel (px) that still counts as a tap rather than a scratch. */
const TAP_SLOP = 6;
/** Keep in sync with the secret-word-wipe animation in globals.css. */
const WIPE_MS = 450;

/** Holographic foil sized to the canvas box; returns the context to scratch on. */
function paintFoil(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const metal = context.createLinearGradient(0, 0, width, height);
  metal.addColorStop(0, '#c9c3d9');
  metal.addColorStop(0.3, '#f4f1fa');
  metal.addColorStop(0.55, '#b4adc6');
  metal.addColorStop(0.8, '#ebe7f3');
  metal.addColorStop(1, '#bdb6cd');
  context.fillStyle = metal;
  context.fillRect(0, 0, width, height);

  const holo = context.createLinearGradient(0, height, width, 0);
  holo.addColorStop(0, 'rgba(236, 72, 153, 0.28)');
  holo.addColorStop(0.5, 'rgba(124, 58, 237, 0.12)');
  holo.addColorStop(1, 'rgba(56, 189, 248, 0.24)');
  context.fillStyle = holo;
  context.fillRect(0, 0, width, height);

  // Fine grain so it reads as foil rather than a flat button.
  for (let i = 0; i < (width * height) / 14; i += 1) {
    context.fillStyle = Math.random() < 0.5 ? 'rgba(255, 255, 255, 0.55)' : 'rgba(46, 36, 72, 0.14)';
    context.fillRect(Math.random() * width, Math.random() * height, 1, 1);
  }
  return context;
}

function scratchedShare(context: CanvasRenderingContext2D): number {
  const { width, height } = context.canvas;
  if (!width || !height) return 0;
  const { data } = context.getImageData(0, 0, width, height);
  let cleared = 0;
  let sampled = 0;
  // Every 16th pixel's alpha is plenty to estimate coverage on a strip this small.
  for (let alpha = 3; alpha < data.length; alpha += 64) {
    sampled += 1;
    if (data[alpha] < 128) cleared += 1;
  }
  return cleared / sampled;
}

/** "Sarah Wylde 💌" → "Sarah". Empty when the display name has no Latin letters. */
function firstName(name: string): string {
  return name.replace(/[^A-Za-zÀ-ɏ\s'-]/g, '').trim().split(/\s+/)[0];
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function SecretWordReveal({ word, href, creatorName, username, children }: Props) {
  const [stage, setStage] = useState<Stage>('hidden');
  const [foilReady, setFoilReady] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);
  const gestureRef = useRef<{ x: number; y: number; travel: number; moves: number } | null>(null);
  const scratchedRef = useRef(false);
  const ignoreClickRef = useRef(false);
  const revealStartedRef = useRef(false);
  const focusCopyRef = useRef(false);
  const name = firstName(creatorName) || username;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (stage !== 'hidden' || !canvas) return;
    let paintedSize = '';
    // Fires once on observe, then again whenever the card width changes.
    const observer = new ResizeObserver(() => {
      const size = `${canvas.clientWidth}x${canvas.clientHeight}`;
      if (size === paintedSize) return;
      paintedSize = size;
      const context = contextRef.current;
      if (context && scratchedRef.current) {
        // Repainting would wipe the visitor's progress: let the bitmap stretch and remap pointer coordinates instead.
        context.setTransform(canvas.width / canvas.clientWidth, 0, 0, canvas.height / canvas.clientHeight, 0, 0);
        return;
      }
      contextRef.current = paintFoil(canvas);
      setFoilReady(true);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [stage]);

  useEffect(() => {
    if (stage !== 'revealing') return;
    const timer = window.setTimeout(() => setStage('revealed'), WIPE_MS);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === 'revealed' && focusCopyRef.current) {
      focusCopyRef.current = false;
      copyRef.current?.focus();
    }
  }, [stage]);

  const reveal = (method: RevealMethod) => {
    if (revealStartedRef.current) return;
    revealStartedRef.current = true;
    focusCopyRef.current = method === 'keyboard';
    sendGAEvent('event', 'secret_word_reveal', { creator: username, method });
    setStage(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'revealed' : 'revealing');
  };

  const pointFrom = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (stage !== 'hidden' || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = { ...pointFrom(event), travel: 0, moves: 0 };
    ignoreClickRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const gesture = gestureRef.current;
    const context = contextRef.current;
    if (!gesture || !context || stage !== 'hidden') return;
    const point = pointFrom(event);
    context.globalCompositeOperation = 'destination-out';
    context.lineWidth = BRUSH_SIZE;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(gesture.x, gesture.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    gesture.travel += Math.hypot(point.x - gesture.x, point.y - gesture.y);
    gesture.x = point.x;
    gesture.y = point.y;
    gesture.moves += 1;
    if (gesture.travel > TAP_SLOP && !ignoreClickRef.current) {
      ignoreClickRef.current = true;
      scratchedRef.current = true;
      setScratched(true);
    }
    // Let the foil give way mid-stroke once enough is gone.
    if (gesture.moves % 6 === 0 && scratchedShare(context) >= AUTO_REVEAL_SHARE) reveal('scratch');
  };

  const handlePointerEnd = () => {
    if (!gestureRef.current) return;
    gestureRef.current = null;
    const context = contextRef.current;
    if (ignoreClickRef.current && context && scratchedShare(context) >= AUTO_REVEAL_SHARE) reveal('scratch');
  };

  const handleFoilClick = (event: MouseEvent<HTMLButtonElement>) => {
    // A mouse scratch ends in a click too; only taps and keyboard presses reveal outright.
    if (event.detail !== 0 && ignoreClickRef.current) {
      ignoreClickRef.current = false;
      return;
    }
    reveal(event.detail === 0 ? 'keyboard' : 'tap');
  };

  const copyWord = async (): Promise<boolean> => {
    const ok = await writeClipboard(word);
    if (ok) setCopied(true);
    return ok;
  };

  const handleCopy = async () => {
    sendGAEvent('event', 'secret_word_copy', { creator: username });
    if (await copyWord()) return;
    // Clipboard blocked (some in-app browsers): select the word so the native copy menu works.
    const selection = window.getSelection();
    if (selection && wordRef.current) selection.selectAllChildren(wordRef.current);
  };

  const handleCtaClick = () => {
    sendGAEvent('event', 'secret_word_cta', { creator: username, revealed: stage !== 'hidden' });
    // Revealed visitors leave with the word on their clipboard, ready to paste into the DM.
    if (stage !== 'hidden') void copyWord();
  };

  return (
    <div className="secret-word" data-stage={stage}>
      <div className="secret-word-top">
        <div className="secret-word-info">{children}</div>
        <div className="secret-word-panel">
          <div className="secret-word-box">
            <span className="secret-word-label">Secret word</span>
            <div className="secret-word-row">
              <span ref={wordRef} className="secret-word-text" aria-hidden={stage === 'revealed' ? undefined : true}>
                {word}
              </span>
              {stage === 'revealed' ? (
                <button
                  ref={copyRef}
                  type="button"
                  className="secret-word-copy"
                  data-copied={copied || undefined}
                  aria-label={copied ? 'Copied' : 'Copy secret word'}
                  onClick={handleCopy}
                >
                  {/* Icon-only on narrow cards, text label once there's room */}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    {copied ? (
                      <path d="M3.5 8.5l3 3 6-7" />
                    ) : (
                      <>
                        <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                        <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
                      </>
                    )}
                  </svg>
                  <span className="secret-word-copy-text" aria-hidden="true">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="secret-word-foil"
                  data-ready={foilReady || undefined}
                  data-scratched={scratched || undefined}
                  data-leaving={stage === 'revealing' || undefined}
                  aria-label={`Reveal ${name}'s secret word`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  onClick={handleFoilClick}
                >
                  <canvas ref={canvasRef} aria-hidden="true" />
                  <span className="secret-word-foil-coin" aria-hidden="true" />
                  <span className="secret-word-foil-label" aria-hidden="true">
                    <span>Scratch<span className="secret-word-foil-more"> to reveal</span></span>
                  </span>
                </button>
              )}
            </div>
            <span className="sr-only" aria-live="polite">
              {stage === 'revealed' ? `Secret word: ${word}` : ''}
            </span>
          </div>
        </div>
      </div>
      <p className="secret-word-hint">
        <span aria-hidden="true">🎁</span> Visit the link below &amp; DM {name} the welcome word for a spicy gift
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener nofollow sponsored"
        className="creator-view-btn secret-word-cta"
        onClick={handleCtaClick}
      >
        View on OnlyFans <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
