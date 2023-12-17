import { useLang } from '../../hooks/lang';
import { Separator } from '../ui/separator';
import { AccountForm } from './account-form';

export const SettingsAccountPage = () => {
  const { dictionary } = useLang();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {dictionary.components.custom['settings-account-page'].TITLE}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dictionary.components.custom['settings-account-page'].DESCRIPTION}
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
};
