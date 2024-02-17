import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Dictionary, LangsEnum } from '../i18n';
import { getDictionary } from '../i18n/dictionaries';
import * as gameUtils from '../utils/game.utils';
import { useAuth } from './auth';

type LangProviderProps = {
  children: ReactNode;
};

type LangContextData = {
  changeLang: (Lang: LangsEnum) => Promise<void>;
  dictionary: Dictionary;
  loading: boolean;
  lang: LangsEnum;
};

const LangContext = createContext<LangContextData>({} as LangContextData);

export const LangProvider = ({ children }: LangProviderProps) => {
  const [lang, setLang] = useState(LangsEnum.PT);
  const [loading, setLoading] = useState(false);

  const dictionary = useMemo(() => getDictionary(lang), [lang]);

  const { loggedIn } = useAuth();

  const changeLang = useCallback(async (language: LangsEnum) => {
    setLoading(true);

    try {
      await gameUtils.changeLang({ lang: language });
      setLang(language);
      setLoading(false);
    } catch (error) {
      setLang(LangsEnum.PT);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);

      gameUtils
        .getLang()
        .then((currentLang) => setLang(currentLang || LangsEnum.PT))
        .catch(() => setLang(LangsEnum.PT))
        .finally(() => setLoading(false));
    }
  }, [loggedIn]);

  const contextValue = useMemo(
    () => ({
      changeLang,
      dictionary,
      loading,
      lang,
    }),
    [changeLang, dictionary, loading, lang],
  );

  return (
    <LangContext.Provider value={contextValue}>{children}</LangContext.Provider>
  );
};

export const useLang = (): LangContextData => {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLang must be used within an LangProvider');
  }

  return context;
};
