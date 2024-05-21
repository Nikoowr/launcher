import { ChevronDown, RefreshCcw } from 'lucide-react';
import { useMemo } from 'react';

import { IpcEventsEnum } from '../../../main/constants/ipc-events.constants';
import { useUpdate } from '../../hooks/update';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const { ipcRenderer } = window.electron;

export const GameOptionsMenu = () => {
  const { isUpdating, isUpToDate } = useUpdate();

  const isDisabled = useMemo(
    () => !isUpToDate || isUpdating,
    [isUpdating, isUpToDate],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="m-0 h-full rounded-none bg-pink-600 p-1 hover:bg-pink-700"
          disabled={isDisabled}
        >
          <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-40">
        <DropdownMenuItem
          disabled={isDisabled}
          className="cursor-pointer"
          onClick={() => {
            ipcRenderer.sendMessage(IpcEventsEnum.DownloadLatestUpdates);
          }}
        >
          <RefreshCcw className="mr-2 size-4" />
          <span>Re-patch</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
