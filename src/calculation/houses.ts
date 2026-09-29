import { e_tilt, MakeTime, SiderealTime } from 'astronomy-engine';
import { normalizeLongitude as norm } from '../geometry/chart';

const RAD = Math.PI / 180;
const sin = (d: number) => Math.sin(d * RAD);
const cos = (d: number) => Math.cos(d * RAD);
const atan2 = (y: number, x: number) => Math.atan2(y, x) / RAD;

/** Placidus divides each point's diurnal/nocturnal semi-arc into thirds.
 * Solve that temporal division on the ecliptic by bisection. See CALCULATIONS.md.
 * No empirical house templates or sign-based house assignment are used.
 */
export function calculateHouses(date: Date, latitude: number, longitude: number, system: 'Placidus' | 'Whole Sign') {
  if (!Number.isFinite(latitude) || Math.abs(latitude) >= 66 || !Number.isFinite(longitude) || Math.abs(longitude) > 180) throw new Error('This version supports latitudes below 66° north/south and longitudes from −180° to 180°. Polar charts require a separately verified calculation path.');
  const eps = e_tilt(MakeTime(date)).tobl;
  const ramc = norm(SiderealTime(date) * 15 + longitude);
  const mc = norm(atan2(sin(ramc), cos(ramc) * cos(eps)));
  const asc = norm(atan2(-cos(ramc), sin(eps) * Math.tan(latitude * RAD) + cos(eps) * sin(ramc)) + 180);
  if (system === 'Whole Sign') return { asc, mc, cusps: Array.from({ length: 12 }, (_, i) => norm(Math.floor(asc / 30) * 30 + i * 30)) };
  function solve(fraction: number, below: boolean) {
    let low = mc, high = mc + 180;
    for (let i = 0; i < 70; i++) {
      const lambda = (low + high) / 2;
      const ra = norm(atan2(sin(lambda) * cos(eps), cos(lambda)));
      const dec = Math.asin(sin(eps) * sin(lambda));
      const semiArc = Math.acos(-Math.tan(latitude * RAD) * Math.tan(dec)) / RAD;
      const target = below ? semiArc + fraction * (180 - semiArc) : fraction * semiArc;
      if (norm(ra - ramc) < target) low = lambda; else high = lambda;
    }
    return norm((low + high) / 2);
  }
  const h11 = solve(1 / 3, false), h12 = solve(2 / 3, false);
  const h2 = solve(1 / 3, true), h3 = solve(2 / 3, true);
  return { asc, mc, cusps: [asc, h2, h3, norm(mc + 180), norm(h11 + 180), norm(h12 + 180), norm(asc + 180), norm(h2 + 180), norm(h3 + 180), mc, h11, h12] };
}
