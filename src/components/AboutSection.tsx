import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { SafeImage } from './SafeImage';

interface AboutSectionProps {
  onBookClick: () => void;
}

export function AboutSection({ onBookClick }: AboutSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#EAF7FA] border border-[#12304A]/8 group">
              <SafeImage
                src="/src/assets/images/about_consultation_room_1795001055592.jpg"
                alt="Welcoming reception and consultation area at Dental Club Dr Ashraf Chaudhary"
                fallbackTitle="Dental Club Dr Ashraf Chaudhary Consultation Lounge"
                className="w-full h-72 sm:h-96 lg:h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-[#087F8C] tracking-wide mb-3">
              Serving Smiles Since {CLINIC_INFO.establishedYear}
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#12304A] leading-tight mb-6">
              Welcome to {CLINIC_INFO.name}
            </h2>

            <div className="space-y-4 text-base text-[#12304A]/80 leading-relaxed mb-8">
              <p>
                Established in {CLINIC_INFO.establishedYear}, {CLINIC_INFO.name} is a dedicated
                dental clinic serving patients in Rahim Yar Khan with attentive, patient-focused
                dental care in a calm and welcoming setting.
              </p>
              <p>
                Conveniently located at {CLINIC_INFO.address}, our clinic prioritizes clear
                communication, clinical cleanliness, and thoughtful care tailored to every visitor.
                Trusted by our local community with a {CLINIC_INFO.rating} out of{' '}
                {CLINIC_INFO.maxRating} star rating across {CLINIC_INFO.totalReviews} patient
                reviews, we remain committed to helping every patient feel confident about their
                oral health.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-[#12304A]/10 mb-8">
              <div>
                <div className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[#087F8C] tabular-nums">
                  Since {CLINIC_INFO.establishedYear}
                </div>
                <p className="text-sm text-[#12304A]/70 mt-1">
                  Serving Rahim Yar Khan
                </p>
              </div>
              <div>
                <div className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[#12304A] tabular-nums">
                  {CLINIC_INFO.rating} / {CLINIC_INFO.maxRating} Stars
                </div>
                <p className="text-sm text-[#12304A]/70 mt-1 tabular-nums">
                  Across {CLINIC_INFO.totalReviews} Google Reviews
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#12304A] hover:bg-[#087F8C] rounded-xl transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request an Appointment
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#12304A]/80">
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 font-medium hover:text-[#087F8C] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#087F8C]" aria-hidden="true" />
                  {CLINIC_INFO.phoneDisplay}
                </a>
                <span aria-hidden="true" className="text-[#12304A]/25">
                  ·
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-medium hover:text-[#087F8C] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#087F8C]" aria-hidden="true" />
                  Old Business Man Colony
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
