import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { WeddingConfig } from '../types';
import { LotusDivider } from './Ornaments';

interface TimelineSectionProps {
  config: WeddingConfig;
  reducedMotion: boolean;
}

export function TimelineSection({ config, reducedMotion }: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 68%'],
  });

  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="schedule"
      className="w-full bg-[#16302B] px-5 py-20 text-[#EEF3EF] sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#E0A526] uppercase">
            Order of the Day
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-[#EEF3EF] sm:text-4xl md:text-5xl">
            {config.scheduleHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#EEF3EF]/78 sm:text-base">
            {config.scheduleSubheading}
          </p>
          <LotusDivider className="mt-8" tone="gold" />
        </motion.div>

        {/* Scroll-Drawn Timeline */}
        <div ref={containerRef} className="relative mt-14 sm:mt-16">
          {/* Background guide line */}
          <div
            className="absolute top-2 bottom-2 left-4 w-px bg-[#E0A526]/20 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Scroll-driven animated gold line */}
          <motion.div
            className="absolute top-2 bottom-2 left-4 w-[1.5px] origin-top bg-[#E0A526] md:left-1/2 md:-translate-x-1/2"
            style={{
              scaleY: reducedMotion ? 1 : smoothScaleY,
              willChange: 'transform',
            }}
            aria-hidden="true"
          />

          <ol className="space-y-10 sm:space-y-12">
            {config.schedule.map((item, index) => {
              const isRightOnDesktop = index % 2 === 1;

              return (
                <li
                  key={item.id}
                  className="relative pl-12 md:grid md:grid-cols-2 md:items-start md:gap-12 md:pl-0"
                >
                  {/* Diamond Node on the Timeline */}
                  <motion.div
                    className="absolute top-2 left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2"
                    initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: reducedMotion ? 0.01 : 0.45,
                      delay: reducedMotion ? 0 : 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-hidden="true"
                  >
                    <span className="block h-2.5 w-2.5 rotate-45 border border-[#E0A526] bg-[#16302B]" />
                  </motion.div>

                  {/* Entry Card Content */}
                  <motion.div
                    className={`border border-[#E0A526]/22 bg-[#1B3933] px-5 py-5 sm:px-6 sm:py-6 ${
                      isRightOnDesktop
                        ? 'md:col-start-2 md:text-left'
                        : 'md:col-start-1 md:text-right'
                    }`}
                    initial={
                      reducedMotion
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 24, scale: 0.97 }
                    }
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: reducedMotion ? 0.01 : 0.55,
                      delay: reducedMotion ? 0 : 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="text-xs font-medium tracking-[0.2em] text-[#E0A526] uppercase tabular-nums">
                      {item.time}
                    </p>
                    <h3 className="font-display mt-2 text-xl font-medium text-[#EEF3EF] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#EEF3EF]/85">
                      {item.location}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#EEF3EF]/72">
                      {item.description}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
