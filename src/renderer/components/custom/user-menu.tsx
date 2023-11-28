import { LogOut, Settings, User } from 'lucide-react';

import { useAuth } from '../../hooks/auth';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const UserMenu = () => {
  const { logout, session } = useAuth();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="titlebar-button bg-[#fff2] p-4 hover:bg-[#fff4]">
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 w-40">
          <DropdownMenuLabel>{session?.user || 'Babama'}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
