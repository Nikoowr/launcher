import { HTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

type IconProps = HTMLAttributes<SVGElement>;

export const Spinner = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
