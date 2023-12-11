import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../../constants/routes.constants';
import { useAuth } from '../../hooks/auth';
import { useGame } from '../../hooks/game';
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
  const navigate = useNavigate();
  const { logout, session } = useAuth();
  const { readToPlay } = useGame();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="titlebar-button bg-[#fff2] p-4 hover:bg-[#fff4]"
            disabled={!readToPlay}
          >
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 w-40">
          <DropdownMenuLabel>{session?.user || 'Babama'}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => navigate(RoutesEnum.Settings)}
            className="cursor-pointer"
          >
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
