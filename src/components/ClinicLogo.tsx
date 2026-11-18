interface ClinicLogoProps {
  variant?: 'light' | 'dark';
  label?: string;
}

export function ClinicLogo({ variant = 'light', label = 'Dental Club' }: ClinicLogoProps) {
  const isDarkBg = variant === 'dark';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="36"
          height="36"
          rx="10"
          fill={isDarkBg ? '#087F8C' : '#EAF7FA'}
        />
        <path
          d="M12.3 10.5C9.8 10.5 8 12.6 8.3 15.6C8.6 18.8 10.1 21.8 11.4 25.4C11.9 26.8 13.3 27 14 25.7L16.3 21.4C17 20.1 19 20.1 19.7 21.4L22 25.7C22.7 27 24.1 26.8 24.6 25.4C25.9 21.8 27.4 18.8 27.7 15.6C28 12.6 26.2 10.5 23.7 10.5C21.8 10.5 20.1 11.4 18 11.4C15.9 11.4 14.2 10.5 12.3 10.5Z"
          fill={isDarkBg ? '#FFFFFF' : '#087F8C'}
        />
        <path
          d="M14.2 14.3C15.5 15.1 16.8 15.4 18 15.4C19.2 15.4 20.5 15.1 21.8 14.3"
          stroke={isDarkBg ? '#087F8C' : '#FFFFFF'}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight whitespace-nowrap shrink-0 ${
          isDarkBg ? 'text-white' : 'text-[#12304A]'
        }`}
      >
        {label}
      </span>
    </span>
  );
}
