import { MinusIcon, X } from 'lucide-react';

import { Button } from '../ui/button';

const { ipcRenderer } = window.electron;

export const Navbar = () => {
  return (
    <div className="titlebar absolute z-10 flex w-full justify-end p-2">
      <div>
        <Button
          className="titlebar-button bg-transparent hover:bg-[#fff1]"
          onClick={() => ipcRenderer.windowEvent('minimize-tray')}
        >
          <MinusIcon />
        </Button>
        <Button
          className="titlebar-button bg-transparent hover:bg-[#fff1]"
          onClick={() => ipcRenderer.windowEvent('close')}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};
