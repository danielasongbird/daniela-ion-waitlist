import { portalBody } from './content';
import { delay } from './PortalParts';

// V2 "your home": Daniela in her podcast chair, full bleed and untinted at the top, fading into the
// spiral-patterned plum; a cream card in the portal branding rises over her chest. Styles in home.css.
export function Home() {
  return (
    <section className="pv-home">
      <div className="pv-home-photo" role="img" aria-label="Daniela in a pink blazer in her podcast chair" />
      <div className="pv-home-card pv-center">
        <p className="pv-home-mark pv-rv" aria-hidden="true"><span />✦<span /></p>
        <p className="pv-label pv-rv">your home</p>
        <h2 className="pv-rv" style={delay(0.08)}>The Edge Activation lives <em>inside Soul Portal</em></h2>
        <p className="pv-lede pv-rv" style={delay(0.16)}>{portalBody}</p>
      </div>
    </section>
  );
}
