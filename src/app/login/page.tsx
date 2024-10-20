'use client'

import { loginAction } from '@/actions/user';
import Link from 'next/link'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation';
import toast, { LoaderIcon } from "react-hot-toast"

function LoginPage() { 
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClickLoginAction = async (formData: FormData) => {
        startTransition(async () => {
            const {errorMessage} = await loginAction(formData)
            
            if (!errorMessage) {
                router.replace("/")
                toast.success("Successfully logged in");
            } else {
                toast.error(errorMessage)
            }
        })
    }

  return (
    <main className='flex min-h-screen items-center justify-center px-4 pb-24'>
        <div className='bg-popover relative flex w-full max-w-sm flex-col items-center rounded-lg border p-8'>
            <h1 className={`text-white mb-8 text-2xl font-semibold ${isPending && "opacity-0"}`} >Login</h1>

            {isPending && (
                <div className="text-white absolte left-1/2 top-1/2 flex-translate-x-1/2 -translate-y-1/2 flex col items-center gap-y-2">
                    <p>Logging in...</p>
                    <LoaderIcon className="size-6 animate-spin"/>
                </div>
            )}

            <form className={`flex w-full flex-col gap-4 ${isPending && "-z-10 opacity-0"}`}
            action={handleClickLoginAction}
            >
                <input 
                className='border border-zinc-800 rounded-md p-4'
                 type="text"
                  name="email"
                   placeholder="Email"
                    required 
                    disabled={isPending}
                    />
                <input 
                className='border border-zinc-800 rounded-md p-4'
                 type="password"
                  name="password"
                   placeholder="Password"
                    required 
                    disabled={isPending}
                    />
                <button className='border border-zinc-800 rounded-md p-2 bg-green-500 text-white font-semibold text-xl'>Login</button>

                <p className='mt-3 text-center text-xs'>
                    Don't have an account? 
                    <Link href='/create-account' className='hover:text-purple-500 ml-2 underline transition-colors durations-200 ease-in-out'>
                    Create Account
                    </Link>
                </p>
            </form>
        </div>
    </main>
  )
}

export default LoginPage