import { useLang } from '../../hooks/lang';
import { Separator } from '../ui/separator';
import { ProfileForm } from './profile-form';

export const SettingsProfilePage = () => {
  const { dictionary } = useLang();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {dictionary.components.custom['settings-profile-page'].TITLE}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dictionary.components.custom['settings-profile-page'].DESCRIPTION}
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
};
