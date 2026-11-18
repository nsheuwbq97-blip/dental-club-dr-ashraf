export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  category: 'preventive' | 'cosmetic' | 'restorative';
  categoryLabel: string;
  description: string;
  image: string;
  iconName:
    | 'Sparkles'
    | 'Sun'
    | 'ShieldPlus'
    | 'Activity'
    | 'Smile'
    | 'Stethoscope'
    | 'ClipboardCheck'
    | 'SlidersHorizontal';
}

export interface WhyChooseUsItem {
  number: string;
  title: string;
  description: string;
  iconName: 'CalendarCheck' | 'HeartHandshake' | 'Building2' | 'MapPin';
}

export const CLINIC_INFO = {
  name: 'Dental Club Dr Ashraf Chaudhary',
  shortName: 'Dental Club',
  establishedYear: 2010,
  category: 'Dental Clinic',
  phoneDisplay: '03334150541',
  phoneHref: 'tel:+923334150541',
  whatsappNumber: '923334150541',
  whatsappBaseUrl: 'https://wa.me/923334150541',
  address:
    '6, Old Business Man Colony, Opposite Paprika Restaurant, Rahim Yar Khan, 64200, Pakistan',
  shortAddress: '6, Old Business Man Colony, Opposite Paprika Restaurant, Rahim Yar Khan',
  city: 'Rahim Yar Khan, 64200, Pakistan',
  rating: 4.8,
  maxRating: 5,
  totalReviews: 58,
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Dental+Club+Dr+Ashraf+Chaudhary+6+Old+Business+Man+Colony+Opposite+Paprika+Restaurant+Rahim+Yar+Khan+64200+Pakistan',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=6%20Old%20Business%20Man%20Colony%20Opposite%20Paprika%20Restaurant%20Rahim%20Yar%20Khan%2064200%20Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed',
} as const;

export const DEFAULT_PROPOSED_SERVICES: ServiceCategory[] = [
  {
    id: 'teeth-cleaning',
    number: '01',
    title: 'Teeth Cleaning',
    category: 'preventive',
    categoryLabel: 'Preventive Care',
    description:
      'Thorough plaque and tartar removal paired with gentle polishing to help maintain clean teeth and healthy gums.',
    image: '/src/assets/images/service_cleaning_checkup_1795001056467.jpg',
    iconName: 'Sparkles',
  },
  {
    id: 'teeth-whitening',
    number: '02',
    title: 'Teeth Whitening',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Care',
    description:
      'Shade-guided brightening options aimed at lifting surface stains and refreshing the natural brightness of your smile.',
    image: '/src/assets/images/service_whitening_cosmetic_1795001057358.jpg',
    iconName: 'Sun',
  },
  {
    id: 'dental-implants',
    number: '03',
    title: 'Dental Implants',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    description:
      'Structured tooth-replacement consultations designed to restore comfortable chewing function and natural smile balance.',
    image: '/src/assets/images/service_implants_rootcanal_1795001057785.jpg',
    iconName: 'ShieldPlus',
  },
  {
    id: 'root-canal-treatment',
    number: '04',
    title: 'Root Canal Treatment',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    description:
      'Careful endodontic attention focused on relieving tooth discomfort and preserving compromised natural teeth.',
    image: '/src/assets/images/service_implants_rootcanal_1795001057785.jpg',
    iconName: 'Activity',
  },
  {
    id: 'cosmetic-dentistry',
    number: '05',
    title: 'Cosmetic Dentistry',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Care',
    description:
      'Aesthetic dental planning tailored to harmonize tooth shade, contour, and overall smile symmetry.',
    image: '/src/assets/images/service_whitening_cosmetic_1795001057358.jpg',
    iconName: 'Smile',
  },
  {
    id: 'tooth-extraction',
    number: '06',
    title: 'Tooth Extraction',
    category: 'restorative',
    categoryLabel: 'Surgical Care',
    description:
      'Gentle removal of damaged or problematic teeth with clear aftercare guidance to support comfortable recovery.',
    image: '/src/assets/images/service_cleaning_checkup_1795001056467.jpg',
    iconName: 'Stethoscope',
  },
  {
    id: 'dental-checkups',
    number: '07',
    title: 'Dental Checkups',
    category: 'preventive',
    categoryLabel: 'Preventive Care',
    description:
      'Routine oral examinations and hygiene evaluations to monitor dental health and catch early concerns.',
    image: '/src/assets/images/service_cleaning_checkup_1795001056467.jpg',
    iconName: 'ClipboardCheck',
  },
  {
    id: 'braces-orthodontics',
    number: '08',
    title: 'Braces & Orthodontics',
    category: 'cosmetic',
    categoryLabel: 'Alignment Care',
    description:
      'Guided alignment evaluations and orthodontic options for straightening crowded teeth and improving bite comfort.',
    image: '/src/assets/images/service_braces_orthodontics_1795001057736.jpg',
    iconName: 'SlidersHorizontal',
  },
];

export const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    number: '01',
    title: 'Established Since 2010',
    description:
      'Over a decade of consistent presence serving families and individuals in Rahim Yar Khan since 2010.',
    iconName: 'CalendarCheck',
  },
  {
    number: '02',
    title: 'Patient-Focused Care',
    description:
      'Attentive, unhurried consultations where every treatment step is explained clearly before care begins.',
    iconName: 'HeartHandshake',
  },
  {
    number: '03',
    title: 'Professional Dental Environment',
    description:
      'A clean, calm, and thoughtfully organized clinic setting designed to help patients feel comfortable at every visit.',
    iconName: 'Building2',
  },
  {
    number: '04',
    title: 'Convenient Clinic Location',
    description:
      'Easily accessible at 6, Old Business Man Colony, directly opposite Paprika Restaurant in Rahim Yar Khan.',
    iconName: 'MapPin',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
] as const;
