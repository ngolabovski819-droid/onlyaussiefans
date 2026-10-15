'use client';

import { useId, useState } from 'react';

interface Props {
  text: string;
  /** Sentences shown before the "Read more" toggle. */
  leadSentences?: number;
}

/** Collapsible intro paragraph. The full text is always rendered into the
 *  HTML (the remainder is only hidden), so crawlers index all of it. */
export default function CategoryIntro({ text, leadSentences = 2 }: Props) {
  const [open, setOpen] = useState(false);
  const restId = useId();

  const sentences = text.trim().split(/(?<=[.!?])\s+(?=[A-Z"'])/);
  const lead = sentences.slice(0, leadSentences).join(' ');
  const rest = sentences.slice(leadSentences).join(' ');

  return (
    <p className="cat-intro">
      {lead}
      {rest && (
        <>
          <span id={restId} className="cat-intro-rest" hidden={!open}>
            {' '}{rest}
          </span>{' '}
          <button
            type="button"
            className="cat-intro-toggle"
            aria-expanded={open}
            aria-controls={restId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Show less' : 'Read more'}
            <svg className="cat-intro-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </p>
  );
}
