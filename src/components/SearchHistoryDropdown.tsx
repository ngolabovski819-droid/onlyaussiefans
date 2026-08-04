'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Creator } from '@/types/creator';
import { getSponsorCampaign } from '@/config/sponsors';
import { proxyImg } from '@/lib/image';
import { getSponsorPreviews } from '@/lib/sponsorPreview';

interface Props {
  history: string[];
  onSelect: (term: string) => void;
  onRemove: (term: string) => void;
  onClear: () => void;
}

const keepInputFocused = (event: React.MouseEvent) => event.preventDefault();

export default function SearchHistoryDropdown({ history, onSelect, onRemove, onClear }: Props) {
  const [sponsors, setSponsors] = useState<Creator[] | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getSponsorPreviews().then((creators) => {
      if (!cancelled) setSponsors(creators);
    });
    return () => { cancelled = true; };
  }, []);

  if ((!sponsors || sponsors.length === 0) && history.length === 0) return null;

  return (
    <div className="search-history-dropdown" aria-label="Search suggestions">
      {sponsors && sponsors.length > 0 && (
        <>
          {sponsors.map((sponsor) => {
            const campaign = getSponsorCampaign(sponsor.username);
            const image = campaign?.imageOverride ?? sponsor.avatarC144 ?? sponsor.avatar;
            const thumbnail = image?.startsWith('/') ? image : image ? proxyImg(image, 72, 72) : '/no-image.png';

            return (
              <Link
                href={`/go/${encodeURIComponent(sponsor.username)}?placement=search-dropdown`}
                target="_blank"
                rel="noopener nofollow sponsored"
                prefetch={false}
                className="search-sponsor-row"
                onMouseDown={keepInputFocused}
                key={sponsor.username}
              >
                {/* Fixed 36px suggestion thumbnail; responsive optimization is unnecessary here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="search-sponsor-avatar"
                  src={thumbnail}
                  alt=""
                  width={36}
                  height={36}
                  onError={(event) => { event.currentTarget.src = '/no-image.png'; }}
                />
                <span className="search-sponsor-name">{sponsor.name ?? sponsor.username}</span>
                <span className="search-sponsor-badge">Ad · Sponsored</span>
              </Link>
            );
          })}
          {history.length > 0 && <div className="search-history-divider" />}
        </>
      )}

      {history.length > 0 && (
        <>
          <div className="search-history-header">
            <span>Recent searches</span>
            <button type="button" onMouseDown={keepInputFocused} onClick={onClear}>Clear</button>
          </div>
          {history.map((term) => (
            <div className="search-history-item" key={term}>
              <button
                type="button"
                className="search-history-term"
                onMouseDown={keepInputFocused}
                onClick={() => onSelect(term)}
              >
                {term}
              </button>
              <button
                type="button"
                className="search-history-remove"
                aria-label={`Remove “${term}” from search history`}
                onMouseDown={keepInputFocused}
                onClick={() => onRemove(term)}
              >
                ×
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

