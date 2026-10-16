import type { ReactNode } from 'react';
import { whyNow } from './content';
import { StackRows } from './StackRows';
import { WhyWaveform } from './WhyWaves';
import { FrequencyArt, LoopArt, SamenessArt } from './WhyArt';

// V2 "why now" rows: each paragraph split at its sentence breaks, the first sentence as a serif lead,
// at the large "one idea per screen" size, on soft pink cards that pin mid-screen and stack as you scroll,
// over a flowing waveform.

const arts = [<LoopArt key="loop" />, <SamenessArt key="same" />, <FrequencyArt key="freq" />];
const paragraphs = whyNow.slice(1, 4);
const sentences = (text: string) => text.split(/(?<=\.)\s+/);

// The phrase in each lead set in the accent colour (exact substrings of the copy).
const accents = ['know how to create', 'Human Renaissance', 'been there the whole time'];

function accent(text: string, phrase: string) {
  const [before, after] = text.split(phrase);
  if (after === undefined) return text;
  return <>{before}<em className="pv-why-accent">{phrase}</em>{after}</>;
}

export function WhyRows({ head }: { head: ReactNode }) {
  return (
    <StackRows head={head}>
      <WhyWaveform />
      <ol className="pv-why-rows pv-why-cards">
        {paragraphs.map((paragraph, index) => {
          const [lead, ...rest] = sentences(paragraph);
          return (
            <li key={index} className="pv-why-row">
              <div className="pv-why-card">
                <div className="pv-why-art">{arts[index]}</div>
                <div className="pv-why-text">
                  <p className="pv-why-lead">{accent(lead, accents[index])}</p>
                  {rest.map((sentence) => <p key={sentence}>{sentence}</p>)}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </StackRows>
  );
}


