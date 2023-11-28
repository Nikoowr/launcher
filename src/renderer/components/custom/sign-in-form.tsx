import { Label } from '@radix-ui/react-label';
import { SyntheticEvent, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Icons } from './icons';

export const SignInForm = () => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const { login, loading } = useAuth();

  const onSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();
    login({ user, password });
  };

  return (
    <form onSubmit={onSignIn}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="" htmlFor="user">
            Nome de usuário
          </Label>
          <Input
            onChange={(event) => setUser(event.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            value={user}
            type="text"
            name="user"
            id="user"
          />

          <Label className="mt-2" htmlFor="password">
            Senha
          </Label>
          <Input
            onChange={(event) => setPassword(event.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            value={password}
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
