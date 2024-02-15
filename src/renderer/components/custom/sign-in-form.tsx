import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useAuth } from '../../hooks/auth';
import { useLang } from '../../hooks/lang';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { ExternalLink } from './external-link';
import { Icons } from './icons';

export const SignInForm = () => {
  const { dictionary: localeDictionary } = useLang();
  const dictionary = localeDictionary.components.custom['sign-in-form'];
  const { login, loading } = useAuth();

  const signInSchema = z.object({
    email: z
      .string({
        required_error: dictionary.FORM_EMAIL_ERROR,
      })
      .email({ message: dictionary.FORM_EMAIL_ERROR }),
    password: z.string({
      required_error: dictionary.FORM_PASSWORD_ERROR,
    }),
  });

  type SignInFormValues = z.infer<typeof signInSchema>;

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {},
    mode: 'onSubmit',
  });

  const onSubmit = async ({ email, password }: SignInFormValues) => {
    await login(
      { password, email },
      {
        error: {
          title: dictionary.TOAST_ERROR_TITLE,
          description: dictionary.TOAST_ERROR_DESCRIPTION,
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{dictionary.EMAIL}</FormLabel>
                  <FormControl>
                    <Input
                      autoCapitalize="none"
                      autoCorrect="off"
                      type="email"
                      id="email"
                      required
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel htmlFor="email">{dictionary.PASSWORD}</FormLabel>
                  <FormControl>
                    <Input type="password" id="password" required {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <ExternalLink
              className="cursor-pointer text-right text-xs text-muted-foreground hover:text-pink-500"
              href="https://gfchaos.com/recovery-password"
            >
              Esqueceu a senha?
            </ExternalLink>
          </div>

          <Button disabled={loading} className="mt-2" type="submit">
            <>
              {loading && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              {dictionary.LOGIN}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
};
