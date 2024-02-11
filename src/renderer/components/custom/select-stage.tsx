import { StagesEnum } from '../../../constants/stage.constants';
import { useGame } from '../../hooks/game';
import { useStage } from '../../hooks/stage';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const SelectStage = () => {
  const { loading, changeStage, stage, gameIsRunning } = useStage();
  const { readToPlay } = useGame();

  return (
    <Select
      disabled={loading || !stage || !readToPlay || gameIsRunning}
      onValueChange={changeStage}
      defaultValue={stage || ''}
    >
      <SelectTrigger className="cursor-pointer border-none bg-transparent p-2 text-muted">
        <div className="flex items-center gap-2 pr-1">
          <span className="size-2 rounded-full bg-emerald-400" />
          <SelectValue placeholder="Selecione o ambiente" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={StagesEnum.Dev}>{StagesEnum.Dev}</SelectItem>
          <SelectItem value={StagesEnum.Prod}>{StagesEnum.Prod}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
