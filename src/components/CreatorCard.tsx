'use client';

import { useState } from 'react';
import type { Creator } from '@/types/creator';
import { buildSrcset } from '@/lib/image';
import { getSponsorCampaign } from '@/config/sponsors';

interface Props {
  creator: Creator;
  index: number;
  placementScope?: string;
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

export default function CreatorCard({ creator, index, placementScope }: Props) {
  // Campaign creatives only apply to rows explicitly inserted as paid placements.
  const campaign = creator.sponsored ? getSponsorCampaign(creator.username) : undefined;
  const galleryImages = Array.from(new Set([
    campaign?.imageOverride ?? creator.avatar ?? creator.avatarC144,
    ...(campaign?.galleryImages ?? []),
    ...(!campaign?.imageOverride && creator.header ? [creator.header] : []),
  ].filter((url): url is string => Boolean(url))));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = galleryImages[activeImageIndex] ?? '/no-image.png';
  const { src, srcSet, sizes } = activeImage.startsWith('/')
    ? { src: activeImage, srcSet: '', sizes: '' }
    : buildSrcset(activeImage);
  const isEager = index < 4;
  const bundle = getBestBundle(creator);
  const price = formatPrice(creator.subscribePrice);
  const isFree = creator.subscribePrice === 0 || creator.subscribePrice === null;
  const visibleDotCount = Math.min(7, galleryImages.length);
  const dotWindowStart = Math.min(
    Math.max(activeImageIndex - Math.floor(visibleDotCount / 2), 0),
    Math.max(galleryImages.length - visibleDotCount, 0),
  );
  const visibleDotIndices = Array.from(
    { length: visibleDotCount },
    (_, dotIndex) => dotWindowStart + dotIndex,
  );
  const changeImage = (direction: -1 | 1) => {
    setActiveImageIndex((current) => (
      (current + direction + galleryImages.length) % galleryImages.length
    ));
  };
  const profileHref = campaign?.linkOverride || campaign?.clickTable
    ? `/go/${encodeURIComponent(creator.username)}${placementScope ? `?placement=${encodeURIComponent(placementScope)}` : ''}`
    : `https://onlyfans.com/${encodeURIComponent(creator.username)}`;

  return (
    <article className={`creator-card${creator.sponsored ? ' creator-card--sponsored' : ''}`}>
      <a
        href={profileHref}
        target="_blank"
        rel={`noopener nofollow${creator.sponsored ? ' sponsored' : ''}`}
        className="creator-card-overlay-link"
        aria-label={`View ${creator.name ?? creator.username} on OnlyFans`}
      />
      <div className="creator-card-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={srcSet || undefined}
          sizes={sizes || undefined}
          alt={`${creator.name ?? creator.username}, image ${activeImageIndex + 1} of ${galleryImages.length || 1}`}
          loading={isEager ? 'eager' : 'lazy'}
          fetchPriority={isEager ? 'high' : 'auto'}
          decoding="async"
          referrerPolicy="no-referrer"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(event) => {
            event.currentTarget.srcset = '';
            event.currentTarget.src = '/no-image.png';
          }}
        />

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              className="creator-carousel-arrow creator-carousel-arrow--previous"
              aria-label={`Previous image of ${creator.name ?? creator.username}`}
              onClick={() => changeImage(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="creator-carousel-arrow creator-carousel-arrow--next"
              aria-label={`Next image of ${creator.name ?? creator.username}`}
              onClick={() => changeImage(1)}
            >
              ›
            </button>
            <div
              className="creator-carousel-dots"
              role="group"
              aria-label={`Image ${activeImageIndex + 1} of ${galleryImages.length}`}
            >
              {visibleDotIndices.map((dotIndex) => (
                <button
                  type="button"
                  className={`creator-carousel-dot${dotIndex === activeImageIndex ? ' active' : ''}`}
                  aria-label={`Show image ${dotIndex + 1} of ${galleryImages.length}`}
                  aria-current={dotIndex === activeImageIndex ? 'true' : undefined}
                  onClick={() => setActiveImageIndex(dotIndex)}
                  key={dotIndex}
                />
              ))}
            </div>
          </>
        )}

        {creator.sponsored && campaign?.tags && campaign.tags.length > 0 && (
          <div className="creator-content-tags" role="list" aria-label="Creator content tags">
            {campaign.tags.map((tag) => (
              <span className="creator-content-tag" role="listitem" key={tag}>{tag}</span>
            ))}
            {Boolean(campaign.additionalTagCount) && (
              <span className="creator-content-tag creator-content-tag--more" role="listitem">
                +{campaign.additionalTagCount}
              </span>
            )}
          </div>
        )}
        {creator.sponsored && (
          <span className="creator-sponsored-label" title="Paid placement" aria-label="Advertisement">
            Ad
          </span>
        )}
      </div>

      <div className="creator-card-body">
        <h3 className="creator-name">{creator.name ?? creator.username}</h3>
        <div className="creator-username-row">
          <p className="creator-username">@{creator.username}</p>
          {creator.isVerified && (
            <span className="creator-verified-badge" title="Verified creator" aria-label="Verified creator">✓</span>
          )}
        </div>
        {creator.location && <p className="creator-location">📍 {creator.location}</p>}
        <div className="creator-price-row">
          <span className={`creator-price ${isFree ? 'creator-price--free' : ''}`}>
            {price}
          </span>
          {bundle && <span className="creator-bundle">{bundle}</span>}
        </div>
        <span className="creator-view-btn" aria-hidden="true">
          View Profile
        </span>
      </div>
    </article>
  );
}
