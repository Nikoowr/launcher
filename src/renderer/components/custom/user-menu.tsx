import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../../constants/routes.constants';
import { useAuth } from '../../hooks/auth';
import { useGame } from '../../hooks/game';
import { useLang } from '../../hooks/lang';
import { useStage } from '../../hooks/stage';
import { useUser } from '../../hooks/user';
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
  const { dictionary } = useLang();
  const { logout } = useAuth();
  const { user } = useUser();
  const { readToPlay } = useGame();
  const { gameIsRunning } = useStage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="titlebar-button bg-[#fff2] p-4 hover:bg-[#fff4]"
          disabled={!readToPlay || gameIsRunning}
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-40">
        <DropdownMenuLabel>{user?.name || user?.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigate(RoutesEnum.Settings)}
          className="cursor-pointer"
        >
          <Settings className="mr-2 size-4" />
          <span>{dictionary.components.custom['user-menu'].SETTINGS}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <LogOut className="mr-2 size-4" />
          <span>{dictionary.components.custom['user-menu'].LOGOUT}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
