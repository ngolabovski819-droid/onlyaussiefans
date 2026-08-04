import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size    = { width: 1200, height: 630 };

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg,#0d0d14 0%,#1c1c2e 100%)',
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'sans-serif', padding: 60,
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, color: '#8888aa', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          🇦🇺 Australia&apos;s #1 OnlyFans Directory
        </div>
        <div style={{
          display: 'flex',
          fontSize: 76, fontWeight: 800,
          background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
          backgroundClip: 'text', color: 'transparent',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textAlign: 'center',
        }}>
          OnlyAussieFans
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#8888aa', textAlign: 'center' }}>
          20,000+ Verified Australian OnlyFans Creators
        </div>
      </div>
    ),
    { ...size }
  );
}
