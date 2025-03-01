'use client'

import { ButtonHTMLAttributes,FC, useState } from 'react'
import Button from './ui/Button'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Loader2, LogOut } from 'lucide-react'

const SignoutButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  return <Button {...props} variant='ghost' onClick={async () => {
    setIsSigningOut(true)
    try {
        await signOut()
    } catch (error) {
      console.log("error signing out", error)
        toast.error('There was a problem signing out')
    } finally {
        setIsSigningOut(false)
    }
  }}>
    {isSigningOut ? (
        <Loader2 className='animate-spin h-4 w-4' />
    ) : (
        <LogOut className='h-4 w-4' />
    )}
  </Button>
}

export default SignoutButton