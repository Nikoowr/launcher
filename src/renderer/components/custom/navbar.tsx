import { MinusIcon, RefreshCcw, X } from 'lucide-react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { useApp } from '../../hooks/app';
import { Button } from '../ui/button';

const { ipcRenderer } = window.electron;

export const Navbar = () => {
  const { updateFound } = useApp();

  return (
    <div className="titlebar absolute z-10 flex w-full justify-end p-2">
      <div>
        {updateFound && (
          <Button
            className="titlebar-button bg-transparent hover:bg-[#fff1]"
            onClick={ipcRenderer[IpcEventsEnum.AutoUpdateQuitAndInstall]}
          >
            <RefreshCcw width={18} height={18} />
          </Button>
        )}
        <Button
          className="titlebar-button bg-transparent hover:bg-[#fff1]"
          onClick={() =>
            ipcRenderer[IpcEventsEnum.WindowEvent]('minimize-tray')
          }
        >
          <MinusIcon width={18} height={18} />
        </Button>
        <Button
          className="titlebar-button bg-transparent hover:bg-[#fff1]"
          onClick={() => ipcRenderer[IpcEventsEnum.WindowEvent]('close')}
        >
          <X width={18} height={18} />
        </Button>
      </div>
    </div>
  );
};
