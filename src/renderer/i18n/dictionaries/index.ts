import { LangsEnum } from '..';
import { enDictionary } from './en';
import { esDictionary } from './es';
import { frDictionary } from './fr';
import { ptDictionary } from './pt';

export const dictionaries = {
  [LangsEnum.PT]: ptDictionary,
  [LangsEnum.EN]: enDictionary,
  [LangsEnum.FR]: frDictionary,
  [LangsEnum.ES]: esDictionary,
};

export const getDictionary = (lang?: LangsEnum) =>
  lang
    ? dictionaries[lang] ?? dictionaries[LangsEnum.PT]
    : dictionaries[LangsEnum.PT];
