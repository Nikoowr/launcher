import { useUpdate } from '../../hooks/update';
import { Progress } from '../ui/progress';
import { RadialProgressBar } from './radial-progress-bar';

export const UpdateProgress = () => {
  const { updateInfo } = useUpdate();

  return (
    <>
      <RadialProgressBar className="size-20" value={updateInfo.progress}>
        {''}
      </RadialProgressBar>

      <div className="flex flex-1 flex-col gap-2  text-white">
        <div>
          <span className="text-2xl font-bold">{updateInfo.progress}%</span>
          <span className="ml-4 text-lg text-[#fff9]">{updateInfo.status}</span>
        </div>
        <Progress value={updateInfo.progress} className="w-full" />
        <span className="h-5 text-sm text-[#fff5]">
          {updateInfo.fileUpdating}
        </span>
      </div>
    </>
  );
};
