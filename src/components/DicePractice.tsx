import { useEffect, useRef, useState } from 'react';
import { AXES } from '../data/catalog';
import { housesForFace, rollDie } from '../practice/dice';
import type { HouseGeometry } from '../types';
import { HouseReading } from './PlacementReading';

const PIPS = [[4], [0,8], [0,4,8], [0,2,6,8], [0,2,4,6,8], [0,2,3,5,6,8]];
export function Die({ face, rolling = false }: { face: number; rolling?: boolean }) {
  return <span className={`die ${rolling ? 'rolling' : ''}`} aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} className={PIPS[face - 1].includes(i) ? 'pip visible' : 'pip'} />)}</span>;
}
export function DicePractice({ houses, axis, onAxis, onExplore, example }: { houses: HouseGeometry[]; axis: number | null; onAxis: (n: number) => void; onExplore: (n: number) => void; example: boolean }) {
  const [face, setFace] = useState<number | null>(axis);
  const [revealed, setRevealed] = useState(false);
  const [rolling, setRolling] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function select(value: number) { housesForFace(value); setFace(value); onAxis(value); setRevealed(false); }
  function roll() { if (rolling) return; setRevealed(false); setRolling(true); const next = rollDie(); timer.current = setTimeout(() => { select(next); setRolling(false); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500); }
  const pair = face ? housesForFace(face) : null;
  return <section className="practice-page" aria-labelledby="practice-title"><div className="practice-intro"><span className="eyebrow">AstroDice · active recall</span><h3 id="practice-title">One roll. Two houses.<br /><em>A connection to remember.</em></h3><p>Each face always maps to the same axis. Try to recall the placements before revealing them. {example && <strong>You’re practicing with the illustrative example, not your own birth chart.</strong>}</p></div>
    <div className="dice-console"><Die face={face ?? 1} rolling={rolling} /><button className="button primary" onClick={roll} disabled={rolling}>{rolling ? 'Rolling…' : face ? 'Roll again' : 'Roll the die'}</button><div className="face-picker" role="group" aria-label="Choose a face or enter your physical die result">{AXES.map(a => <button key={a.number} disabled={rolling} aria-label={`Face ${a.number}: houses ${a.number} and ${a.number + 6}`} aria-pressed={face === a.number} onClick={() => select(a.number)}><b>{a.number}</b><span>{a.number} ↔ {a.number + 6}</span></button>)}</div><p className="muted">Have a physical die? Roll it and select the matching face.</p></div>
    <p className="roll-result" aria-live="polite" aria-atomic="true">{rolling ? 'Rolling the die.' : pair ? `Face ${face} · Houses ${pair[0]} ↔ ${pair[1]} · ${AXES[face! - 1].sides.join(' ↔ ')}` : 'Roll or choose a face to begin.'}</p>
    {face && !rolling && <div className="recall-card"><span className="eyebrow">{revealed ? 'Compare & understand' : 'Before you reveal'}</span><h4>{AXES[face - 1].title}</h4>{!revealed ? <><ol><li>Which sign begins each of these two houses?</li><li>Which planets or points are in each house? Is either house empty?</li><li>How might those planet, sign, and house combinations connect?</li></ol><p>Think it through, say it aloud, or jot it down. This is practice, not a scored prediction.</p><button className="button primary" onClick={() => setRevealed(true)}>Reveal placements & meanings</button></> : <div className="practice-answer" data-testid="practice-answer"><p>{AXES[face - 1].meaning}</p><div className="practice-houses">{pair!.map(n => <HouseReading key={n} house={houses[n - 1]} />)}</div><button className="button secondary" onClick={() => onExplore(face)}>Explore this axis →</button><button className="text-button" onClick={() => setRevealed(false)}>Hide answers</button></div>}</div>}
  </section>;
}
