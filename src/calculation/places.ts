import type { BirthPlace } from '../types';

/** Only a place-name query is sent; birth date/time never leave the browser. */
export async function searchPlaces(query: string, signal?: AbortSignal): Promise<BirthPlace[]> {
  if (query.trim().length < 2) throw new Error('Enter at least two letters of your birth city.');
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.search = new URLSearchParams({ name: query.trim(), count: '8', language: 'en', format: 'json' }).toString();
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error('City search is unavailable. Try again or enter coordinates and timezone below.');
  const data = await response.json();
  return (Array.isArray(data.results) ? data.results : []).filter((p: Record<string, unknown>) => typeof p.name === 'string' && Number.isFinite(p.latitude) && Number.isFinite(p.longitude) && typeof p.timezone === 'string').map((p: Record<string, string | number>) => ({ name: [p.name, p.admin1, p.country].filter(Boolean).join(', '), latitude: Number(p.latitude), longitude: Number(p.longitude), timezone: String(p.timezone) }));
}
