// Must match `images.qualities` in next.config.ts. Changing it re-bills every cached photo.
const IMAGE_QUALITY = 75;

// Vercel bills one transformation per unique (source image, width, quality, format), so every
// width here is one more billed copy of every creator photo. 360 (1x) and 720 (2x / phones)
// cover a card slot that never renders wider than 360 CSS px (see `sizes` below).
const SRCSET_WIDTHS = [360, 720] as const;

// Must be one of SRCSET_WIDTHS, or it becomes an extra billed width for browsers that use `src`.
const DEFAULT_WIDTH = 360;

/**
 * Keep the original URL for next/image, which applies its own optimizer.
 * Plain img callers pass a width to opt into that same optimizer explicitly.
 */
export function buildImageUrl(url: string, width?: number): string {
  if (!url || url.startsWith('/') || width === undefined) return url;
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${IMAGE_QUALITY}`;
}

export function proxyImg(url: string, w: number, h: number): string {
  void h; // Retained for compatibility; Next.js preserves aspect ratio itself.
  return buildImageUrl(url, w);
}

export interface SrcsetData {
  src: string;
  srcSet: string;
  sizes: string;
}

export function buildSrcset(url: string | null | undefined): SrcsetData {
  if (!url) {
    return { src: '/no-image.png', srcSet: '', sizes: '' };
  }
  if (url.startsWith('/')) {
    return { src: url, srcSet: '', sizes: '' };
  }
  const srcSet = SRCSET_WIDTHS
    .map((w) => `${proxyImg(url, w, Math.round((w * 4) / 3))} ${w}w`)
    .join(', ');
  const src = proxyImg(url, DEFAULT_WIDTH, Math.round((DEFAULT_WIDTH * 4) / 3));
  const sizes =
    '(max-width:480px) 50vw, (max-width:768px) 240px, (max-width:1200px) 320px, 360px';
  return { src, srcSet, sizes };
}
