import { useLang } from '../../hooks/lang';
import { Separator } from '../ui/separator';
import { GameForm } from './game-form';

export const SettingsGamePage = () => {
  const { dictionary } = useLang();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {dictionary.components.custom['settings-game-page'].TITLE}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dictionary.components.custom['settings-game-page'].DESCRIPTION}
        </p>
      </div>
      <Separator />
      <GameForm />
    </div>
  );
};
