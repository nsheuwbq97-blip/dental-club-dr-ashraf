import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  Sun,
  ShieldPlus,
  Activity,
  Smile,
  Stethoscope,
  ClipboardCheck,
  SlidersHorizontal,
  ArrowRight,
  Pencil,
  Check,
  RotateCcw,
  Info,
} from 'lucide-react';
import { ServiceCategory } from '../data/clinicData';
import { SafeImage } from './SafeImage';

interface ServicesSectionProps {
  services: ServiceCategory[];
  onUpdateService: (id: string, title: string, description: string) => void;
  onResetServices: () => void;
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

const ICON_MAP = {
  Sparkles,
  Sun,
  ShieldPlus,
  Activity,
  Smile,
  Stethoscope,
  ClipboardCheck,
  SlidersHorizontal,
} as const;

type FilterType = 'all' | 'preventive' | 'cosmetic' | 'restorative';

const FILTER_OPTIONS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All Categories (8)' },
  { id: 'preventive', label: 'Preventive' },
  { id: 'cosmetic', label: 'Cosmetic & Alignment' },
  { id: 'restorative', label: 'Restorative & Surgical' },
];

export function ServicesSection({
  services,
  onUpdateService,
  onResetServices,
  onSelectServiceForBooking,
}: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');

  const filteredServices =
    activeFilter === 'all'
      ? services
      : services.filter((service) => service.category === activeFilter);

  const startEditing = (service: ServiceCategory) => {
    setEditingId(service.id);
    setDraftTitle(service.title);
    setDraftDescription(service.description);
  };

  const saveEdit = (id: string) => {
    const trimmedTitle = draftTitle.trim();
    const trimmedDesc = draftDescription.trim();
    if (trimmedTitle && trimmedDesc) {
      onUpdateService(id, trimmedTitle, trimmedDesc);
    }
    setEditingId(null);
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F5F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#087F8C] tracking-wide mb-2.5">
              Proposed Dental Services
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#12304A] leading-tight mb-4">
              Proposed Service Categories
            </h2>
            <p className="text-base text-[#12304A]/75 leading-relaxed">
              Explore proposed dental care categories for patient inquiries. Every category below
              is marked as proposed and remains editable until verified directly with the clinic.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setEditMode((prev) => !prev);
                setEditingId(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                editMode
                  ? 'bg-[#12304A] text-white border-[#12304A]'
                  : 'bg-white text-[#12304A] border-[#12304A]/15 hover:border-[#087F8C] hover:text-[#087F8C]'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
              {editMode ? 'Done Editing Services' : 'Edit Proposed List'}
            </button>

            {editMode && (
              <button
                type="button"
                onClick={() => {
                  onResetServices();
                  setEditingId(null);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#12304A]/80 hover:text-[#12304A] bg-white border border-[#12304A]/15 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Reset Defaults
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#12304A]/10">
          <div
            role="tablist"
            aria-label="Filter proposed service categories"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#12304A]/10 rounded-xl w-fit"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(option.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#087F8C] text-white shadow-sm'
                      : 'text-[#12304A]/75 hover:text-[#12304A] hover:bg-[#EAF7FA]/60'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-start sm:items-center gap-2 text-xs sm:text-sm text-[#12304A]/75">
            <Info className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
            <span>
              Notice: Proposed categories only — editable until confirmed by clinic staff.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName];
            const isEditingThis = editMode && editingId === service.id;

            return (
              <motion.article
                key={service.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.05, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white rounded-2xl border border-[#12304A]/10 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#12304A]/6 group"
              >
                <div className="relative h-44 overflow-hidden bg-[#EAF7FA]">
                  <SafeImage
                    src={service.image}
                    alt={`${service.title} proposed dental care category`}
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#12304A]/35 via-transparent to-transparent"
                  />
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm text-[#087F8C] flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#087F8C] mb-2">
                    <span className="tabular-nums">{service.number}</span>
                    <span aria-hidden="true" className="text-[#12304A]/30">
                      ·
                    </span>
                    <span>Proposed</span>
                    <span aria-hidden="true" className="text-[#12304A]/30">
                      ·
                    </span>
                    <span className="text-[#12304A]/65">Editable</span>
                  </div>

                  {isEditingThis ? (
                    <div className="space-y-3 flex-1 flex flex-col">
                      <div>
                        <label className="sr-only" htmlFor={`title-${service.id}`}>
                          Service title
                        </label>
                        <input
                          id={`title-${service.id}`}
                          type="text"
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          className="w-full px-3 py-2 text-sm font-semibold text-[#12304A] border border-[#087F8C] rounded-lg focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="sr-only" htmlFor={`desc-${service.id}`}>
                          Service description
                        </label>
                        <textarea
                          id={`desc-${service.id}`}
                          rows={3}
                          value={draftDescription}
                          onChange={(e) => setDraftDescription(e.target.value)}
                          className="w-full px-3 py-2 text-sm text-[#12304A]/80 border border-[#12304A]/20 rounded-lg focus:border-[#087F8C] focus:outline-none resize-none"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => saveEdit(service.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#087F8C] hover:bg-[#066671] rounded-lg cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-xs font-medium text-[#12304A]/70 hover:text-[#12304A] rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#12304A] mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-sm text-[#12304A]/75 leading-relaxed mb-6 flex-1">
                        {service.description}
                      </p>

                      <div className="pt-4 border-t border-[#12304A]/8 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectServiceForBooking(service.title)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F8C] hover:text-[#12304A] transition-colors cursor-pointer"
                        >
                          Inquire / Book
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>

                        {editMode && (
                          <button
                            type="button"
                            onClick={() => startEditing(service)}
                            aria-label={`Edit ${service.title}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#12304A]/70 hover:text-[#087F8C] px-2 py-1 rounded-md hover:bg-[#EAF7FA] transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                            Edit
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
