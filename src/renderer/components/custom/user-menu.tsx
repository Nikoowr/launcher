import { User } from 'lucide-react';

import { Button } from '../ui/button';

export const UserMenu = () => {
  return (
    <Button className="titlebar-button bg-[#fff2] p-4 hover:bg-[#fff4]">
      <User />
    </Button>
  );
};
