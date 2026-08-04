import type { Creator } from '@/types/creator';

let cachedRequest: Promise<Creator[]> | null = null;

/** Share one sponsor-preview request between every search box on a page. */
export function getSponsorPreviews(): Promise<Creator[]> {
  if (!cachedRequest) {
    cachedRequest = fetch('/api/sponsor-preview?v=3')
      .then((response) => (response.ok ? response.json() : []))
      .then((payload: Creator[] | Creator | null) => (
        Array.isArray(payload) ? payload : payload ? [payload] : []
      ))
      .catch(() => []);
  }
  return cachedRequest;
}
