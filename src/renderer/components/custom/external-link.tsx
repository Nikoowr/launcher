import { ReactNode } from 'react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';

interface ExternalLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

const { ipcRenderer } = window.electron;

export function ExternalLink({
  className = '',
  children,
  href,
}: ExternalLinkProps) {
  const openExternalLink = () => {
    ipcRenderer.sendMessage(IpcEventsEnum.OpenExternalLink, href);
  };

  return (
    <a type="button" className={className} onClick={openExternalLink}>
      {children}
    </a>
  );
}
