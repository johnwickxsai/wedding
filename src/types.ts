export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspect: 'portrait' | 'landscape';
}

export interface WeddingConfig {
  couple: {
    firstName: string;
    secondName: string;
    monogramFirst: string;
    monogramSecond: string;
  };
  burmeseHeading: string;
  invitationLead: string;
  dateDisplay: string;
  weddingDateISO: string;
  openingDoor: {
    eyebrow: string;
    buttonLabel: string;
    audioNote: string;
  };
  countdown: {
    heading: string;
    subheading: string;
    completedMessage: string;
  };
  ceremony: {
    label: string;
    time: string;
    venue: string;
    note: string;
  };
  reception: {
    label: string;
    time: string;
    venue: string;
    note: string;
  };
  dressCode: {
    label: string;
    value: string;
    note: string;
  };
  mapsLink: string;
  mapsButtonLabel: string;
  scheduleHeading: string;
  scheduleSubheading: string;
  schedule: ScheduleItem[];
  detailsHeading: string;
  detailsSubheading: string;
  galleryHeading: string;
  gallerySubheading: string;
  gallery: GalleryPhoto[];
  rsvp: {
    heading: string;
    deadlineDate: string;
    contact: string;
    buttonLabel: string;
    thankYouAttending: string;
    thankYouDeclining: string;
  };
  footerQuote: string;
}
