'use client';

import { useEffect, useRef, useState } from 'react';
import { Tag } from './Shared';

const tag = <Tag number={8} name="New mechanism" purpose="Introduce and name the alternative." />;
const kicker = <p className="hb-kicker">the edge sequence</p>;
const heading = <h2>Your Edge is the side of you <em>nobody has fully seen yet.</em></h2>;
const intro = [
  'That’s why I built The Edge Activation around one idea: you create from wherever you’re standing. So before you work on what you say, you work on where you’re saying it from.',
  'Your Edge isn’t a persona or a new brand voice. It’s the part you keep editing out. The Edge Sequence takes you through five levels of the soul, one each morning, always in this order:',
];
const days = [
  { day: 'Day One', level: 'Embodiment', text: 'Back in your body, instead of running on autopilot.' },
  { day: 'Day Two', level: 'Expression', text: 'Your voice at its real frequency, not the version busy managing how she’s perceived.' },
  { day: 'Day Three', level: 'Resonance', text: 'Your heart and your creative work on the same side, so creating stops being a tug of war.' },
  { day: 'Day Four', level: 'Incubation', text: 'From forcing ideas to receiving them.' },
  { day: 'Day Five', level: 'Sovereignty', text: 'Creating as the author of your work, not waiting for permission to make it.' },
];

function Rings({ active }: { active: number }) {
  return (
    <div className="hb-rings">
      {days.map((item, index) => {
        const state = `${index === active ? ' is-active' : ''}${index < active ? ' is-past' : ''}`;
        const style = { inset: `${index * 10}%` };
        return (
          <span aria-hidden="true" className={`hb-ring${state}`} key={item.level} style={style}><span>0{index + 1}</span></span>
        );
      })}
      <span className="hb-rings-core" aria-hidden="true">✦</span>
    </div>
  );
}

// Section 8: scroll-through rings (picked in design round 10b)
export function Mechanism() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const track = trackRef.current;
      if (track) {
        const rect = track.getBoundingClientRect();
        const progress = -rect.top / Math.max(1, rect.height - window.innerHeight);
        setActive(Math.max(0, Math.min(days.length - 1, Math.floor(progress * days.length))));
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const current = days[active];

  return (
    <section className="hb-kr1" id="the-five-days">
      <div className="hb-inner hb-kr1-intro">
        {tag}
        {kicker}
        {heading}
        <div className="hb-prose hb-prose-wide">
          {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>

      <div className="hb-kr1-track" ref={trackRef}>
        <div className="hb-kr1-sticky">
          <div className="hb-inner hb-kr1-grid">
            <Rings active={active} />
            <div className="hb-kr1-panel" key={current.level} aria-live="polite">
              <p className="hb-kr1-count">{active + 1} <span>/ 5</span></p>
              <small>{current.day}</small>
              <strong>{current.level}</strong>
              <p>{current.text}</p>
              <div className="hb-kr1-dots" aria-hidden="true">
                {days.map((item, index) => <i key={item.level} className={index <= active ? 'is-on' : undefined} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

