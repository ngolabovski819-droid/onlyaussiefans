const IMAGE_QUALITY = 75;
const SRCSET_WIDTHS = [240, 360, 480, 720] as const;

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
  const src = proxyImg(url, 480, 640);
  const sizes =
    '(max-width:480px) calc(50vw - 16px), (max-width:768px) 240px, (max-width:1200px) 320px, 360px';
  return { src, srcSet, sizes };
}
