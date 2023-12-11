import { MinusIcon, RefreshCcw, X } from 'lucide-react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { useApp } from '../../hooks/app';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const { ipcRenderer } = window.electron;

type NavbarProps = {
  btnClassName?: string;
};

export const Navbar = ({
  btnClassName = 'bg-transparent hover:bg-[#fff1]',
}: NavbarProps) => {
  const { updateFound } = useApp();

  const buttonsClassName = cn('titlebar-button', btnClassName);

  return (
    <div className="titlebar absolute z-10 flex w-full justify-end p-2">
      <div className="flex gap-1">
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
