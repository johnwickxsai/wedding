import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WeddingConfig } from '../types';
import { LotusDivider } from './Ornaments';

interface CountdownSectionProps {
  config: WeddingConfig;
  reducedMotion: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function getTimeRemaining(targetISO: string): TimeRemaining {
  const targetMs = new Date(targetISO).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (Number.isNaN(targetMs) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isComplete: false };
}

function FlipNumber({
  value,
  label,
  padLength = 2,
  reducedMotion,
}: {
  value: number;
  label: string;
  padLength?: number;
  reducedMotion: boolean;
}) {
  const formatted = String(value).padStart(padLength, '0');

  return (
    <div className="flex flex-col items-center border border-[#16302B]/14 bg-[#F7FAF8] px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative flex h-12 w-full items-center justify-center overflow-hidden sm:h-16">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            className="font-display block text-4xl font-medium text-[#16302B] tabular-nums sm:text-5xl md:text-6xl"
            initial={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 22, rotateX: -40 }
            }
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={
              reducedMotion
                ? { opacity: 0, y: 0 }
                : { opacity: 0, y: -22, rotateX: 40 }
            }
            transition={{
              duration: reducedMotion ? 0.01 : 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs font-medium tracking-[0.2em] text-[#2B4A43] uppercase">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection({ config, reducedMotion }: CountdownSectionProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    getTimeRemaining(config.weddingDateISO)
  );

  useEffect(() => {
    setRemaining(getTimeRemaining(config.weddingDateISO));
    const interval = window.setInterval(() => {
      setRemaining(getTimeRemaining(config.weddingDateISO));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [config.weddingDateISO]);

  return (
    <section
      id="countdown"
      className="w-full bg-[#EEF3EF] px-5 py-20 text-[#16302B] sm:px-8 sm:py-28"
    >
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium tracking-[0.22em] text-[#9A6B0A] uppercase">
          {config.dateDisplay}
        </p>

        <h2 className="font-display mt-3 text-3xl font-medium text-[#16302B] sm:text-4xl md:text-5xl">
          {config.countdown.heading}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#2B4A43] sm:text-base">
          {config.countdown.subheading}
        </p>

        <LotusDivider className="my-8" tone="jade" />

        {remaining.isComplete ? (
          <div className="mx-auto max-w-lg border border-[#16302B]/15 bg-[#F7FAF8] px-6 py-10">
            <p className="font-display text-2xl text-[#16302B] sm:text-3xl">
              {config.countdown.completedMessage}
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5"
            aria-live="off"
            aria-label="Countdown to wedding day"
          >
            <FlipNumber
              value={remaining.days}
              label="Days"
              padLength={2}
              reducedMotion={reducedMotion}
            />
            <FlipNumber
              value={remaining.hours}
              label="Hours"
              padLength={2}
              reducedMotion={reducedMotion}
            />
            <FlipNumber
              value={remaining.minutes}
              label="Minutes"
              padLength={2}
              reducedMotion={reducedMotion}
            />
            <FlipNumber
              value={remaining.seconds}
              label="Seconds"
              padLength={2}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
