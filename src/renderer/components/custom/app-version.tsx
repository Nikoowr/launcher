import { useApp } from '../../hooks/app';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const AppVersion = () => {
  const { appInfo } = useApp();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-3 left-3">
            <span className="text-sm text-zinc-500">
              {appInfo?.version ? `v${appInfo.version}` : ''}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Versão do Launcher</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
