import { useState } from 'react';
import { motion } from 'motion/react';
import { WeddingConfig } from '../types';
import { CornerFiligree, LotusDivider } from './Ornaments';

interface OpeningDoorsProps {
  config: WeddingConfig;
  reducedMotion: boolean;
  onStartOpening: () => void;
  onOpened: () => void;
}

export function OpeningDoors({
  config,
  reducedMotion,
  onStartOpening,
  onOpened,
}: OpeningDoorsProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onStartOpening();
    window.setTimeout(onOpened, reducedMotion ? 280 : 1150);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ perspective: 1400 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening && reducedMotion ? 0 : 1 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation entrance"
    >
      {/* Left Door Leaf */}
      <motion.div
        className="relative h-full w-1/2 border-r border-[#E0A526]/40 bg-[#16302B]"
        style={{ transformOrigin: 'left center', willChange: 'transform' }}
        initial={{ x: 0, rotateY: 0 }}
        animate={
          isOpening && !reducedMotion
            ? { x: '-102%', rotateY: -22 }
            : { x: 0, rotateY: 0 }
        }
        transition={{
          duration: 1.05,
          delay: 0.14,
          ease: [0.65, 0, 0.25, 1],
        }}
      >
        <div className="pointer-events-none absolute inset-3 border border-[#E0A526]/25 sm:inset-6" />
        <div className="pointer-events-none absolute inset-6 border border-[#E0A526]/12 sm:inset-10" />
        <CornerFiligree className="pointer-events-none absolute top-4 left-4 h-9 w-9 sm:top-8 sm:left-8 sm:h-12 sm:w-12" />
        <CornerFiligree className="pointer-events-none absolute bottom-4 left-4 h-9 w-9 -scale-y-100 sm:bottom-8 sm:left-8 sm:h-12 sm:w-12" />

        {/* Subtle half-arch door molding */}
        <svg
          className="pointer-events-none absolute top-1/2 right-0 h-[56vh] w-full max-w-[260px] -translate-y-1/2 opacity-30"
          viewBox="0 0 200 420"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M200 18C125 18 58 76 58 156V402H200"
            stroke="#E0A526"
            strokeWidth="1.2"
          />
          <path
            d="M200 36C136 36 78 86 78 156V386H200"
            stroke="#E0A526"
            strokeWidth="0.7"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Left vertical brass pull handle */}
        <div
          className="pointer-events-none absolute top-1/2 right-3 h-20 w-[2px] -translate-y-1/2 rounded-full bg-[#E0A526]/55 sm:right-5 sm:h-24"
          aria-hidden="true"
        />
      </motion.div>

      {/* Right Door Leaf */}
      <motion.div
        className="relative h-full w-1/2 border-l border-[#E0A526]/40 bg-[#16302B]"
        style={{ transformOrigin: 'right center', willChange: 'transform' }}
        initial={{ x: 0, rotateY: 0 }}
        animate={
          isOpening && !reducedMotion
            ? { x: '102%', rotateY: 22 }
            : { x: 0, rotateY: 0 }
        }
        transition={{
          duration: 1.05,
          delay: 0.14,
          ease: [0.65, 0, 0.25, 1],
        }}
      >
        <div className="pointer-events-none absolute inset-3 border border-[#E0A526]/25 sm:inset-6" />
        <div className="pointer-events-none absolute inset-6 border border-[#E0A526]/12 sm:inset-10" />
        <CornerFiligree className="pointer-events-none absolute top-4 right-4 h-9 w-9 -scale-x-100 sm:top-8 sm:right-8 sm:h-12 sm:w-12" />
        <CornerFiligree className="pointer-events-none absolute right-4 bottom-4 h-9 w-9 -scale-x-100 -scale-y-100 sm:right-8 sm:bottom-8 sm:h-12 sm:w-12" />

        {/* Subtle half-arch door molding */}
        <svg
          className="pointer-events-none absolute top-1/2 left-0 h-[56vh] w-full max-w-[260px] -translate-y-1/2 opacity-30"
          viewBox="0 0 200 420"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 18C75 18 142 76 142 156V402H0"
            stroke="#E0A526"
            strokeWidth="1.2"
          />
          <path
            d="M0 36C64 36 122 86 122 156V386H0"
            stroke="#E0A526"
            strokeWidth="0.7"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Right vertical brass pull handle */}
        <div
          className="pointer-events-none absolute top-1/2 left-3 h-20 w-[2px] -translate-y-1/2 rounded-full bg-[#E0A526]/55 sm:left-5 sm:h-24"
          aria-hidden="true"
        />
      </motion.div>

      {/* Centered Seal Crest & Open Trigger */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 1, scale: 1 }}
        animate={isOpening ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.18 : 0.35, ease: 'easeOut' }}
      >
        <div className="flex max-w-xs flex-col items-center rounded-t-[140px] border border-[#E0A526]/40 bg-[#16302B]/96 px-8 pt-10 pb-9 sm:max-w-sm sm:px-11 sm:pt-12 sm:pb-10">
          <p className="font-myanmar text-sm tracking-wide text-[#E0A526] sm:text-base">
            {config.burmeseHeading}
          </p>

          <LotusDivider className="my-4" tone="gold" />

          {/* Monogram Seal */}
          <div className="my-2 flex h-24 w-24 items-center justify-center rounded-full border border-[#E0A526]/70 bg-[#102420]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#E0A526]/35">
              <span className="font-display text-2xl font-medium tracking-wider text-[#EEF3EF]">
                {config.couple.monogramFirst}
                <span className="mx-1 italic text-[#E0A526]">&amp;</span>
                {config.couple.monogramSecond}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs tracking-[0.2em] text-[#EEF3EF]/75 uppercase">
            {config.openingDoor.eyebrow}
          </p>

          <h1 className="font-display mt-2 text-2xl font-medium tracking-wide text-[#EEF3EF] sm:text-3xl">
            {config.couple.firstName}
            <span className="mx-2 italic text-[#E0A526]">&amp;</span>
            {config.couple.secondName}
          </h1>

          <p className="mt-2 text-sm text-[#EEF3EF]/80">{config.dateDisplay}</p>

          <motion.button
            type="button"
            onClick={handleOpen}
            whileHover={reducedMotion ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            className="mt-7 inline-flex min-h-[48px] min-w-[164px] cursor-pointer items-center justify-center rounded-full bg-[#E0A526] px-8 py-3 text-sm font-semibold tracking-[0.14em] text-[#16302B] uppercase transition-colors hover:bg-[#ebb43c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0A526]"
          >
            {config.openingDoor.buttonLabel}
          </motion.button>

          <p className="mt-4 text-xs text-[#EEF3EF]/65">{config.openingDoor.audioNote}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
