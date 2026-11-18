import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { CLINIC_INFO, NAV_LINKS } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';

export function Footer() {
  return (
    <footer className="bg-[#12304A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <ClinicLogo variant="dark" label={CLINIC_INFO.name} />
            <p className="text-sm text-[#EAF7FA]/80 leading-relaxed max-w-md pt-1">
              Serving smiles in Rahim Yar Khan since {CLINIC_INFO.establishedYear}. Committed to
              patient-focused dental care in a welcoming, clean clinical environment.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={CLINIC_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-[#087F8C] rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                Call {CLINIC_INFO.phoneDisplay}
              </a>
              <a
                href={CLINIC_INFO.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#087F8C] hover:bg-[#066671] rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#EAF7FA]/75">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#appointment"
                  className="hover:text-white transition-colors inline-block"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-white mb-4">
              Clinic Details
            </h3>
            <ul className="space-y-3.5 text-sm text-[#EAF7FA]/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#5fd2de] shrink-0 mt-1" aria-hidden="true" />
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#5fd2de] shrink-0" aria-hidden="true" />
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#5fd2de] shrink-0" aria-hidden="true" />
                <a
                  href={CLINIC_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Direct WhatsApp Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAF7FA]/65">
          <p>
            &copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
          </p>
          <p className="tabular-nums">
            Google Rating: {CLINIC_INFO.rating} / {CLINIC_INFO.maxRating} ({CLINIC_INFO.totalReviews}{' '}
            Reviews)
          </p>
        </div>
      </div>
    </footer>
  );
}
