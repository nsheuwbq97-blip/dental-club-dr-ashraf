import { motion, useReducedMotion } from 'motion/react';
import { Calendar, Phone, Star, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onBookClick: () => void;
}

export function HeroSection({ onBookClick }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#12304A] text-white"
    >
      <div className="relative min-h-[580px] lg:min-h-[650px] flex items-center">
        <SafeImage
          src="/src/assets/images/hero_dental_suite_1795001056074.jpg"
          alt="Modern dental treatment suite at Dental Club Dr Ashraf Chaudhary in Rahim Yar Khan"
          loading="eager"
          fallbackTitle={CLINIC_INFO.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(18, 48, 74, 0.94) 0%, rgba(18, 48, 74, 0.82) 48%, rgba(8, 127, 140, 0.42) 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex flex-wrap items-center gap-2.5 text-sm font-medium text-[#EAF7FA] mb-6"
            >
              <span className="inline-flex items-center gap-1 text-amber-300" aria-hidden="true">
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
              </span>
              <span className="tabular-nums font-semibold text-white">
                Rated {CLINIC_INFO.rating}/{CLINIC_INFO.maxRating} by {CLINIC_INFO.totalReviews} Reviews
              </span>
              <span aria-hidden="true" className="text-white/45">
                ·
              </span>
              <span className="text-[#EAF7FA]/90">
                Serving Rahim Yar Khan Since {CLINIC_INFO.establishedYear}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-[family-name:var(--font-heading)] text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-white mb-6"
            >
              Your Smile Deserves Expert Care
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="text-base sm:text-lg text-[#EAF7FA]/90 leading-relaxed max-w-xl mb-9"
            >
              Experience professional dental care with a commitment to healthy, confident smiles at{' '}
              <span className="font-semibold text-white">{CLINIC_INFO.name}</span>.
            </motion.p>

            <motion.div
              {...fadeUp(0.24)}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#087F8C] hover:bg-[#066671] rounded-xl shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book an Appointment
              </button>

              <a
                href={CLINIC_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#12304A] bg-white hover:bg-[#EAF7FA] rounded-xl shadow-lg shadow-black/15 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Phone className="w-4 h-4 text-[#087F8C]" aria-hidden="true" />
                Call Now · {CLINIC_INFO.phoneDisplay}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-[#0d2438]/95 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-sm">
          <div className="flex items-center gap-3 text-[#EAF7FA]">
            <MapPin className="w-4 h-4 text-[#5fd2de] shrink-0" aria-hidden="true" />
            <span className="truncate">{CLINIC_INFO.shortAddress}</span>
          </div>
          <div className="flex items-center gap-3 text-[#EAF7FA] md:justify-center">
            <Phone className="w-4 h-4 text-[#5fd2de] shrink-0" aria-hidden="true" />
            <a
              href={CLINIC_INFO.phoneHref}
              className="hover:text-white transition-colors tabular-nums font-medium"
            >
              Direct Clinic Line: {CLINIC_INFO.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#EAF7FA] md:justify-end">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">
              {CLINIC_INFO.rating} / {CLINIC_INFO.maxRating} Google Rating · {CLINIC_INFO.totalReviews}{' '}
              Reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
