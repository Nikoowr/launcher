import { Settings } from 'lucide-react';

import { ExternalLink } from '../components/custom/external-link';
import { Logo } from '../components/custom/logo';
import { SignInForm } from '../components/custom/sign-in-form';
import { SignInSideBackground } from '../components/custom/sign-in-side-background';
import { Button } from '../components/ui/button';

export const SignIn = () => {
  return (
    <main className="flex h-[100vh]">
      <div className="flex w-[30%] flex-col justify-between p-10">
        <div>
          <div className="flex justify-center">
            <Logo className="w-[100px]" iconClassName="text-black" />
          </div>

          <div className="mt-8">
            <h1 className="mb-8 text-center text-2xl font-bold">Fazer login</h1>
            <SignInForm />
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
        <SignInSideBackground />

        <Button className="absolute bottom-0 right-0 mb-4 mr-4 bg-[#f2469850] hover:bg-pink-500">
          <Settings />
        </Button>
      </div>
    </main>
  );
};
