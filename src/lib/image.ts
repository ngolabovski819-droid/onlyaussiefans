const WESERV = 'https://images.weserv.nl/';

function proxyImg(url: string, w: number, h: number): string {
  if (!url || url.startsWith('/')) return url;
  const noScheme = url.replace(/^https?:\/\//, '');
  return `${WESERV}?url=${encodeURIComponent(noScheme)}&w=${w}&h=${h}&fit=cover&output=webp`;
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
  const widths = [240, 360, 480, 720];
  const srcSet = widths
    .map((w) => `${proxyImg(url, w, Math.round((w * 4) / 3))} ${w}w`)
    .join(', ');
  const src = proxyImg(url, 480, 640);
  const sizes =
    '(max-width:480px) calc(50vw - 16px), (max-width:768px) 240px, (max-width:1200px) 320px, 360px';
  return { src, srcSet, sizes };
}
