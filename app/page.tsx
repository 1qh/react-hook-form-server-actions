'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { handleForm } from '@/actions'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormAction } from '@/hooks/use-form-action'

import { SubmitButton } from './submit-button'

const formSchema = z
  .object({
    email: z.string().email().min(1),
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    birthday: z.string().transform(Date),
    password: z.string().min(4, 'Minimum 4 characters'),
    confirmPassword: z.string().min(4, 'Minimum 4 characters')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export default function Page() {
  const form = useFormAction<z.infer<typeof formSchema>>({
    schema: formSchema,
    resolver: zodResolver(formSchema)
  })

  return (
    <Form {...form}>
      <form
        action={() =>
          form.handleAction(async (formData: any) => {
            await handleForm(formData)
          })
        }>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='First Name' value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Last Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthday'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='date' placeholder='Birthday' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Password' {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Confirm Password' {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className='w-full'>Submit</SubmitButton>
      </form>
    </Form>
  )
}
