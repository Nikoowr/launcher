import { ReactNode } from 'react';

interface ExternalLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export function ExternalLink({
  className = '',
  children,
  href,
}: ExternalLinkProps) {
  console.log(href);

  return (
    <a type="button" className={className}>
      {children}
    </a>
  );
}
