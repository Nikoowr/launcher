import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Dictionary, LangsEnum } from '../i18n';
import { getDictionary } from '../i18n/dictionaries';

type LangProviderProps = {
  children: ReactNode;
};

type LangContextData = {
  changeLang: (Lang: LangsEnum) => void;
  dictionary: Dictionary;
  lang: LangsEnum;
};

const LangContext = createContext<LangContextData>({} as LangContextData);

export const LangProvider = ({ children }: LangProviderProps) => {
  const [lang, setLang] = useState(LangsEnum.PT);
  const [dictionary, setDictionary] = useState(getDictionary(lang));

  const changeLang = (language: LangsEnum) => {
    setLang(language);
  };

  useEffect(() => {
    setDictionary(getDictionary(lang));
  }, [lang]);

  return (
    <LangContext.Provider
      value={{
        changeLang,
        dictionary,
        lang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useLang = (): LangContextData => {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLang must be used within an LangProvider');
  }

  return context;
};
