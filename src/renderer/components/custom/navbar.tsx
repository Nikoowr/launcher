import { MinusIcon, RefreshCcw, Settings, X } from 'lucide-react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { StagesEnum } from '../../constants/env.constants';
import { useApp } from '../../hooks/app';
import { useUser } from '../../hooks/user';
import { UserRolesEnum } from '../../interfaces';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const { ipcRenderer } = window.electron;

type NavbarProps = {
  btnClassName?: string;
};

export const Navbar = ({
  btnClassName = 'bg-transparent hover:bg-[#fff1]',
}: NavbarProps) => {
  const { updateFound } = useApp();
  const { user } = useUser();

  const buttonsClassName = cn('titlebar-button', btnClassName);

  return (
    <div className="titlebar absolute z-10 flex w-full justify-end p-2">
      <div className="flex gap-1">
        {user.role === UserRolesEnum.Admin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={buttonsClassName}>
                <Settings width={18} height={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex gap-2">
                Ambiente
                {/* {stageLoading && <Spinner className="size-4" />} */}
              </DropdownMenuLabel>

              <DropdownMenuItem>
                <Select
                // onValueChange={changeStage}
                // defaultValue={stage || ''}
                // disabled={stageLoading || !stage}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o ambiente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={StagesEnum.Dev}>
                        Desenvolvimento
                      </SelectItem>
                      <SelectItem value={StagesEnum.Prod}>Produção</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {updateFound && (
          <Button
            className={buttonsClassName}
            onClick={() =>
              ipcRenderer.sendMessage(IpcEventsEnum.AutoUpdateQuitAndInstall)
            }
          >
            <RefreshCcw width={18} height={18} />
          </Button>
        )}

        <Button
          className={buttonsClassName}
          onClick={() =>
            ipcRenderer.sendMessage(IpcEventsEnum.WindowEvent, 'minimize-tray')
          }
        >
          <MinusIcon width={18} height={18} />
        </Button>

        <Button
          className={buttonsClassName}
          onClick={() =>
            ipcRenderer.sendMessage(IpcEventsEnum.WindowEvent, 'close')
          }
        >
          <X width={18} height={18} />
        </Button>
      </div>
    </div>
  );
};
