import { motion } from 'motion/react';
import { WeddingConfig } from '../types';
import {
  ChevronDownSvg,
  DrawingAmpersand,
  InterlockingRings,
  LotusDivider,
} from './Ornaments';

interface HeroSectionProps {
  config: WeddingConfig;
  isOpen: boolean;
  reducedMotion: boolean;
}

interface PetalSpec {
  id: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  rotateStart: number;
  rotateEnd: number;
  opacity: number;
}

interface SparkleSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
}

const PETALS: PetalSpec[] = [
  { id: 1, left: '6%', size: 15, delay: 0, duration: 13.5, driftX: 28, rotateStart: 0, rotateEnd: 240, opacity: 0.72 },
  { id: 2, left: '16%', size: 12, delay: 3.2, duration: 15, driftX: -24, rotateStart: 40, rotateEnd: 310, opacity: 0.58 },
  { id: 3, left: '27%', size: 17, delay: 1.4, duration: 12.8, driftX: 34, rotateStart: -20, rotateEnd: 200, opacity: 0.65 },
  { id: 4, left: '38%', size: 13, delay: 5.5, duration: 16, driftX: -20, rotateStart: 15, rotateEnd: 270, opacity: 0.55 },
  { id: 5, left: '51%', size: 14, delay: 2.1, duration: 14.2, driftX: 26, rotateStart: 60, rotateEnd: 340, opacity: 0.6 },
  { id: 6, left: '63%', size: 16, delay: 6.4, duration: 13.2, driftX: -32, rotateStart: -30, rotateEnd: 210, opacity: 0.68 },
  { id: 7, left: '74%', size: 12, delay: 0.8, duration: 15.5, driftX: 22, rotateStart: 25, rotateEnd: 290, opacity: 0.52 },
  { id: 8, left: '84%', size: 16, delay: 4.3, duration: 13.8, driftX: -28, rotateStart: 10, rotateEnd: 250, opacity: 0.7 },
  { id: 9, left: '92%', size: 13, delay: 2.7, duration: 14.8, driftX: -18, rotateStart: -15, rotateEnd: 220, opacity: 0.56 },
  { id: 10, left: '45%', size: 11, delay: 7.8, duration: 16.5, driftX: 18, rotateStart: 50, rotateEnd: 300, opacity: 0.48 },
];

const SPARKLES: SparkleSpec[] = [
  { id: 1, left: '12%', top: '18%', size: 9, delay: 0.5, duration: 4.8 },
  { id: 2, left: '85%', top: '22%', size: 10, delay: 1.6, duration: 5.4 },
  { id: 3, left: '22%', top: '62%', size: 8, delay: 2.4, duration: 4.5 },
  { id: 4, left: '79%', top: '58%', size: 11, delay: 0.9, duration: 5.2 },
  { id: 5, left: '18%', top: '80%', size: 7, delay: 3.1, duration: 4.9 },
  { id: 6, left: '88%', top: '76%', size: 8, delay: 2.0, duration: 5.6 },
  { id: 7, left: '34%', top: '26%', size: 7, delay: 1.2, duration: 4.2 },
  { id: 8, left: '68%', top: '28%', size: 9, delay: 2.8, duration: 5.0 },
];

function StaggeredName({
  text,
  animateIn,
  reducedMotion,
  baseDelay,
}: {
  text: string;
  animateIn: boolean;
  reducedMotion: boolean;
  baseDelay: number;
}) {
  const letters = Array.from(text);

  return (
    <span className="inline-flex flex-wrap items-center justify-center" aria-label={text}>
      {letters.map((char, idx) => (
        <motion.span
          key={`${char}-${idx}`}
          aria-hidden="true"
          className={char === ' ' ? 'inline-block w-3 sm:w-4' : 'inline-block'}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.55,
            delay: reducedMotion ? 0 : baseDelay + idx * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection({ config, isOpen, reducedMotion }: HeroSectionProps) {
  const firstNameDuration = config.couple.firstName.length * 0.05;
  const ampersandDelay = 0.72 + firstNameDuration * 0.65;
  const secondNameDelay = ampersandDelay + 0.42;
  const footerElementsDelay = secondNameDelay + config.couple.secondName.length * 0.045 + 0.25;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#16302B] px-5 py-20 text-center text-[#EEF3EF] sm:px-8"
    >
      {/* Subtle Southeast Asian arched gold framing */}
      <div
        className="pointer-events-none absolute inset-4 rounded-t-[180px] border border-[#E0A526]/20 sm:inset-8 sm:rounded-t-[260px] lg:inset-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-7 rounded-t-[164px] border border-[#E0A526]/10 sm:inset-12 sm:rounded-t-[240px] lg:inset-14"
        aria-hidden="true"
      />

      {/* Lightweight Falling Marigold Petals & Tiny Gold Sparkles */}
      {!reducedMotion && isOpen && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {PETALS.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute -top-8"
              style={{ left: petal.left, willChange: 'transform, opacity' }}
              initial={{ y: -24, x: 0, rotate: petal.rotateStart, opacity: 0 }}
              animate={{
                y: '108vh',
                x: [0, petal.driftX, -petal.driftX * 0.55, petal.driftX * 0.4],
                rotate: petal.rotateEnd,
                opacity: [0, petal.opacity, petal.opacity, 0],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg
                width={petal.size}
                height={Math.round(petal.size * 1.35)}
                viewBox="0 0 16 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1C12.2 4.5 14.5 9.8 13.4 15.2C12.6 18.8 10.2 21 8 21C5.8 21 3.4 18.8 2.6 15.2C1.5 9.8 3.8 4.5 8 1Z"
                  fill={petal.id % 2 === 0 ? '#E0A526' : '#EAB740'}
                  fillOpacity="0.88"
                />
                <path
                  d="M8 3.5V18"
                  stroke="#9C6B0A"
                  strokeWidth="0.6"
                  strokeOpacity="0.45"
                />
              </svg>
            </motion.div>
          ))}

          {SPARKLES.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{ left: sparkle.left, top: sparkle.top, willChange: 'transform, opacity' }}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{
                opacity: [0, 0.85, 0.15, 0.75, 0],
                scale: [0.5, 1.05, 0.7, 1, 0.5],
                y: [-4, 8, -2],
              }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                width={sparkle.size}
                height={sparkle.size}
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0L7.1 4.9L12 6L7.1 7.1L6 12L4.9 7.1L0 6L4.9 4.9L6 0Z"
                  fill="#E0A526"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Hero Choreography */}
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
        {/* 1. Interlocking Gold Rings */}
        <InterlockingRings animateIn={isOpen} reducedMotion={reducedMotion} />

        {/* 2. Burmese Heading */}
        <motion.p
          className="font-myanmar mt-6 text-lg font-medium tracking-wide text-[#E0A526] sm:text-xl"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.7,
            delay: reducedMotion ? 0 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {config.burmeseHeading}
        </motion.p>

        <motion.p
          className="mt-3 max-w-md text-xs tracking-[0.22em] text-[#EEF3EF]/80 uppercase sm:text-sm"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.65,
            delay: reducedMotion ? 0 : 0.56,
          }}
        >
          {config.invitationLead}
        </motion.p>

        {/* 3. Couple Names + Drawing Gold Ampersand */}
        <h1 className="font-display mt-7 flex flex-col items-center text-[2.35rem] leading-[1.12] font-medium tracking-[0.06em] text-[#EEF3EF] sm:mt-8 sm:text-6xl md:text-7xl">
          <StaggeredName
            text={config.couple.firstName}
            animateIn={isOpen}
            reducedMotion={reducedMotion}
            baseDelay={0.68}
          />

          <DrawingAmpersand
            animateIn={isOpen}
            reducedMotion={reducedMotion}
            delay={ampersandDelay}
          />

          <StaggeredName
            text={config.couple.secondName}
            animateIn={isOpen}
            reducedMotion={reducedMotion}
            baseDelay={secondNameDelay}
          />
        </h1>

        {/* 4. Date & Scroll Cue */}
        <motion.div
          className="mt-8 flex flex-col items-center sm:mt-10"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.75,
            delay: reducedMotion ? 0 : footerElementsDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <LotusDivider tone="gold" />

          <p className="font-display mt-5 text-xl tracking-[0.08em] text-[#EEF3EF] sm:text-2xl">
            {config.dateDisplay}
          </p>

          <p className="mt-2 text-sm text-[#EEF3EF]/75">
            {config.ceremony.time} &middot; {config.reception.time}
          </p>

          <a
            href="#countdown"
            className="mt-10 inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 px-4 py-2 text-xs tracking-[0.18em] text-[#E0A526] uppercase transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0A526]"
          >
            <span>Scroll to details</span>
            <motion.span
              animate={reducedMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDownSvg className="h-5 w-5" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
