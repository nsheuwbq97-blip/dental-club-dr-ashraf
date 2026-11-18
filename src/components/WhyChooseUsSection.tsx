import { motion, useReducedMotion } from 'motion/react';
import { CalendarCheck, HeartHandshake, Building2, MapPin } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS, CLINIC_INFO } from '../data/clinicData';

const ICON_MAP = {
  CalendarCheck,
  HeartHandshake,
  Building2,
  MapPin,
} as const;

export function WhyChooseUsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-semibold text-[#087F8C] tracking-wide mb-2.5">
              Why Choose Us
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#12304A] leading-tight mb-5">
              Trusted Dental Care in Rahim Yar Khan
            </h2>
            <p className="text-base text-[#12304A]/75 leading-relaxed mb-8">
              Since {CLINIC_INFO.establishedYear}, {CLINIC_INFO.name} has focused on delivering
              consistent, respectful dental care in an accessible neighborhood setting.
            </p>

            <div className="rounded-2xl bg-[#EAF7FA] p-6 border border-[#087F8C]/15">
              <div className="text-xs font-semibold text-[#087F8C] mb-1.5">
                Clinic Address
              </div>
              <p className="text-sm font-medium text-[#12304A] leading-relaxed">
                {CLINIC_INFO.address}
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_CHOOSE_US_ITEMS.map((item, index) => {
              const IconComponent = ICON_MAP[item.iconName];

              return (
                <motion.div
                  key={item.number}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="p-7 rounded-2xl bg-[#F5F8FA] border border-[#12304A]/8 transition-all duration-200 hover:-translate-y-1 hover:bg-[#EAF7FA]/55 hover:border-[#087F8C]/25"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#087F8C] border border-[#087F8C]/15 flex items-center justify-center shadow-xs">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[#12304A]/35 tabular-nums">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#12304A] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#12304A]/75 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
