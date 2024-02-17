import { StagesEnum } from '../../constants/env.constants';
import { useStage } from '../../hooks/stage';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const dictionary = {
  [StagesEnum.Prod]: 'prod',
  [StagesEnum.Dev]: 'dev',
};

export const Environment = () => {
  const { stage } = useStage();

  if (!stage) {
    return <div></div>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="text-muted-foreground">{dictionary[stage]}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ambiente atual</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
