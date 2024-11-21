/** @format */

// app/login/page.tsx
'use client' // Since we're handling form inputs on the client-side

import { useState } from 'react'

import { emailLogin } from '../actions'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()
    function toRegister() {
        router.push('/authentication/register')
    }
    async function toSignIn(formData: FormData) {
        const response = await emailLogin(formData)
        if (response.success) {
            toast.success(response.message)
            router.push('/')
        } else {
            toast.error(response.message)
        }
    }

    return (
        <div className='h-screen grid grid-cols-2 gap-3 items-center justify-center bg-customeBG1 p-4  '>
            <div className='p-4 w-full flex justify-center'>
                this is introduce image
            </div>
            <div className='items-center justify-center flex'>
                <div className='flex  w-96'>
                    <form className='bg-customeBG2 border border-customeBorder p-6 rounded-2xl shadow-md max-w-sm w-full gap-6 '>
                        <div className='flex flex-row justify-start '>
                            <Button
                                className='p-0 text-secondary-foreground'
                                variant={'link'}
                                onClick={() => {
                                    console.log('/')
                                    router.push('/')
                                }}
                            >
                                Go back
                            </Button>
                            {/* <button className='w-fit text-sm bg-green-300 hover:bg-slate-100 border border-black border-solid'>
                        Go back
                    </button> */}
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                            <h1 className=' text-2xl mb-6 w-fit px-1'>Login</h1>
                        </div>
                        <div className='gap-4 flex flex-col mb-6'>
                            {/* Email Input */}
                            <div className=''>
                                <label
                                    htmlFor='email'
                                    className='block mb-1.5 text-sm font-medium text-customeText2'
                                >
                                    Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    // link to the formData.get(name)
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full p-2 outline-black border border-customeBorder text-sm'
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className=''>
                                <label
                                    htmlFor='password'
                                    className='block mb-1.5 text-sm font-medium text-customeText2'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    // link to the formData.get(name)
                                    name='password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className='w-full p-2 outline-black border border-customeBorder text-sm'
                                    placeholder='Enter your password'
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        {/* <AsyncButton
                    
                    displayName='Login'
                ></AsyncButton> */}
                        <div className='flex justify-between'>
                            <Button formAction={toSignIn} className='w-16 p-2 '>
                                Login
                            </Button>

                            <div className='text-sm text-customeText2 flex gap-1 items-center'>
                                <span>Not account yet?{' '}</span>
                                <Button
                                    onClick={toRegister}
                                    variant={'link'}
                                    className='w-16 h-full'
                                    type='button'
                                >
                                    sign up
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
