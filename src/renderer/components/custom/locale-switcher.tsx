import { LocalesEnum, i18n } from '../../i18n';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const LocaleSwitcher = () => {
  const locale = LocalesEnum.PT;

  const onLocaleChange = (locale: string) => {
    console.log('locale', locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{locale}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={locale} onValueChange={onLocaleChange}>
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
