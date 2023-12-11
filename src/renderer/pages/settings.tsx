import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { SidebarNav } from '../components/custom/sidebar-nav';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { RoutesEnum } from '../constants/routes.constants';

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/examples/forms',
  },
  {
    title: 'Account',
    href: '/examples/forms/account',
  },
  {
    title: 'Appearance',
    href: '/examples/forms/appearance',
  },
  {
    title: 'Notifications',
    href: '/examples/forms/notifications',
  },
  {
    title: 'Display',
    href: '/examples/forms/display',
  },
];

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Button
            className="m-0 bg-transparent p-0 text-black hover:bg-transparent"
            onClick={() => navigate(RoutesEnum.Home)}
          >
            <ArrowLeft />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        </div>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav
            items={sidebarNavItems}
            currentPath={sidebarNavItems[0].href}
          />
        </aside>
        {/* <div className="flex-1 lg:max-w-2xl">{children}</div> */}
      </div>
    </div>
  );
};
