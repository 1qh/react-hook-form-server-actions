'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'

type SubmitButtonProps = ButtonProps & {
  children: React.ReactNode
}

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button {...props} disabled={pending} className={className}>
      {pending ? <Loader2 className='animate-spin' /> : children}
    </Button>
  )
}
