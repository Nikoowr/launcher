import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const Environment = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="text-muted-foreground">Desenvolvimento</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ambiente atual</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
