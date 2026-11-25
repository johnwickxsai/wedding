import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { WeddingConfig } from './types';
import { WeddingMusicController } from './audio/ambientMusic';
import { OpeningDoors } from './components/OpeningDoors';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { TimelineSection } from './components/TimelineSection';
import { DetailsSection } from './components/DetailsSection';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { LotusDivider, MusicOffSvg, MusicOnSvg } from './components/Ornaments';

/**
 * ============================================================================
 * EDITABLE WEDDING INVITATION CONFIGURATION
 * Update names, dates, venues, dress code, RSVP contact, and Google Maps link
 * right here — every section on the page reads directly from this object.
 * ============================================================================
 */
export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    firstName: 'SIRIUS SAI',
    secondName: 'MARY SOE',
    monogramFirst: 'S',
    monogramSecond: 'M',
  },
  burmeseHeading: 'မင်္ဂလာဆောင်ဖိတ်စာ',
  invitationLead: 'Together with their families, joyfully invite you to celebrate their marriage',
  dateDisplay: 'Saturday, 20 March 2027',
  weddingDateISO: '2027-03-20T10:00:00',

  openingDoor: {
    eyebrow: 'Wedding Invitation',
    buttonLabel: 'Open',
    audioNote: 'Includes gentle ambient music',
  },

  countdown: {
    heading: 'Counting the Days',
    subheading: 'Every moment brings us closer to celebrating with our dearest family and friends.',
    completedMessage: 'Today we celebrate the wedding of Sirius Sai & Mary Soe.',
  },

  ceremony: {
    label: 'Ceremony',
    time: '10:00 AM',
    venue: '[venue name, address]',
    note: 'Please arrive fifteen minutes early for the morning blessing and seating.',
  },

  reception: {
    label: 'Reception',
    time: '6:00 PM',
    venue: '[venue name, address]',
    note: 'Join us for dinner, toasts, and an evening of warm celebration.',
  },

  dressCode: {
    label: 'Dress Code',
    value: '[dress code]',
    note: 'Traditional attire or formal evening wear in jade, ivory, or warm gold tones is warmly welcomed.',
  },

  mapsLink: '[paste link]',
  mapsButtonLabel: 'View on map',

  scheduleHeading: 'The Wedding Day',
  scheduleSubheading: 'From morning blessings to twilight dinner, here is how our celebration unfolds.',
  schedule: [
    {
      id: 'arrival',
      time: '9:30 AM',
      title: 'Guest Arrival & Morning Tea',
      location: '[venue name, address]',
      description: 'Light jasmine tea and warm greetings as family and friends gather.',
    },
    {
      id: 'ceremony',
      time: '10:00 AM',
      title: 'Wedding Ceremony',
      location: '[venue name, address]',
      description: 'Exchange of vows, gold rings, and traditional blessings surrounded by loved ones.',
    },
    {
      id: 'portraits',
      time: '11:30 AM',
      title: 'Family Portraits & Refreshments',
      location: '[venue name, address]',
      description: 'Photographs with family and friends followed by an afternoon rest before evening festivities.',
    },
    {
      id: 'reception',
      time: '6:00 PM',
      title: 'Evening Reception & Dinner',
      location: '[venue name, address]',
      description: 'Candlelit banquet, celebratory toasts, and music under the evening sky.',
    },
  ],

  detailsHeading: 'Celebration Details',
  detailsSubheading: 'Everything you need for the ceremony, reception, and attire on our wedding day.',

  galleryHeading: 'Our Story in Frames',
  gallerySubheading: 'Quiet golden hours, heirloom textures, and moments gathered along the way.',
  gallery: [
    {
      id: 'courtyard-walk',
      src: '/src/assets/images/gallery_golden_hour_couple_1795583425182.jpg',
      alt: 'Couple walking hand in hand beneath sunlit heritage courtyard arches framed by palms',
      caption: 'Golden afternoon beneath the courtyard arches',
      aspect: 'portrait',
    },
    {
      id: 'marigold-garlands',
      src: '/src/assets/images/gallery_marigold_garlands_1795583425524.jpg',
      alt: 'Hand-woven golden marigold and white jasmine garlands on carved teak beside a brass bowl',
      caption: 'Fresh marigold and jasmine woven for the morning',
      aspect: 'landscape',
    },
    {
      id: 'jade-silk-rings',
      src: '/src/assets/images/gallery_jade_silk_detail_1795583426362.jpg',
      alt: 'Two slender brushed gold wedding rings resting on folded deep jade silk with gold weave',
      caption: 'Gold bands resting on deep jade silk',
      aspect: 'portrait',
    },
    {
      id: 'candlelit-banquet',
      src: '/src/assets/images/gallery_candlelit_banquet_1795583426837.jpg',
      alt: 'Candlelit outdoor reception long table dressed in sage linen with marigolds and brass candlesticks',
      caption: 'An evening table glowing with candlelight and marigolds',
      aspect: 'landscape',
    },
    {
      id: 'veranda-dusk',
      src: '/src/assets/images/gallery_veranda_sunset_1795583427652.jpg',
      alt: 'Couple standing together beneath a carved teak veranda archway at warm sunset',
      caption: 'Quiet twilight beneath the carved teak veranda',
      aspect: 'portrait',
    },
    {
      id: 'celadon-tea',
      src: '/src/assets/images/gallery_celadon_tea_1795583429435.jpg',
      alt: 'Celadon pale-jade porcelain tea set with delicate gold rims and jasmine blossoms on linen',
      caption: 'Morning jasmine tea in celadon porcelain',
      aspect: 'landscape',
    },
  ],

  rsvp: {
    heading: 'Reserve Your Seat',
    deadlineDate: '20 February 2027',
    contact: '[name, phone or Viber number]',
    buttonLabel: 'RSVP Now',
    thankYouAttending: 'We are truly honoured to celebrate with you on Saturday, 20 March 2027. Your seat will be waiting.',
    thankYouDeclining: 'Thank you for letting us know. You will be warmly missed and kept in our hearts on our wedding day.',
  },

  footerQuote: 'With gratitude and joy, we look forward to welcoming you.',
};

export default function App() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [doorsDismissed, setDoorsDismissed] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const musicRef = useRef<WeddingMusicController | null>(null);

  useEffect(() => {
    musicRef.current = new WeddingMusicController();
    return () => {
      musicRef.current?.dispose();
    };
  }, []);

  // Lock page scroll while the sealed double doors are closed
  useEffect(() => {
    if (!doorsDismissed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [doorsDismissed]);

  const handleStartOpening = () => {
    musicRef.current?.start();
    setAudioStarted(true);
    setIsMuted(false);
    // Start hero choreography slightly before doors finish clearing for a seamless reveal
    window.setTimeout(() => {
      setHeroReady(true);
    }, prefersReducedMotion ? 100 : 480);
  };

  const handleDoorsOpened = () => {
    setDoorsDismissed(true);
    setHeroReady(true);
  };

  const handleToggleMute = () => {
    if (!musicRef.current) return;
    const nextMuted = musicRef.current.toggleMute();
    setIsMuted(nextMuted);
    setAudioStarted(true);
  };

  const handleReplayEntrance = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setHeroReady(false);
    setDoorsDismissed(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full overflow-x-clip bg-[#16302B] text-[#EEF3EF]">
        {/* Opening Sealed Double Doors */}
        <AnimatePresence>
          {!doorsDismissed && (
            <OpeningDoors
              config={WEDDING_CONFIG}
              reducedMotion={prefersReducedMotion}
              onStartOpening={handleStartOpening}
              onOpened={handleDoorsOpened}
            />
          )}
        </AnimatePresence>

        {/* Floating Corner Mute / Unmute Button (visible after opening tap) */}
        <AnimatePresence>
          {audioStarted && doorsDismissed && (
            <motion.button
              type="button"
              onClick={handleToggleMute}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
              aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
              aria-pressed={isMuted}
              title={isMuted ? 'Unmute music' : 'Mute music'}
              className="fixed right-4 bottom-4 z-40 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#E0A526]/55 bg-[#16302B]/92 text-[#E0A526] backdrop-blur-sm transition-colors hover:border-[#E0A526] hover:bg-[#1f423b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0A526] sm:right-6 sm:bottom-6"
            >
              {isMuted ? (
                <MusicOffSvg className="h-5 w-5" />
              ) : (
                <MusicOnSvg className="h-5 w-5" />
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Single-Page Invitation Flow */}
        <main>
          <HeroSection
            config={WEDDING_CONFIG}
            isOpen={heroReady}
            reducedMotion={prefersReducedMotion}
          />

          <CountdownSection
            config={WEDDING_CONFIG}
            reducedMotion={prefersReducedMotion}
          />

          <TimelineSection
            config={WEDDING_CONFIG}
            reducedMotion={prefersReducedMotion}
          />

          <DetailsSection
            config={WEDDING_CONFIG}
            reducedMotion={prefersReducedMotion}
          />

          <GallerySection
            config={WEDDING_CONFIG}
            reducedMotion={prefersReducedMotion}
          />

          <RsvpSection
            config={WEDDING_CONFIG}
            reducedMotion={prefersReducedMotion}
          />
        </main>

        {/* Minimal Closing Footer */}
        <footer className="w-full border-t border-[#E0A526]/20 bg-[#16302B] px-5 py-16 text-center text-[#EEF3EF] sm:px-8 sm:py-20">
          <div className="mx-auto max-w-xl">
            <p className="font-myanmar text-base text-[#E0A526]">
              {WEDDING_CONFIG.burmeseHeading}
            </p>

            <p className="font-display mt-3 text-2xl tracking-[0.08em] text-[#EEF3EF] sm:text-3xl">
              {WEDDING_CONFIG.couple.firstName}{' '}
              <span className="italic text-[#E0A526]">&amp;</span>{' '}
              {WEDDING_CONFIG.couple.secondName}
            </p>

            <p className="mt-2 text-sm text-[#EEF3EF]/78">
              {WEDDING_CONFIG.dateDisplay}
            </p>

            <LotusDivider className="my-7" tone="gold" />

            <p className="text-sm text-[#EEF3EF]/72">
              {WEDDING_CONFIG.footerQuote}
            </p>

            <div className="mt-7">
              <button
                type="button"
                onClick={handleReplayEntrance}
                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-full border border-[#E0A526]/35 px-6 py-2.5 text-xs font-medium tracking-[0.16em] text-[#EEF3EF]/85 uppercase transition-colors hover:border-[#E0A526] hover:text-[#E0A526] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0A526]"
              >
                Replay Entrance
              </button>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
