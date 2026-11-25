import { motion } from 'motion/react';

export function LotusDivider({ className = '', tone = 'gold' }: { className?: string; tone?: 'gold' | 'jade' }) {
  const stroke = tone === 'gold' ? '#E0A526' : '#16302B';
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span
        className="h-px w-12 sm:w-20"
        style={{ backgroundColor: stroke, opacity: tone === 'gold' ? 0.45 : 0.25 }}
      />
      <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 2C15.5 7 15.5 13 18 18C20.5 13 20.5 7 18 2Z"
          stroke={stroke}
          strokeWidth="1.15"
        />
        <path
          d="M18 16C13.5 14 10 10.5 8 6C12 7 15 10.5 18 16Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <path
          d="M18 16C22.5 14 26 10.5 28 6C24 7 21 10.5 18 16Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <path d="M3 16.5C7 16.5 12 16.5 18 16.5C24 16.5 29 16.5 33 16.5" stroke={stroke} strokeWidth="0.9" strokeOpacity="0.65" />
      </svg>
      <span
        className="h-px w-12 sm:w-20"
        style={{ backgroundColor: stroke, opacity: tone === 'gold' ? 0.45 : 0.25 }}
      />
    </div>
  );
}

export function CornerFiligree({ className = '' }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 46V12C2 6.477 6.477 2 12 2H46" stroke="#E0A526" strokeWidth="1" strokeOpacity="0.55" />
      <path d="M8 38V14C8 10.686 10.686 8 14 8H38" stroke="#E0A526" strokeWidth="0.85" strokeOpacity="0.35" />
      <path d="M14 14L20 14L14 20Z" fill="#E0A526" fillOpacity="0.45" />
    </svg>
  );
}

export function InterlockingRings({
  animateIn,
  reducedMotion,
}: {
  animateIn: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <svg
        width="112"
        height="64"
        viewBox="0 0 112 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <motion.circle
          cx="43"
          cy="32"
          r="21"
          stroke="#E0A526"
          strokeWidth="1.5"
          initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
          animate={animateIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
          transition={{
            duration: reducedMotion ? 0.01 : 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <motion.circle
          cx="43"
          cy="32"
          r="17.5"
          stroke="#E0A526"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
          animate={animateIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
          transition={{
            duration: reducedMotion ? 0.01 : 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <motion.circle
          cx="69"
          cy="32"
          r="21"
          stroke="#E0A526"
          strokeWidth="1.5"
          initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
          animate={animateIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
          transition={{
            duration: reducedMotion ? 0.01 : 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <motion.circle
          cx="69"
          cy="32"
          r="17.5"
          stroke="#E0A526"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
          animate={animateIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
          transition={{
            duration: reducedMotion ? 0.01 : 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
    </div>
  );
}

export function DrawingAmpersand({
  animateIn,
  reducedMotion,
  delay = 1.0,
}: {
  animateIn: boolean;
  reducedMotion: boolean;
  delay?: number;
}) {
  return (
    <div className="my-2 flex items-center justify-center sm:my-3" aria-label="and">
      <svg
        width="56"
        height="58"
        viewBox="0 0 64 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.path
          d="M49 52.5C43.5 57.5 34.5 60 25.5 58.5C15.5 56.8 10 50.2 10.5 42C11 33.8 18.5 28.5 27.5 24C35 20.2 40 16.5 39.8 11.2C39.6 6.2 35.4 3.5 30.6 3.8C25.5 4.1 21.8 8 22 13.5C22.2 21 29.8 29.8 39.2 39.5C45.2 45.7 50.8 50.8 56 54.5"
          stroke="#E0A526"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={
            animateIn
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: {
              duration: reducedMotion ? 0.01 : 1.25,
              delay: reducedMotion ? 0 : delay,
              ease: [0.42, 0, 0.2, 1],
            },
            opacity: {
              duration: 0.25,
              delay: reducedMotion ? 0 : delay,
            },
          }}
        />
        <motion.path
          d="M45.5 35.5C49.5 35.5 53.5 35.2 56.5 34.5"
          stroke="#E0A526"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={
            animateIn
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: {
              duration: reducedMotion ? 0.01 : 0.45,
              delay: reducedMotion ? 0 : delay + 0.95,
              ease: 'easeOut',
            },
            opacity: {
              duration: 0.2,
              delay: reducedMotion ? 0 : delay + 0.95,
            },
          }}
        />
      </svg>
    </div>
  );
}

/* Simple, crisp SVG icons — zero emojis */
export function ClockSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export function DressCodeSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 4a1.75 1.75 0 0 1 1.75 1.75c0 1.25-1.75 1.65-1.75 2.75" strokeLinecap="round" />
      <path d="M12 8.5 4.2 14.3a1.5 1.5 0 0 0 .9 2.7h13.8a1.5 1.5 0 0 0 .9-2.7L12 8.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function RingsIconSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="9.5" cy="13" r="5" />
      <circle cx="14.5" cy="13" r="5" />
      <path d="M12 5.5 13.5 7 12 8.5 10.5 7 12 5.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function LanternIconSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M9 4h6M10 19h4M12 2v2M12 19v3" strokeLinecap="round" />
      <rect x="7" y="6.5" width="10" height="10.5" rx="4.5" />
      <path d="M12 6.5v10.5" strokeOpacity="0.5" />
    </svg>
  );
}

export function MusicOnSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M11 5 6.5 9H3.5v6h3L11 19V5Z" strokeLinejoin="round" />
      <path d="M15.5 8.8a4.5 4.5 0 0 1 0 6.4" strokeLinecap="round" />
      <path d="M18.3 6.2a8 8 0 0 1 0 11.6" strokeLinecap="round" />
    </svg>
  );
}

export function MusicOffSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M11 5 6.5 9H3.5v6h3L11 19V5Z" strokeLinejoin="round" />
      <path d="m15.5 9.5 5 5m0-5-5 5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalArrowSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
