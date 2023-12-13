import { useLang } from '../../hooks/lang';
import { LangsEnum, i18n } from '../../i18n';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const LangSwitcher = () => {
  const { lang, changeLang } = useLang();

  const onLangChange = (language: string) => {
    changeLang(language as LangsEnum);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{lang}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={lang} onValueChange={onLangChange}>
          {i18n.locales.map((i18nLocale) => (
            <DropdownMenuRadioItem key={i18nLocale} value={i18nLocale}>
              {i18nLocale}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
