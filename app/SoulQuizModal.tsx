'use client';

import type { FormEvent, MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { submitLead } from './lib/submitLead';

type Signal = 'quiet' | 'clear' | 'ready';

type QuizOption = {
  label: string;
  signal: Signal;
};

type QuizQuestion = {
  eyebrow: string;
  prompt: string;
  options: readonly QuizOption[];
};

const questions: readonly QuizQuestion[] = [
  {
    eyebrow: 'The noise',
    prompt: 'Where does the outside noise feel loudest right now?',
    options: [
      { label: 'Too many voices around my next business decision', signal: 'quiet' },
      { label: 'Trying to hear what I truly want beneath the shoulds', signal: 'clear' },
      { label: 'Knowing whether to stay, pivot, or finally move', signal: 'ready' },
    ],
  },
  {
    eyebrow: 'The pattern',
    prompt: 'When you almost know the answer, what happens next?',
    options: [
      { label: 'I ask for another opinion and lose my own thread', signal: 'quiet' },
      { label: 'I research until the answer feels less clear', signal: 'clear' },
      { label: 'I act, then immediately second-guess myself', signal: 'ready' },
    ],
  },
  {
    eyebrow: 'The desire',
    prompt: 'What would feel most freeing today?',
    options: [
      { label: 'Enough quiet to hear myself again', signal: 'quiet' },
      { label: 'One honest answer that feels like mine', signal: 'clear' },
      { label: 'Permission to take one small next step', signal: 'ready' },
    ],
  },
] as const;

const results: Record<Signal, { title: string; copy: string; note: string }> = {
  quiet: {
    title: 'Your signal needs quiet.',
    copy: "Your knowing may not be missing. It may simply be crowded by smart advice, other people's expectations, and the pressure to decide perfectly.",
    note: 'The audio gives you seven uninterrupted minutes before the next opinion enters the room.',
  },
  clear: {
    title: 'Your signal wants clarity.',
    copy: 'You may already sense what is true for you, but the answer gets blurred when desire, fear, facts, and shoulds all speak at once.',
    note: 'The audio helps you notice what is yours without pretending every feeling is an instruction.',
  },
  ready: {
    title: 'Your signal is ready to move.',
    copy: 'You may not need a life-changing answer. You may need one honest, proportionate move that lets you learn without abandoning yourself.',
    note: 'The audio helps you hear that next small move and meet it without impossible certainty.',
  },
};

const optionLetters = ['A', 'B', 'C'];

export default function SoulQuizModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const invokerRef = useRef<HTMLElement | null>(null);
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<Array<Signal | null>>([null, null, null]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resultSignal = useMemo<Signal>(() => {
    const counts: Record<Signal, number> = { quiet: 0, clear: 0, ready: 0 };
    answers.forEach((answer) => {
      if (answer) counts[answer] += 1;
    });

    const highest = Math.max(...Object.values(counts));
    const tied = (Object.keys(counts) as Signal[]).filter((signal) => counts[signal] === highest);
    const latestAnswer = [...answers].reverse().find((answer): answer is Signal => answer !== null);
    return latestAnswer && tied.includes(latestAnswer) ? latestAnswer : tied[0] ?? 'clear';
  }, [answers]);

  useEffect(() => {
    const openDialog = () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;

      invokerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setScreen(0);
      setAnswers([null, null, null]);
      setName('');
      setEmail('');
      setIsSubmitting(false);
      dialog.showModal();
    };

    window.addEventListener('open-soul-quiz', openDialog);
    return () => window.removeEventListener('open-soul-quiz', openDialog);
  }, []);

  useEffect(() => {
    if (!dialogRef.current?.open) return;
    window.requestAnimationFrame(() => titleRef.current?.focus());
  }, [screen]);

  const closeDialog = () => dialogRef.current?.close();

  const handleClose = () => {
    invokerRef.current?.focus();
  };

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeDialog();
  };

  const selectAnswer = (signal: Signal) => {
    const questionIndex = screen - 1;
    setAnswers((current) => current.map((answer, index) => (index === questionIndex ? signal : answer)));
  };

  const moveForward = () => {
    if (screen === questions.length) {
      void submitLead({
        consent: true,
        email,
        firstName: name,
        flow: 'audio',
        quizAnswers: answers.filter((answer): answer is Signal => answer !== null),
        resultSignal,
      }).catch(() => undefined);
    }
    setScreen((current) => Math.min(current + 1, 4));
  };
  const moveBack = () => setScreen((current) => Math.max(current - 1, 0));

  const submitSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const company = String(new FormData(event.currentTarget).get('company') ?? '');
    setIsSubmitting(true);
    try {
      await submitLead({ company, consent: true, email, firstName: name, flow: 'audio' });
      setScreen(1);
    } catch {
      setIsSubmitting(false);
    }
  };

  const isQuestion = screen >= 1 && screen <= questions.length;
  const question = isQuestion ? questions[screen - 1] : null;
  const selectedAnswer = isQuestion ? answers[screen - 1] : null;
  const result = results[resultSignal];

  return (
    <dialog
      aria-labelledby="soul-quiz-title"
      className="soul-dialog"
      onClick={handleBackdropClick}
      onClose={handleClose}
      ref={dialogRef}
    >
      <div className="soul-modal-shell">
        <aside className="soul-modal-rail" aria-hidden="true">
          <span>Daniela.</span>
          <p>The Soul Signal</p>
          <small>Private study / 01</small>
        </aside>

        <div className="soul-modal-content">
          <button aria-label="Close soul quiz" className="soul-modal-close" onClick={closeDialog} type="button">
            &times;
          </button>

          {screen === 0 && (
            <section className="soul-screen soul-intro">
              <div className="soul-onboarding-progress" aria-label="Step 1 of 2">
                <div><span>Step 1 of 2</span><span>Journey begun</span></div>
                <div className="soul-onboarding-track" aria-hidden="true"><span /></div>
              </div>
              <p className="soul-eyebrow">Free private audio / 7 minutes</p>
              <h2 id="soul-quiz-title" ref={titleRef} tabIndex={-1}>
                Where should we send <em>your reset?</em>
              </h2>
              <p className="soul-lede">
                A quiet practice to turn down everyone else&apos;s voice and hear what has been yours all along.
              </p>
              <form aria-busy={isSubmitting} className="soul-signin soul-signin-first" onSubmit={submitSignIn}>
                <div className="soul-fields">
                  <label>
                    <span>First name</span>
                    <input autoComplete="given-name" onChange={(event) => setName(event.target.value)} placeholder="Your first name" required type="text" value={name} />
                  </label>
                  <label>
                    <span>Email address</span>
                    <input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
                  </label>
                </div>
                <input aria-hidden="true" autoComplete="off" className="soul-honeypot" name="company" tabIndex={-1} type="text" />
                <button className="soul-primary soul-optin-button" disabled={isSubmitting} type="submit">Send my private audio <span aria-hidden="true">→</span></button>
                <p className="soul-next-cue"><strong>Next:</strong> a 60-second reflection to reveal what your inner signal needs now.</p>
                <small className="soul-trust-line">Private by design · No spam · Unsubscribe anytime</small>
              </form>
            </section>
          )}

          {question && (
            <section className="soul-screen soul-question">
              <div className="soul-progress-copy">
                <p className="soul-eyebrow">{question.eyebrow}</p>
                <span>Step 2 / Question 0{screen} of 03</span>
              </div>
              <h2 id="soul-quiz-title" ref={titleRef} tabIndex={-1}>{question.prompt}</h2>
              <div className="soul-options">
                {question.options.map((option, index) => (
                  <button
                    aria-pressed={selectedAnswer === option.signal}
                    className={selectedAnswer === option.signal ? 'soul-option is-selected' : 'soul-option'}
                    key={option.label}
                    onClick={() => selectAnswer(option.signal)}
                    type="button"
                  >
                    <span>{optionLetters[index]}</span>
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="soul-actions">
                <button className="soul-back" onClick={moveBack} type="button">Back</button>
                <button className="soul-primary" disabled={!selectedAnswer} onClick={moveForward} type="button">
                  {screen === questions.length ? 'Reveal my signal' : 'Next question'}
                </button>
              </div>
              <div className="soul-progress-track" aria-hidden="true">
                <span style={{ width: `${(screen / questions.length) * 100}%` }} />
              </div>
            </section>
          )}

          {screen === 4 && (
            <section className="soul-screen soul-result">

              <div className="soul-result-main">
                <p className="soul-eyebrow">{name ? `${name}, your reflection` : 'Your reflection'}</p>
                <h2 id="soul-quiz-title" ref={titleRef} tabIndex={-1}>{result.title}</h2>
                <p className="soul-result-copy">{result.copy}</p>
                <blockquote>{result.note}</blockquote>
                <p className="soul-profile-note">Your answers help Daniela make the guidance you receive more relevant to where you are now. Your audio is headed to {email}.</p>
                <button className="soul-primary" onClick={closeDialog} type="button">Finish and Access The Soul Portal</button>
              </div>
              <div className="soul-result-celebration">
                <span>You did it</span>
                <small>Signal revealed / 03</small>
              </div>
            </section>
          )}
        </div>
      </div>
    </dialog>
  );
}
