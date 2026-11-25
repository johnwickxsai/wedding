import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { GalleryPhoto, WeddingConfig } from '../types';
import { LotusDivider } from './Ornaments';

interface GallerySectionProps {
  config: WeddingConfig;
  reducedMotion: boolean;
}

function ParallaxPhotoCard({
  photo,
  index,
  reducedMotion,
  onSelect,
}: {
  photo: GalleryPhoto;
  index: number;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Gentle slow parallax offset; alternating subtle range for editorial depth
  const range = index % 2 === 0 ? [-22, 22] : [-14, 18];
  const y = useTransform(scrollYProgress, [0, 1], range);

  const aspectClass =
    photo.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]';

  return (
    <motion.div
      ref={cardRef}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.75,
        delay: reducedMotion ? 0 : (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0A526]"
        aria-label={`View photo: ${photo.caption}`}
      >
        <div
          className={`relative w-full overflow-hidden border border-[#E0A526]/22 bg-[#102420] ${aspectClass}`}
        >
          {imgError ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#1B3933] p-6 text-center">
              <LotusDivider tone="gold" />
              <p className="font-display mt-4 text-lg text-[#EEF3EF]">
                {photo.caption}
              </p>
            </div>
          ) : (
            <motion.img
              src={photo.src}
              alt={photo.alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              style={
                reducedMotion
                  ? undefined
                  : { y, scale: 1.12, willChange: 'transform' }
              }
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.15]"
            />
          )}
        </div>
        <p className="mt-3 text-sm text-[#EEF3EF]/80 transition-colors group-hover:text-[#E0A526]">
          {photo.caption}
        </p>
      </button>
    </motion.div>
  );
}

export function GallerySection({ config, reducedMotion }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = config.gallery.length;

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === null ? null : (prev + 1) % total));
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + total) % total
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, total]);

  const activePhoto = activeIndex !== null ? config.gallery[activeIndex] : null;

  return (
    <section
      id="gallery"
      className="w-full bg-[#16302B] px-5 py-20 text-[#EEF3EF] sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#E0A526] uppercase">
            Moments &amp; Keepsakes
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-[#EEF3EF] sm:text-4xl md:text-5xl">
            {config.galleryHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#EEF3EF]/78 sm:text-base">
            {config.gallerySubheading}
          </p>
          <LotusDivider className="mt-8" tone="gold" />
        </motion.div>

        {/* Responsive Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 items-start gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {config.gallery.map((photo, index) => (
            <ParallaxPhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              reducedMotion={reducedMotion}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1A17]/94 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.22 }}
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.caption}
          >
            <motion.div
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col items-center"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex w-full items-center justify-between">
                <span className="text-xs tracking-[0.18em] text-[#E0A526] uppercase tabular-nums">
                  {activeIndex + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-[#E0A526]/40 bg-[#16302B] text-[#EEF3EF] transition-colors hover:border-[#E0A526] hover:text-[#E0A526] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A526]"
                  aria-label="Close gallery viewer"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="relative flex max-h-[70vh] w-full items-center justify-center overflow-hidden border border-[#E0A526]/30 bg-[#102420]">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="mt-4 flex w-full items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex - 1 + total) % total)}
                  className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-[#E0A526]/35 px-4 text-xs font-medium tracking-wider text-[#EEF3EF] uppercase transition-colors hover:border-[#E0A526] hover:text-[#E0A526]"
                  aria-label="Previous photo"
                >
                  Prev
                </button>

                <p className="text-center text-sm text-[#EEF3EF]/90">
                  {activePhoto.caption}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % total)}
                  className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-[#E0A526]/35 px-4 text-xs font-medium tracking-wider text-[#EEF3EF] uppercase transition-colors hover:border-[#E0A526] hover:text-[#E0A526]"
                  aria-label="Next photo"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
