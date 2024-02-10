import { useLang } from '../../hooks/lang';
import { LangsEnum, i18n } from '../../i18n';
import { cn } from '../../lib/utils';
import { Button, ButtonProps } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Spinner } from './spinner';

export interface LangSwitcherProps extends ButtonProps {}

export const LangSwitcher = ({ className, ...props }: LangSwitcherProps) => {
  const { lang, changeLang, loading } = useLang();

  const onLangChange = async (language: string) => {
    await changeLang(language as LangsEnum);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex h-[40px] w-[46px] items-center justify-center p-0',
            className,
          )}
          {...props}
        >
          {loading ? <Spinner className="size-4" /> : lang}
        </Button>
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
