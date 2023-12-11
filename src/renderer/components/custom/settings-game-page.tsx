import { Separator } from '../ui/separator';
import { GameForm } from './game-form';

export const SettingsGamePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Game</h3>
        <p className="text-sm text-muted-foreground">
          Set game settings such as resolution, FPS, graphics, etc.
        </p>
      </div>
      <Separator />
      <GameForm />
    </div>
  );
};
