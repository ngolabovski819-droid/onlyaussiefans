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
  const widths = [144, 240, 320, 480, 720];
  const srcSet = widths
    .map((w) => `${proxyImg(url, w, Math.round((w * 4) / 3))} ${w}w`)
    .join(', ');
  const src = proxyImg(url, 320, 427);
  const sizes =
    '(max-width:480px) 144px, (max-width:768px) 240px, (max-width:1200px) 320px, 360px';
  return { src, srcSet, sizes };
}
