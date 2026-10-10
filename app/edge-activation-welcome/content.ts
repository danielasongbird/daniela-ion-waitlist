// Copy for the post-purchase welcome page.
// Wherever possible this is taken word for word from "Thank you updated.pdf"
// (The Edge Activation tripwire running order, September 2026).

export const portalHref = process.env.NEXT_PUBLIC_SOUL_PORTAL_URL || '#soul-portal';


export const firstSteps = [
  {
    when: 'Right now',
    title: 'Open Soul Portal.',
    body: 'Everything from your five days to your live sessions lives here, so you’re always coming back to the same home.',
  },
  {
    when: 'Tonight',
    title: 'Listen to The Equanimity Transmission.',
    body: 'A private audio that arrives before Day One and sets the frequency for all five days.',
  },
  {
    when: 'Tomorrow morning',
    title: 'Begin Day One, Embodiment.',
    body: 'Complete your Before Soul Audit, then receive your first audio transmission.',
  },
  {
    when: 'Straight after',
    title: 'Write your first soul love letter.',
    body: 'An open-hearted outpouring of whatever is moving through your body and asking to be expressed.',
  },
];

// Shortened from the document's "every day has the same rhythm" paragraph.
export const rhythm =
  'Each morning you receive an audio transmission, then write a soul love letter to that part of you. By Day Five, everything you create carries transmission.';

export const days = [
  { day: 'Day One', name: 'Embodiment', body: 'You come back into your body after running on autopilot, grounded and awake in your own skin. Everything else stands on this foundation.' },
  { day: 'Day Two', name: 'Expression', body: 'Your voice finds its real frequency and lets go of the version busy managing how she’s perceived. What you say starts to sound like you again.' },
  { day: 'Day Three', name: 'Resonance', body: 'Your heart and your creative work come into union, and the tug of war between what feels safe and what feels true finally lets go. Creating becomes an exhale.' },
  { day: 'Day Four', name: 'Incubation', body: 'You move from forcing into receiving. Ideas and timing start arriving on their own, so you can put the willpower down.' },
  { day: 'Day Five', name: 'Sovereignty', body: 'You stand whole, done proving and done waiting for permission, as the architect of everything you create.' },
];

export const note = [
  'I am so excited to be part of this journey with you.',
  'Soul Portal is so dear to my heart. I believe creative women flourish and multiply when we create inside a sacred space, and women attuned to this frequency can transform humanity through their gifts. There is nothing greater than women coming together to create from a frequency that lifts us into creative consciousness and undoes so much of the programming we’ve been under.',
  'So think of this as your welcome home. Your soul has been inviting you all along, and I’m here as the transmitter while you meet her.',
  'The part I really want you to hear is that this starts with transforming yourself. As you transform, the world around you becomes transformational too, and that’s the biggest outcome of all.',
];

export const portalBody =
  'Soul Portal is a frequency-first home for creative women who are done performing and ready to elevate. Everything from your five days to your live sessions lives here, so you’re always coming back to the same home.';

export const faqs = [
  { q: 'How much time do I need each day?', a: 'About fifteen to twenty minutes, which is enough to receive the transmission and write your love letter.' },
  { q: 'What if I fall behind or miss a day?', a: 'You keep your access, so you can move through the five levels at your own pace. It works best slow and felt.' },
  { q: 'Do I need any experience with meditation or energy work?', a: 'None. This meets you exactly where you are, and all you need is a willingness to receive.' },
  { q: 'Where does everything live?', a: 'Inside Soul Portal, the community you joined when you signed up for your free activation. Your five days, bonuses and live session replays are all there.' },
  { q: 'When are the live sessions?', a: 'Once a season, inside Soul Portal. If you join between sessions, the latest replay is ready for you straight away, and you’ll get an invitation to the next live one.' },
  { q: 'What happens after the five days?', a: 'You’ll be welcomed into the next part of the portal. That’s all I’ll say for now.' },
];

