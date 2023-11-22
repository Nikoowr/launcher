import { useState } from 'react';

import { HomeBackground } from '../components/custom/home-background';
import { Logo } from '../components/custom/logo';
import { PlayButton } from '../components/custom/play-button';
import { UserMenu } from '../components/custom/user-menu';

export const Home = () => {
  const [isDownloading, setIsDownloading] = useState(true);
  console.log('isDownloading', isDownloading);
  console.log('setIsDownloading', setIsDownloading);

  return (
    <main className="p-10">
      <HomeBackground />

      <div className="absolute right-4 mt-4">
        <UserMenu />
      </div>

      <div className="mt-10 flex">
        <Logo className="w-[250px]" iconClassName="text-white" />
      </div>

      <PlayButton className="mt-8 w-[170px]" />
    </main>
  );
};
