'use client';

import { useEffect, useState } from 'react';
import { Tag } from './Shared';

const tag = <Tag number={10} name="Demonstration" purpose="Show the mechanism in action." />;
const kicker = <p className="hb-kicker">try it now</p>;
const heading = <h2>You can try the smallest version <em>right now.</em></h2>;
const twoMinutes = 'It takes two minutes.';
const think = 'Think of one thing you wanted to say this month and didn’t. A post, a line in a song, a paragraph you cut.';
const rewrite = 'Now write it again as a letter to yourself, starting with:';
const opener = 'What I actually meant was…';
const notice = 'Don’t fix it. Don’t read it back as anyone else. Just notice whether it sounds different from the version you almost published.';
const difference = 'If it does, even slightly, that difference is what the five days work on. Every morning has a prompt like this one, written for that day’s level, and an audio from me that gets you ready to write it.';

// Section 10: live writing pad with a two-minute timer (picked in design round 12)
export function Demo() {
  const [seconds, setSeconds] = useState(120);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const done = seconds === 0;

  return (
    <section className="hb-band hb-peach hb-dv1">
      <div className="hb-inner">
        {tag}
        <div className="hb-dv1-grid">
          <div>
            {kicker}
            {heading}
            <ol className="hb-dv1-steps">
              <li><span>1</span><p>{think}</p></li>
              <li><span>2</span><p>{rewrite} <em>“{opener}”</em></p></li>
              <li><span>3</span><p>{notice}</p></li>
            </ol>
          </div>

          <div className="hb-dv1-pad">
            <div className="hb-dv1-bar">
              <span className="hb-dv1-clock" aria-live="polite">{done ? 'Time’s up' : clock}</span>
              <button type="button" onClick={() => { if (done) setSeconds(120); setRunning((value) => !value || done); }}>
                {running ? 'Pause' : done ? 'Start again' : seconds === 120 ? 'Start my two minutes' : 'Keep going'}
              </button>
            </div>
            <span className="hb-dv1-progress" aria-hidden="true"><i style={{ transform: `scaleX(${1 - seconds / 120})` }} /></span>
            <label className="hb-dv1-label" htmlFor="hb-dv1-letter">Dear me,</label>
            <textarea id="hb-dv1-letter" className="hb-dv1-text" defaultValue={`${opener} `} rows={8} spellCheck={false} />
            <p className="hb-dv1-private">{twoMinutes} Nothing you type here is saved or sent anywhere.</p>
          </div>
        </div>

        <p className="hb-dv1-difference">{difference}</p>
      </div>
    </section>
  );
}
