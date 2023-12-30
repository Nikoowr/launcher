import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLang } from '../../hooks/lang';
import { useUser } from '../../hooks/user';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { toast } from '../ui/use-toast';
import { Icons } from './icons';

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dob: z
    .date({
      required_error: 'A date of birth is required.',
    })
    .optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export const AccountForm = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useUser();

  const defaultValues: Partial<AccountFormValues> = {
    dob: user.dof ? new Date(user.dof) : undefined,
    name: user.name,
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const { dictionary } = useLang();

  const onSubmit = async (data: AccountFormValues) => {
    setLoading(true);

    try {
      await updateUser({
        user: {
          dof: data?.dob?.toISOString(),
          name: data.name,
        },
      });

      toast({
        title: 'Dados atualizados!',
        type: 'foreground',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        type: 'foreground',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {dictionary.components.custom['account-form'].NAME}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    dictionary.components.custom['account-form']
                      .NAME_PLACEHOLDER
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {dictionary.components.custom['account-form'].NAME_DESCRIPTION}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                {dictionary.components.custom['account-form'].DOB}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>
                          {
                            dictionary.components.custom['account-form']
                              .DOB_PICK_A_DATE
                          }
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date('1900-01-01')
                    // }
                    initialFocus
                    disabled
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {dictionary.components.custom['account-form'].DOB_DESCRIPTION}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {dictionary.components.custom['account-form'].UPDATE_ACCOUNT}
        </Button>
      </form>
    </Form>
  );
};
