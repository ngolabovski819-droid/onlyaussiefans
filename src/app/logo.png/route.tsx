import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Square mark for the Organization JSON-LD `logo` field (Google requires a
// real raster image in a ~1:1 ratio for knowledge-panel eligibility).
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg,#0d0d14 0%,#1c1c2e 100%)',
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 220, fontWeight: 800, fontFamily: 'sans-serif',
            background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
            backgroundClip: 'text', color: 'transparent',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
        >
          OAF
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
