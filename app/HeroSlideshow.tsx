'use client';

import { useEffect, useState } from 'react';

type HeroSlideshowProps = {
  images: readonly string[];
};

export default function HeroSlideshow({ images }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      setReduceMotion(motionQuery.matches);
      if (motionQuery.matches) setActiveIndex(0);
    };

    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);
    return () => motionQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion || images.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion]);

  return (
    <div className="hero-media-sequence" aria-hidden="true">
      {images.map((image, index) => (
        <div
          className={`hero-media${activeIndex === index ? ' is-active' : ''}`}
          key={image}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
}
