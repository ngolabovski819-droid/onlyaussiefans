import { ImageResponse } from 'next/og';
import { getCategoryBySlug } from '@/config/categories';

export const runtime = 'edge';
export const size    = { width: 1200, height: 630 };

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  const label = cat?.label ?? slug;

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
        <div style={{ fontSize: 24, color: '#8888aa', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          🇦🇺  OnlyAussieFans
        </div>
        <div style={{
          fontSize: 72, fontWeight: 800,
          background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
          backgroundClip: 'text', color: 'transparent',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textAlign: 'center',
        }}>
          {label} OnlyFans
        </div>
        <div style={{ fontSize: 28, color: '#8888aa' }}>
          Best Australian {label} Creators
        </div>
      </div>
    ),
    { ...size }
  );
}
