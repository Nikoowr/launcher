import { useMemo } from 'react';

import { useDownload } from '../../hooks/download';
import { useUpdate } from '../../hooks/update';
import { Progress } from '../ui/progress';
import { RadialProgressBar } from './radial-progress-bar';

export const UpdateProgress = () => {
  const { downloadInfo, isDownloaded } = useDownload();
  const { updateInfo } = useUpdate();

  const info = useMemo(() => {
    const currentInfo = isDownloaded ? updateInfo : downloadInfo;

    return currentInfo;
  }, [downloadInfo, isDownloaded, updateInfo]);

  return (
    <>
      <RadialProgressBar className="size-20" value={info?.progress}>
        {info?.statusIcon}
      </RadialProgressBar>

      <div className="flex flex-1 flex-col gap-2  text-white">
        <div>
          <span className="text-2xl font-bold">{info?.progress || 0}%</span>
          <span className="ml-4 text-lg text-[#fff9]">
            {info?.statusMessage}
          </span>
        </div>
        <Progress value={info?.progress} className="w-full" />
        <span className="h-5 text-sm text-[#fff5]">{info?.file}</span>
      </div>
    </>
  );
};
