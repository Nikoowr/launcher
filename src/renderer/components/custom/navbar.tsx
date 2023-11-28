import { MinusIcon, RefreshCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { Button } from '../ui/button';
import { ToastAction } from '../ui/toast';
import { useToast } from '../ui/use-toast';

const { ipcRenderer } = window.electron;

export const Navbar = () => {
  const [toastShowed, setToastShowed] = useState(false);
  const [updateFound, setUpdateFound] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    ipcRenderer.once(IpcEventsEnum.AutoUpdaterFoundUpdate, () => {
      setUpdateFound(true);
    });
  }, []);

  useEffect(() => {
    if (updateFound && !toastShowed) {
      toast({
        title: 'Nova versão disponível',
        description:
          'Uma nova versão do Launcher está disponível. Atualize agora para obter as últimas melhorias!',
        duration: 1000 * 60 * 60,
        action: (
          <ToastAction
            onClick={ipcRenderer[IpcEventsEnum.AutoUpdateQuitAndInstall]}
            altText="Atualizar"
          >
            Atualizar
          </ToastAction>
        ),
      });

      setToastShowed(true);
    }
  }, [updateFound, toastShowed, toast]);

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
