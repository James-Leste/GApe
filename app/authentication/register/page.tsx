/** @format */

'use client' // Since we're handling form inputs on the client-side

import { useState } from 'react'
import { emailSignup } from '../actions'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    function toLogin() {
        router.push('/authentication/login')
    }
    async function handleSignup(event: FormData) {
        const response = await emailSignup(event)
        console.log(response)
        const email = event.get('email') as string
        const emailDomain = email.split('@')[1]

        if (response.success) {
            toast(response.message, {
                action: {
                    label: 'GO',
                    onClick: () =>
                        window.open(`https://${emailDomain}`, '_blank'),
                },
            })
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
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                            <h1 className=' text-2xl mb-6 w-fit px-1'>
                                Register
                            </h1>
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
                            <div className=''>
                                <label
                                    htmlFor='confirmpassword'
                                    className='block mb-1.5 text-sm font-medium text-customeText2'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='confirmpassword'
                                    name='confirmpassword'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className='w-full p-2 outline-black border border-customeBorder text-sm'
                                    placeholder='Enter your password again'
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='flex justify-between'>
                            <Button formAction={handleSignup} className=' p-2 '>
                                Sign up
                            </Button>

                            <div className='text-sm text-customeText2 flex gap-1 items-center'>
                                <span>Already have account?</span>
                                <Button
                                    onClick={toLogin}
                                    variant={'link'}
                                    className=' h-full'
                                    type='button'
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
