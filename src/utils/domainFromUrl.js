/**
 * Extracts the domain (hostname) from a URL string.
 * @param {string} url - Full URL (e.g. "https://www.example.com/article")
 * @returns {string|null} - e.g. "example.com" or null if invalid
 */
export function domainFromUrl(url) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}