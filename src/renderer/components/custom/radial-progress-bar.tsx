import { ReactNode } from 'react';

type RadialProgressBarProps = {
  children: ReactNode;
  className?: string;
  value?: number;
};

export const RadialProgressBar = ({
  className = '',
  value = 0,
  children,
}: RadialProgressBarProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="stroke-current text-[#fff5]"
          fill="transparent"
          strokeWidth="4"
          cx="50"
          cy="50"
          r="40"
        />

        <circle
          className="progress-ring__circle  stroke-current text-pink-500"
          strokeDashoffset={`calc(400 - (${value} * 2.5))`}
          strokeLinecap="round"
          fill="transparent"
          strokeWidth="4"
          cx="50"
          cy="50"
          r="40"
        />
      </svg>

      <div className="absolute">{children}</div>
    </div>
  );
};
