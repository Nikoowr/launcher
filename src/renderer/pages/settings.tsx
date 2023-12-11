import { ArrowLeft } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SettingsAccountPage } from '../components/custom/settings-account-page';
import { SettingsGamePage } from '../components/custom/settings-game-page';
import { SettingsProfilePage } from '../components/custom/settings-profile-page';
import { SidebarNav } from '../components/custom/sidebar-nav';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { RoutesEnum } from '../constants/routes.constants';

export type Tab = {
  Tab: ReactNode;
  title: string;
  id: string;
};

const sidebarTabItems: Tab[] = [
  {
    Tab: <SettingsProfilePage />,
    title: 'Profile',
    id: 'profile',
  },
  {
    Tab: <SettingsAccountPage />,
    title: 'Account',
    id: 'account',
  },
  {
    Tab: <SettingsGamePage />,
    title: 'Game',
    id: 'game',
  },
];

export const Settings = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(sidebarTabItems[0]);

  const onSelectTab = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="space-y-6 p-10 pb-16 md:block">
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
            onSelectTab={onSelectTab}
            selectedTab={selectedTab}
            tabs={sidebarTabItems}
          />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{selectedTab.Tab}</div>
      </div>
    </div>
  );
};
