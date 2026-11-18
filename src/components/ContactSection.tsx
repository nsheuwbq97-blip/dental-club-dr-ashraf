import { motion, useReducedMotion } from 'motion/react';
import { Phone, MessageCircle, MapPin, ExternalLink, Building } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F5F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-[#087F8C] tracking-wide mb-2.5">
            Contact &amp; Location
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#12304A] leading-tight mb-4">
            Visit {CLINIC_INFO.name}
          </h2>
          <p className="text-base text-[#12304A]/75 leading-relaxed">
            Reach us directly by phone or WhatsApp, or visit our clinic in Old Business Man Colony,
            Rahim Yar Khan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="bg-white rounded-2xl border border-[#12304A]/10 p-6 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF7FA] text-[#087F8C] flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#087F8C] mb-1">Clinic Name</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#12304A]">
                    {CLINIC_INFO.name}
                  </h3>
                  <p className="text-sm text-[#12304A]/70 mt-1">
                    {CLINIC_INFO.category} · Serving Since {CLINIC_INFO.establishedYear}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#12304A]/10 p-6 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF7FA] text-[#087F8C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#087F8C] mb-1">Phone &amp; WhatsApp</div>
                  <a
                    href={CLINIC_INFO.phoneHref}
                    className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#12304A] hover:text-[#087F8C] transition-colors tabular-nums block mb-4"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={CLINIC_INFO.phoneHref}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#12304A] hover:bg-[#087F8C] rounded-xl transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      Call Now
                    </a>
                    <a
                      href={CLINIC_INFO.whatsappBaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#066671] rounded-xl transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#12304A]/10 p-6 flex-1 flex flex-col justify-between transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF7FA] text-[#087F8C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#087F8C] mb-1">Clinic Address</div>
                  <p className="text-sm sm:text-base font-medium text-[#12304A] leading-relaxed mb-4">
                    {CLINIC_INFO.address}
                  </p>
                  <a
                    href={CLINIC_INFO.mapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F8C] hover:text-[#12304A] transition-colors"
                  >
                    Open Directions in Google Maps
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex"
          >
            <div className="w-full min-h-[380px] lg:min-h-full bg-white rounded-3xl border border-[#12304A]/10 overflow-hidden shadow-sm flex flex-col">
              <iframe
                title="Google Maps location for Dental Club Dr Ashraf Chaudhary in Rahim Yar Khan"
                src={CLINIC_INFO.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 min-h-[360px] border-0"
                allowFullScreen
              />
              <div className="px-6 py-4 bg-white border-t border-[#12304A]/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs sm:text-sm text-[#12304A]/75">
                  Opposite Paprika Restaurant, Old Business Man Colony, Rahim Yar Khan
                </span>
                <a
                  href={CLINIC_INFO.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#087F8C] hover:text-[#12304A] whitespace-nowrap shrink-0"
                >
                  View Larger Map
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
