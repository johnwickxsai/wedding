import { motion } from 'motion/react';
import { WeddingConfig } from '../types';
import {
  ClockSvg,
  DressCodeSvg,
  ExternalArrowSvg,
  LanternIconSvg,
  LotusDivider,
  MapPinSvg,
  RingsIconSvg,
} from './Ornaments';

interface DetailsSectionProps {
  config: WeddingConfig;
  reducedMotion: boolean;
}

function resolveMapHref(rawLink: string): string {
  const trimmed = rawLink.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return 'https://maps.google.com';
}

export function DetailsSection({ config, reducedMotion }: DetailsSectionProps) {
  const mapHref = resolveMapHref(config.mapsLink);

  const cards = [
    {
      id: 'ceremony',
      icon: <RingsIconSvg className="h-6 w-6 text-[#9A6B0A]" />,
      title: config.ceremony.label,
      primaryLine: config.ceremony.time,
      secondaryLine: config.ceremony.venue,
      note: config.ceremony.note,
      metaIcon: <ClockSvg className="h-4 w-4 shrink-0 text-[#9A6B0A]" />,
    },
    {
      id: 'reception',
      icon: <LanternIconSvg className="h-6 w-6 text-[#9A6B0A]" />,
      title: config.reception.label,
      primaryLine: config.reception.time,
      secondaryLine: config.reception.venue,
      note: config.reception.note,
      metaIcon: <ClockSvg className="h-4 w-4 shrink-0 text-[#9A6B0A]" />,
    },
    {
      id: 'dress-code',
      icon: <DressCodeSvg className="h-6 w-6 text-[#9A6B0A]" />,
      title: config.dressCode.label,
      primaryLine: config.dressCode.value,
      secondaryLine: config.dateDisplay,
      note: config.dressCode.note,
      metaIcon: null,
    },
  ];

  return (
    <section
      id="details"
      className="w-full bg-[#EEF3EF] px-5 py-20 text-[#16302B] sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.22em] text-[#9A6B0A] uppercase">
            When &amp; Where
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-[#16302B] sm:text-4xl md:text-5xl">
            {config.detailsHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#2B4A43] sm:text-base">
            {config.detailsSubheading}
          </p>
          <LotusDivider className="mt-8" tone="jade" />
        </motion.div>

        {/* Details Cards — Flat hairline border, zero heavy shadows, gentle hover/tap lift */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              className="flex flex-col justify-between border border-[#16302B]/15 bg-[#F7FAF8] p-6 transition-colors hover:border-[#E0A526] sm:p-7"
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={reducedMotion ? undefined : { y: -4 }}
              whileTap={reducedMotion ? undefined : { scale: 0.99 }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.55,
                delay: reducedMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#16302B]/14 bg-[#EEF3EF]">
                  {card.icon}
                </div>

                <h3 className="font-display mt-5 text-2xl font-medium text-[#16302B]">
                  {card.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-base font-semibold text-[#16302B] tabular-nums">
                  {card.metaIcon}
                  <span>{card.primaryLine}</span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-[#2B4A43]">
                  {card.secondaryLine}
                </p>
              </div>

              <div className="mt-6 border-t border-[#16302B]/10 pt-4">
                <p className="text-xs leading-relaxed text-[#2B4A43]/90">{card.note}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Venue Map Action Bar */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-between gap-5 border border-[#16302B]/15 bg-[#F7FAF8] px-6 py-6 text-center sm:flex-row sm:px-8 sm:text-left"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#16302B]/14 bg-[#EEF3EF]">
              <MapPinSvg className="h-5 w-5 text-[#9A6B0A]" />
            </div>
            <div>
              <p className="font-display text-lg font-medium text-[#16302B]">
                Directions &amp; Venue Location
              </p>
              <p className="mt-0.5 text-sm text-[#2B4A43]">
                {config.ceremony.venue}
              </p>
            </div>
          </div>

          <motion.a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#16302B] px-7 py-3 text-sm font-medium tracking-wide text-[#EEF3EF] whitespace-nowrap transition-colors hover:bg-[#1f423b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16302B]"
          >
            <span>{config.mapsButtonLabel}</span>
            <ExternalArrowSvg className="h-4 w-4 text-[#E0A526]" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
