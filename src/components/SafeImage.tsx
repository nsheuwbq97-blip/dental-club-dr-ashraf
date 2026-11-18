import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAF7FA] via-[#F5F8FA] to-[#dceff4] text-[#12304A] p-6 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-white/80 border border-[#087F8C]/20 flex items-center justify-center mb-3 text-[#087F8C]">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
        </div>
        <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[#12304A]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
