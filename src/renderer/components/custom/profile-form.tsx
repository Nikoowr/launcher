import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLang } from '../../hooks/lang';
import { useUser } from '../../hooks/user';
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

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfileForm = () => {
  const { user } = useUser();
  const { dictionary } = useLang();

  const defaultValues: Partial<ProfileFormValues> = {
    username: user.name,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log('data', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {dictionary.components.custom['profile-form'].USERNAME}
              </FormLabel>
              <FormControl>
                <Input placeholder="babama" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {dictionary.components.custom['profile-form'].EMAIL}
              </FormLabel>
              <Input placeholder="babama@saphael.com" {...field} disabled />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled>
          {dictionary.components.custom['profile-form'].UPDATE_PROFILE}
        </Button>
      </form>
    </Form>
  );
};
