import { Label } from '@radix-ui/react-label';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Icons } from './icons';

export const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);

    navigate('/home');
  };

  return (
    <form onSubmit={onSignIn}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="" htmlFor="user">
            Nome de usuário
          </Label>
          <Input
            autoCapitalize="none"
            autoCorrect="off"
            type="text"
            name="user"
            id="user"
          />

          <Label className="mt-2" htmlFor="password">
            Senha
          </Label>
          <Input
            autoCapitalize="none"
            autoCorrect="off"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <Button disabled={loading} className="mt-2">
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </div>
    </form>
  );
};
