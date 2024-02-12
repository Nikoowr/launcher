import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { StagesEnum } from '../../constants/stage.constants';
import { UserRolesEnum } from '../interfaces';
import { stageUtils } from '../services/api/utils';
import * as gameUtils from '../utils/game.utils';
import { useAuth } from './auth';
import { useUser } from './user';

type StageProviderProps = {
  children: ReactNode;
};

type StageContextData = {
  changeStage: (newStage: StagesEnum) => Promise<void>;
  setGameIsRunning: Dispatch<SetStateAction<boolean>>;
  setGameVersion: Dispatch<SetStateAction<string | null>>;
  gameVersion: null | string;
  stage: StagesEnum | null;
  gameIsRunning: boolean;
  loading: boolean;
};

const StageContext = createContext<StageContextData>({} as StageContextData);

export function StageProvider({ children }: StageProviderProps) {
  const [gameIsRunning, setGameIsRunning] = useState<boolean>(false);
  const [gameVersion, setGameVersion] = useState<null | string>(null);
  const [stage, setStage] = useState<StagesEnum | null>(null);
  const [loading, setLoading] = useState(true);

  const { loggedIn, logout } = useAuth();
  const { user } = useUser();

  const loadStage = async () => {
    setLoading(true);

    return stageUtils
      .getStage()
      .then(async (data) => {
        const isRunning = await gameUtils.isRunning();
        const version = await gameUtils.getVersion();

        setGameIsRunning(isRunning);
        setGameVersion(version);
        setStage(data);
      })
      .catch(() => setStage(StagesEnum.Prod))
      .finally(() => setLoading(false));
  };

  const changeStage = useCallback(
    async (newStage: StagesEnum) => {
      if (newStage === stage) {
        return;
      }

      if (user?.role !== UserRolesEnum.Admin) {
        return;
      }

      if (loggedIn) {
        await logout();
      }

      await stageUtils.saveStage(newStage);
      await loadStage();
    },
    [loggedIn, logout, user, stage],
  );

  useEffect(() => {
    loadStage();
  }, [loggedIn]);

  const contextValue = useMemo(
    () => ({
      setGameIsRunning,
      setGameVersion,
      gameIsRunning,
      changeStage,
      gameVersion,
      loading,
      stage,
    }),
    [
      setGameIsRunning,
      setGameVersion,
      gameIsRunning,
      changeStage,
      gameVersion,
      loading,
      stage,
    ],
  );

  return (
    <StageContext.Provider value={contextValue}>
      {children}
    </StageContext.Provider>
  );
}

export const useStage = (): StageContextData => {
  const context = useContext(StageContext);

  if (!context) {
    throw new Error('useStage must be used within an StageProvider');
  }

  return context;
};
