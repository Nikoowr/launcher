import React from 'react';

import { cn } from '../../lib/utils';
import { Tab } from '../../pages/settings';
import { buttonVariants } from '../ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  onSelectTab: (tab: Tab) => void;
  selectedTab: Tab;
  tabs: Tab[];
}

export function SidebarNav({
  onSelectTab,
  selectedTab,
  className,
  tabs,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {tabs.map((tab) => (
        <a
          onClick={() => onSelectTab(tab)}
          type="button"
          key={tab.id}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            selectedTab.id === tab.id
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start cursor-pointer',
          )}
        >
          {tab.title}
        </a>
      ))}
    </nav>
  );
}
