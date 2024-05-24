import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../../constants/routes.constants';
import { useAuth } from '../../hooks/auth';
import { useLang } from '../../hooks/lang';
import { useUpdate } from '../../hooks/update';
import { useUser } from '../../hooks/user';
import { cn } from '../../lib/utils';
import { Button, ButtonProps } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export interface UserMenuProps extends ButtonProps {}

export const UserMenu = ({ className, ...props }: UserMenuProps) => {
  const navigate = useNavigate();
  const { isUpdating } = useUpdate();
  const { dictionary } = useLang();
  const { logout } = useAuth();
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'titlebar-button bg-[#fff2] p-4 hover:bg-[#fff4]',
            className,
          )}
          {...props}
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
          disabled={isUpdating}
        >
          <Settings className="mr-2 size-4" />
          <span>{dictionary.components.custom['user-menu'].SETTINGS}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={logout}
          disabled={isUpdating}
        >
          <LogOut className="mr-2 size-4" />
          <span>{dictionary.components.custom['user-menu'].LOGOUT}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
