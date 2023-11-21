import { Settings } from 'lucide-react';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SideImage from '../../../assets/sign-in-side.gif';
import { ExternalLink } from '../components/custom/external-link';
import { Icons } from '../components/custom/icons';
import { Logo } from '../components/custom/logo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const SignIn = () => {
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
    <main className="flex h-[100vh]">
      <div className="flex w-[30%] flex-col justify-between p-10">
        <div>
          <div className="flex justify-center">
            <Logo className="w-[100px]" iconClassName="text-black" />
          </div>

          <div className="mt-8">
            <h1 className="mb-8 text-center text-2xl font-bold">Fazer login</h1>
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
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Entrar
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center text-zinc-500">
          <span>Não possuí uma conta?</span>
          <ExternalLink
            href="https://gfchaos.com/beta"
            className="cursor-pointer text-pink-500 hover:text-pink-600"
          >
            Criar conta
          </ExternalLink>
        </div>
      </div>

      <div className="relative flex-1">
        <div className="absolute inset-0 -z-10 bg-zinc-900">
          <img
            src={SideImage}
            className="h-full w-full object-cover "
            alt="Side Image GF Chaos"
          />
        </div>

        <Button className="absolute bottom-0 right-0 mb-4 mr-4 bg-[#f2469850] hover:bg-pink-500">
          <Settings />
        </Button>
      </div>
    </main>
  );
};
