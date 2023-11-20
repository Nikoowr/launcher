import { LogoTypesEnum } from '../../constants/ui.constants';
import { cn } from '../../lib/utils';
import { IconProps, Icons } from './icons';

interface LogoProps extends IconProps {
  iconClassName?: string;
  logoType?: LogoTypesEnum;
  className?: string;
}

export const Logo = ({
  logoType = LogoTypesEnum.Text,
  iconClassName = '',
  className,
  ...props
}: LogoProps) => {
  const LogoIcon =
    logoType === LogoTypesEnum.Sprite ? Icons.logoSprite : Icons.logoText;

  return (
    <div className={className}>
      <LogoIcon
        className={cn('text-black dark:text-white', iconClassName)}
        {...props}
      />
    </div>
  );
};
