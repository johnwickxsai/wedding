import { FormEvent, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WeddingConfig } from '../types';
import { CheckSvg, LotusDivider } from './Ornaments';

interface RsvpSectionProps {
  config: WeddingConfig;
  reducedMotion: boolean;
}

interface SubmittedRsvp {
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  message: string;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
  shape: 'petal' | 'diamond' | 'bar';
  delay: number;
}

function ConfettiBurst({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    const colors = ['#E0A526', '#16302B', '#F0C04E', '#2B5B51', '#C88E16'];
    const shapes: Array<'petal' | 'diamond' | 'bar'> = ['petal', 'diamond', 'bar'];
    return Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * Math.PI * 2 + (i % 3) * 0.14;
      const distance = 90 + (i % 5) * 32;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 36,
        rotate: (i % 2 === 0 ? 1 : -1) * (140 + (i % 4) * 75),
        scale: 0.75 + (i % 3) * 0.22,
        color: colors[i % colors.length],
        shape: shapes[i % shapes.length],
        delay: (i % 6) * 0.025,
      };
    });
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-0 left-0"
          style={{ willChange: 'transform, opacity' }}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: piece.x,
            y: [0, piece.y, piece.y + 68],
            scale: [0, piece.scale, piece.scale * 0.85],
            rotate: piece.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1.45,
            delay: piece.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {piece.shape === 'petal' && (
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
              <path d="M5 0C8 3 9 7 8 10.5C7.3 12.8 6 14 5 14C4 14 2.7 12.8 2 10.5C1 7 2 3 5 0Z" fill={piece.color} />
            </svg>
          )}
          {piece.shape === 'diamond' && (
            <span
              className="block h-2.5 w-2.5 rotate-45"
              style={{ backgroundColor: piece.color }}
            />
          )}
          {piece.shape === 'bar' && (
            <span
              className="block h-1.5 w-3.5 rounded-xs"
              style={{ backgroundColor: piece.color }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function RsvpSection({ config, reducedMotion }: RsvpSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState<SubmittedRsvp | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedName = name.trim();
    if (!cleanedName) {
      setError('Please enter your name before submitting.');
      return;
    }

    setError('');
    setSubmitted({
      name: cleanedName,
      attending,
      guests: attending === 'yes' ? guests : 0,
      message: message.trim(),
    });
    setConfettiKey((prev) => prev + 1);
  };

  const handleEdit = () => {
    setSubmitted(null);
    setIsExpanded(true);
  };

  return (
    <section
      id="rsvp"
      className="relative w-full overflow-hidden bg-[#EEF3EF] px-5 py-20 text-[#16302B] sm:px-8 sm:py-28"
    >
      <motion.div
        className="relative mx-auto max-w-xl text-center"
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium tracking-[0.22em] text-[#9A6B0A] uppercase">
          Kindly Reply
        </p>

        <h2 className="font-display mt-3 text-3xl font-medium text-[#16302B] sm:text-4xl md:text-5xl">
          {config.rsvp.heading}
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-[#2B4A43] sm:text-base">
          RSVP by <strong className="font-semibold text-[#16302B]">{config.rsvp.deadlineDate}</strong> to{' '}
          <span className="font-medium text-[#16302B]">{config.rsvp.contact}</span>
        </p>

        <LotusDivider className="my-8" tone="jade" />

        <div className="relative border border-[#16302B]/15 bg-[#F7FAF8] p-6 sm:p-9">
          <ConfettiBurst key={confettiKey} active={confettiKey > 0 && submitted !== null} reducedMotion={reducedMotion} />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thank-you"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.4 }}
                className="py-4 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#16302B] text-[#E0A526]">
                  <CheckSvg className="h-6 w-6" />
                </div>

                <h3 className="font-display mt-5 text-2xl font-medium text-[#16302B] sm:text-3xl">
                  Thank you, {submitted.name}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#2B4A43] sm:text-base">
                  {submitted.attending === 'yes'
                    ? config.rsvp.thankYouAttending
                    : config.rsvp.thankYouDeclining}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-[#2B4A43]">
                  <span>
                    Response: {submitted.attending === 'yes' ? 'Attending' : 'Unable to attend'}
                  </span>
                  {submitted.attending === 'yes' && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <span className="tabular-nums">
                        {submitted.guests} {submitted.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </>
                  )}
                </div>

                {submitted.message && (
                  <p className="mx-auto mt-4 max-w-md border-t border-[#16302B]/10 pt-4 text-sm italic text-[#2B4A43]">
                    &ldquo;{submitted.message}&rdquo;
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleEdit}
                  className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center px-4 text-xs font-semibold tracking-[0.16em] text-[#16302B] underline underline-offset-4 transition-colors hover:text-[#9A6B0A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16302B]"
                >
                  Update Response
                </button>
              </motion.div>
            ) : !isExpanded ? (
              <motion.div
                key="cta"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
                className="py-3"
              >
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#2B4A43]">
                  Please let us know whether you will be joining us to celebrate our wedding day.
                </p>

                <motion.button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  whileHover={reducedMotion ? undefined : { y: -2 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  className="mt-6 inline-flex min-h-[48px] min-w-[200px] cursor-pointer items-center justify-center rounded-full bg-[#16302B] px-8 py-3 text-sm font-medium tracking-[0.14em] text-[#EEF3EF] uppercase transition-colors hover:bg-[#1f423b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16302B]"
                >
                  {config.rsvp.buttonLabel}
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5 text-left"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block text-xs font-semibold tracking-[0.14em] text-[#16302B] uppercase"
                  >
                    Full Name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your full name"
                    className="mt-2 min-h-[48px] w-full border border-[#16302B]/22 bg-white px-4 py-3 text-base text-[#16302B] placeholder:text-[#2B4A43]/55 focus:border-[#16302B] focus:outline-none"
                  />
                  {error && (
                    <p className="mt-1.5 text-xs font-medium text-[#9B2C2C]" role="alert">
                      {error}
                    </p>
                  )}
                </div>

                {/* Attending Yes / No */}
                <fieldset>
                  <legend className="block text-xs font-semibold tracking-[0.14em] text-[#16302B] uppercase">
                    Will you attend?
                  </legend>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      aria-pressed={attending === 'yes'}
                      className={`min-h-[48px] cursor-pointer border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16302B] ${
                        attending === 'yes'
                          ? 'border-[#16302B] bg-[#16302B] text-[#EEF3EF]'
                          : 'border-[#16302B]/20 bg-white text-[#16302B] hover:border-[#16302B]/45'
                      }`}
                    >
                      Yes, joyfully
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      aria-pressed={attending === 'no'}
                      className={`min-h-[48px] cursor-pointer border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16302B] ${
                        attending === 'no'
                          ? 'border-[#16302B] bg-[#16302B] text-[#EEF3EF]'
                          : 'border-[#16302B]/20 bg-white text-[#16302B] hover:border-[#16302B]/45'
                      }`}
                    >
                      Unable to attend
                    </button>
                  </div>
                </fieldset>

                {/* Number of Guests */}
                <AnimatePresence initial={false}>
                  {attending === 'yes' && (
                    <motion.div
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-xs font-semibold tracking-[0.14em] text-[#16302B] uppercase">
                        Number of Guests
                      </label>
                      <div className="mt-2 flex items-center justify-between border border-[#16302B]/22 bg-white px-2 py-1.5">
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          disabled={guests <= 1}
                          aria-label="Decrease number of guests"
                          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-[#16302B] transition-colors hover:bg-[#EEF3EF] disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14" strokeLinecap="round" />
                          </svg>
                        </button>
                        <span className="font-display text-xl font-medium text-[#16302B] tabular-nums">
                          {guests} {guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.min(8, g + 1))}
                          disabled={guests >= 8}
                          aria-label="Increase number of guests"
                          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-[#16302B] transition-colors hover:bg-[#EEF3EF] disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <div>
                  <label
                    htmlFor="rsvp-message"
                    className="block text-xs font-semibold tracking-[0.14em] text-[#16302B] uppercase"
                  >
                    Wishes or Note (Optional)
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a blessing, dietary note, or message for the couple"
                    className="mt-2 w-full border border-[#16302B]/22 bg-white px-4 py-3 text-base text-[#16302B] placeholder:text-[#2B4A43]/55 focus:border-[#16302B] focus:outline-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <motion.button
                    type="submit"
                    whileHover={reducedMotion ? undefined : { y: -1 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    className="inline-flex min-h-[48px] flex-1 cursor-pointer items-center justify-center rounded-full bg-[#E0A526] px-6 py-3 text-sm font-semibold tracking-[0.14em] text-[#16302B] uppercase transition-colors hover:bg-[#e8b035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16302B]"
                  >
                    Send Response
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-full border border-[#16302B]/22 px-6 py-3 text-sm font-medium text-[#16302B] transition-colors hover:border-[#16302B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16302B]"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
