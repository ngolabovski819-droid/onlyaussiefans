import type { Creator } from '@/types/creator';
import { buildSrcset } from '@/lib/image';

interface Props {
  creator: Creator;
  index: number;
}

function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return 'Free';
  if (price === 0) return 'FREE';
  return `A$${price.toFixed(2)}/mo`;
}

function getBestBundle(creator: Creator): string | null {
  if (creator.bundle1Price && creator.bundle1Duration && creator.bundle1Discount) {
    return `-${creator.bundle1Discount}% for ${creator.bundle1Duration} months`;
  }
  return null;
}

export default function CreatorCard({ creator, index }: Props) {
  const { src, srcSet, sizes } = buildSrcset(creator.avatar ?? creator.avatarC144);
  const isEager = index < 4;
  const bundle = getBestBundle(creator);
  const price = formatPrice(creator.subscribePrice);
  const isFree = creator.subscribePrice === 0 || creator.subscribePrice === null;

  return (
    <div className="creator-card">
      <div className="creator-card-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={srcSet || undefined}
          sizes={sizes || undefined}
          alt={`${creator.name ?? creator.username} OnlyFans`}
          loading={isEager ? 'eager' : 'lazy'}
          fetchPriority={isEager ? 'high' : 'auto'}
          decoding="async"
          referrerPolicy="no-referrer"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/no-image.png';
          }}
        />
        {creator.isVerified && (
          <span className="creator-verified-badge" title="Verified creator">✓</span>
        )}
      </div>
      <div className="creator-card-body">
        <h3 className="creator-name">{creator.name ?? creator.username}</h3>
        <p className="creator-username">@{creator.username}</p>
        {creator.location && (
          <p className="creator-location">📍 {creator.location}</p>
        )}
        <div className="creator-price-row">
          <span className={`creator-price ${isFree ? 'creator-price--free' : ''}`}>
            {price}
          </span>
          {bundle && <span className="creator-bundle">{bundle}</span>}
        </div>
        <a
          href={`https://onlyfans.com/${creator.username}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="creator-view-btn"
          aria-label={`View ${creator.name ?? creator.username} on OnlyFans`}
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
