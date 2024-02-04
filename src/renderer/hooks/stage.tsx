import {
  ReactNode,
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
import { useAuth } from './auth';
import { useUser } from './user';

type StageProviderProps = {
  children: ReactNode;
};

type StageContextData = {
  changeStage: (newStage: StagesEnum) => Promise<void>;
  stage: StagesEnum | null;
  loading: boolean;
};

const StageContext = createContext<StageContextData>({} as StageContextData);

export function StageProvider({ children }: StageProviderProps) {
  const [stage, setStage] = useState<StagesEnum | null>(null);
  const [loading, setLoading] = useState(true);

  const { loggedIn, logout } = useAuth();
  const { user } = useUser();

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
      setStage(newStage);
    },
    [loggedIn, logout, user, stage],
  );

  useEffect(() => {
    setLoading(true);

    stageUtils
      .getStage()
      .then((data) => setStage(data))
      .catch(() => setStage(StagesEnum.Prod))
      .finally(() => setLoading(false));
  }, []);

  const contextValue = useMemo(
    () => ({ stage, changeStage, loading }),
    [stage, changeStage, loading],
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
