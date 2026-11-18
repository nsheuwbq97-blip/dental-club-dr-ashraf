import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Calendar,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { CLINIC_INFO, ServiceCategory } from '../data/clinicData';

interface AppointmentSectionProps {
  services: ServiceCategory[];
  preselectedService: string;
}

interface FormState {
  patientName: string;
  phoneNumber: string;
  email: string;
  service: string;
  preferredDate: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function AppointmentSection({
  services,
  preselectedService,
}: AppointmentSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const todayStr = getTodayIsoDate();

  const [form, setForm] = useState<FormState>({
    patientName: '',
    phoneNumber: '',
    email: '',
    service: preselectedService || '',
    preferredDate: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRequest, setSubmittedRequest] = useState<FormState | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
      setSubmittedRequest(null);
    }
  }, [preselectedService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = form.patientName.trim();
    const cleanedPhone = form.phoneNumber.replace(/[\s\-()]/g, '');
    const trimmedEmail = form.email.trim();

    if (trimmedName.length < 2) {
      nextErrors.patientName = 'Please enter the patient’s full name (at least 2 characters).';
    }

    if (!/^\+?[0-9]{10,15}$/.test(cleanedPhone)) {
      nextErrors.phoneNumber =
        'Please enter a valid 10–15 digit phone number (e.g., 03334150541).';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.service) {
      nextErrors.service = 'Please select a proposed service or general consultation.';
    }

    if (!form.preferredDate) {
      nextErrors.preferredDate = 'Please select a preferred appointment date.';
    } else if (form.preferredDate < todayStr) {
      nextErrors.preferredDate = 'Preferred date cannot be in the past.';
    }

    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedRequest({ ...form });
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const buildWhatsAppLink = (data: FormState) => {
    const text = [
      `Hello ${CLINIC_INFO.name},`,
      `I would like to request an appointment:`,
      `• Patient Name: ${data.patientName.trim()}`,
      `• Phone: ${data.phoneNumber.trim()}`,
      `• Email: ${data.email.trim()}`,
      `• Service Inquiry: ${data.service}`,
      `• Preferred Date: ${data.preferredDate}`,
      data.message.trim() ? `• Notes: ${data.message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `${CLINIC_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="appointment" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <p className="text-sm font-semibold text-[#087F8C] tracking-wide mb-2.5">
                Schedule Your Visit
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#12304A] leading-tight mb-4">
                Book an Appointment
              </h2>
              <p className="text-base text-[#12304A]/75 leading-relaxed">
                Complete the appointment request form below to prepare your visit details, or
                contact {CLINIC_INFO.name} directly by phone or WhatsApp for immediate scheduling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F8FA] border border-[#12304A]/10 space-y-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-[#12304A]/80 leading-relaxed">
                  <strong className="text-[#12304A]">Demo Notice:</strong> This form prepares and
                  validates your appointment request locally for demonstration purposes. To confirm
                  your slot with the clinic, please call or send your pre-filled summary on
                  WhatsApp.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#12304A] hover:bg-[#087F8C] rounded-xl transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call Clinic · {CLINIC_INFO.phoneDisplay}
                </a>
                <a
                  href={CLINIC_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#087F8C] bg-[#EAF7FA] hover:bg-[#d8f1f6] rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-[#F5F8FA] rounded-3xl border border-[#12304A]/10 p-6 sm:p-8 lg:p-10">
              {submittedRequest ? (
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF7FA] text-[#087F8C] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-[#12304A] mb-1.5">
                        Demo Request Prepared
                      </h3>
                      <p className="text-sm text-[#12304A]/80 leading-relaxed">
                        Because this website preview does not have a live clinic booking backend
                        connected yet, your appointment has{' '}
                        <strong className="text-[#12304A]">not been automatically booked</strong>.
                        Send your prepared details directly via WhatsApp or call{' '}
                        <span className="tabular-nums font-semibold">
                          {CLINIC_INFO.phoneDisplay}
                        </span>{' '}
                        to confirm your visit.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#12304A]/10 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-[#12304A]/60">Patient Name</div>
                      <div className="font-semibold text-[#12304A]">
                        {submittedRequest.patientName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#12304A]/60">Phone Number</div>
                      <div className="font-semibold text-[#12304A] tabular-nums">
                        {submittedRequest.phoneNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#12304A]/60">Email Address</div>
                      <div className="font-semibold text-[#12304A] break-all">
                        {submittedRequest.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#12304A]/60">Selected Service</div>
                      <div className="font-semibold text-[#087F8C]">
                        {submittedRequest.service}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#12304A]/60">Preferred Date</div>
                      <div className="font-semibold text-[#12304A] tabular-nums">
                        {submittedRequest.preferredDate}
                      </div>
                    </div>
                    {submittedRequest.message.trim() && (
                      <div className="sm:col-span-2">
                        <div className="text-xs text-[#12304A]/60">Additional Message</div>
                        <div className="text-[#12304A]/85 mt-0.5">
                          {submittedRequest.message}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsAppLink(submittedRequest)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#066671] rounded-xl transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Send Request via WhatsApp
                    </a>
                    <a
                      href={CLINIC_INFO.phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#12304A] bg-white border border-[#12304A]/15 hover:border-[#087F8C] rounded-xl transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4 text-[#087F8C]" aria-hidden="true" />
                      Call {CLINIC_INFO.phoneDisplay}
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedRequest(null)}
                      className="px-4 py-3 text-sm font-medium text-[#12304A]/70 hover:text-[#12304A] cursor-pointer"
                    >
                      Edit Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="patientName"
                        className="block text-sm font-semibold text-[#12304A] mb-1.5"
                      >
                        Patient Name <span className="text-[#087F8C]">*</span>
                      </label>
                      <input
                        id="patientName"
                        name="patientName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={form.patientName}
                        onChange={(e) => handleChange('patientName', e.target.value)}
                        aria-invalid={Boolean(errors.patientName)}
                        className={`w-full px-4 py-3 text-sm bg-white rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#087F8C]/25 ${
                          errors.patientName
                            ? 'border-red-600'
                            : 'border-[#12304A]/15 focus:border-[#087F8C]'
                        }`}
                      />
                      {errors.patientName && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {errors.patientName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-semibold text-[#12304A] mb-1.5"
                      >
                        Phone Number <span className="text-[#087F8C]">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="e.g., 03334150541"
                        value={form.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        aria-invalid={Boolean(errors.phoneNumber)}
                        className={`w-full px-4 py-3 text-sm bg-white rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#087F8C]/25 tabular-nums ${
                          errors.phoneNumber
                            ? 'border-red-600'
                            : 'border-[#12304A]/15 focus:border-[#087F8C]'
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#12304A] mb-1.5"
                      >
                        Email Address <span className="text-[#087F8C]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full px-4 py-3 text-sm bg-white rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#087F8C]/25 ${
                          errors.email
                            ? 'border-red-600'
                            : 'border-[#12304A]/15 focus:border-[#087F8C]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="preferredDate"
                        className="block text-sm font-semibold text-[#12304A] mb-1.5"
                      >
                        Preferred Date <span className="text-[#087F8C]">*</span>
                      </label>
                      <input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        required
                        min={todayStr}
                        value={form.preferredDate}
                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                        aria-invalid={Boolean(errors.preferredDate)}
                        className={`w-full px-4 py-3 text-sm bg-white rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#087F8C]/25 tabular-nums ${
                          errors.preferredDate
                            ? 'border-red-600'
                            : 'border-[#12304A]/15 focus:border-[#087F8C]'
                        }`}
                      />
                      {errors.preferredDate && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold text-[#12304A] mb-1.5"
                    >
                      Select Service <span className="text-[#087F8C]">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      aria-invalid={Boolean(errors.service)}
                      className={`w-full px-4 py-3 text-sm bg-white rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#087F8C]/25 ${
                        errors.service
                          ? 'border-red-600'
                          : 'border-[#12304A]/15 focus:border-[#087F8C]'
                      }`}
                    >
                      <option value="">Choose a proposed service or consultation</option>
                      <option value="General Dental Consultation">
                        General Dental Consultation
                      </option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title} (Proposed)
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#12304A] mb-1.5"
                    >
                      Additional Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Share preferred time of day or any specific questions for the clinic..."
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white rounded-xl border border-[#12304A]/15 focus:border-[#087F8C] focus:outline-none focus:ring-2 focus:ring-[#087F8C]/25 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-white bg-[#087F8C] hover:bg-[#066671] rounded-xl shadow-md shadow-[#087F8C]/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Book Your Appointment
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
