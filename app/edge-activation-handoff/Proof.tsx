import { Tag, Todo } from './Shared';

// Section 4: portrait and signature (picked in design round 4)
export function Proof() {
  return (
    <section className="hb-pv2">
      <div className="hb-inner hb-pv2-grid">
        <figure className="hb-pv2-portrait">
          <div role="img" aria-label="Daniela smiling beside a studio microphone" />
          <figcaption><span aria-hidden="true" /> on air</figcaption>
        </figure>
        <div>
          <Tag number={4} name="Early proof" purpose="Customer count, case study, or key metric." />
          <p className="hb-kicker">made by daniela ion</p>
          <p className="hb-pv2-authority">A recording artist signed to ABC Music and Universal Music Publishing, and host of the Her Voice Impacts podcast, where she has interviewed a Forbes 30 Under 30 honoree, an MTV Europe Music Award winner, a former EU Commissioner and Deputy Prime Minister, and a bestselling author with millions of copies sold.</p>
          <blockquote className="hb-pv2-quote">
            <p>“I’ve spent most of my working life around voices: my own in a recording booth, and other people’s across a microphone. This is the part of that work I still use on myself.”</p>
            <footer>Daniela</footer>
          </blockquote>
          <p className="hb-pv2-todo"><Todo>Add when available: the number of women who have finished the five days, or one short quote from a buyer. Do not publish an estimate.</Todo></p>
        </div>
      </div>
    </section>
  );
}
