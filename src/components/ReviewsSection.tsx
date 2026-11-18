import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export function ReviewsSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const [displayRating, setDisplayRating] = useState<number>(
    prefersReducedMotion ? CLINIC_INFO.rating : 0
  );
  const [displayReviews, setDisplayReviews] = useState<number>(
    prefersReducedMotion ? CLINIC_INFO.totalReviews : 0
  );

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setDisplayRating(CLINIC_INFO.rating);
        setDisplayReviews(CLINIC_INFO.totalReviews);
      }
      return;
    }

    const duration = 900;
    const startTime = performance.now();
    let frameId = 0;

    const animateCounters = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayRating(Number((CLINIC_INFO.rating * eased).toFixed(1)));
      setDisplayReviews(Math.round(CLINIC_INFO.totalReviews * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCounters);
      }
    };

    frameId = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion]);

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#EAF7FA]/75 border-y border-[#087F8C]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-[#087F8C] tracking-wide mb-2.5">
            Patient Feedback Summary
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#12304A] leading-tight mb-4">
            Google Rating &amp; Patient Reviews
          </h2>
          <p className="text-base text-[#12304A]/75 leading-relaxed">
            Verified rating overview for {CLINIC_INFO.name} based on publicly listed Google reviews
            in Rahim Yar Khan.
          </p>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#12304A]/10 shadow-lg shadow-[#12304A]/5 p-8 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 text-center md:text-left md:border-r md:border-[#12304A]/10 md:pr-8">
              <div className="text-xs font-semibold text-[#087F8C] mb-2">
                Google Business Rating
              </div>

              <div className="flex items-baseline justify-center md:justify-start gap-1.5 mb-3">
                <span className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl font-bold text-[#12304A] tabular-nums">
                  {displayRating.toFixed(1)}
                </span>
                <span className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#12304A]/45 tabular-nums">
                  / {CLINIC_INFO.maxRating} Stars
                </span>
              </div>

              <div
                className="flex items-center justify-center md:justify-start gap-1.5 mb-4"
                aria-label="4.8 out of 5 stars"
              >
                {[1, 2, 3, 4].map((starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-6 h-6 text-amber-400 fill-amber-400"
                    aria-hidden="true"
                  />
                ))}
                <span className="relative inline-block w-6 h-6" aria-hidden="true">
                  <Star className="w-6 h-6 text-amber-400/30 fill-amber-400/20" />
                  <span className="absolute inset-0 overflow-hidden w-[80%]">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  </span>
                </span>
              </div>

              <p className="text-sm text-[#12304A]/70 tabular-nums">
                Based on <strong className="text-[#12304A]">{displayReviews} Total Reviews</strong>
              </p>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#12304A]">
                  <ShieldCheck className="w-5 h-5 text-[#087F8C] shrink-0" aria-hidden="true" />
                  <span>{CLINIC_INFO.name}</span>
                </div>
                <p className="text-sm sm:text-base text-[#12304A]/75 leading-relaxed">
                  We display only our authentic overall Google rating ({CLINIC_INFO.rating} /{' '}
                  {CLINIC_INFO.maxRating} stars) and verified review count ({CLINIC_INFO.totalReviews}{' '}
                  total reviews). To read individual patient reviews directly, please visit our
                  official Google Maps listing.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 px-5 rounded-2xl bg-[#F5F8FA] border border-[#12304A]/8">
                <div>
                  <div className="text-xs text-[#12304A]/65 mb-0.5">Average Score</div>
                  <div className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#087F8C] tabular-nums">
                    {CLINIC_INFO.rating} / 5.0
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#12304A]/65 mb-0.5">Total Reviews</div>
                  <div className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#12304A] tabular-nums">
                    {displayReviews} Reviews
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={CLINIC_INFO.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#066671] rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  View Reviews on Google Maps
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <span className="text-xs text-[#12304A]/60">
                  Serving Rahim Yar Khan Since {CLINIC_INFO.establishedYear}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
