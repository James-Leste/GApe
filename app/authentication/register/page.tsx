/** @format */

'use client' // Since we're handling form inputs on the client-side

import { useState } from 'react'
import { emailSignup } from '../actions'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    return (
        <div className='h-screen flex items-center justify-center'>
            <form className='bg-slate-50 p-8 rounded-2xl shadow-md max-w-sm w-full'>
                <div className='flex flex-row justify-start'>
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
                    <h1 className=' text-2xl mb-6 w-fit px-1'>Register</h1>
                </div>

                {/* Email Input */}
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2 text-sm w-fit'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100 text-sm'
                        placeholder='Enter your email'
                        required
                    />
                </div>

                {/* Password Input */}
                <div className='mb-4'>
                    <label
                        htmlFor='password'
                        className='block mb-2 text-sm w-fit'
                    >
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100 text-sm'
                        placeholder='Enter your password'
                        required
                    />
                </div>

                <div className='mb-6'>
                    <label
                        htmlFor='confirmpassword'
                        className='block mb-2 text-sm'
                    >
                        Password
                    </label>
                    <input
                        type='password'
                        id='confirmpassword'
                        name='confirmpassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100 text-sm'
                        placeholder='Enter your password again'
                        required
                    />
                </div>

                {/* Submit Button */}
                {/* <AsyncButton
                    func={async () => {
                        if (password !== confirmPassword) {
                            router.push('/authentication/error')
                            return
                        }

                        await emailSignup(email, password)
                        router.push('/')
                    }}
                    displayName='Login'
                ></AsyncButton> */}
                <button
                    formAction={emailSignup}
                    className='w-full bg-green-300 p-2  hover:bg-slate-200 transition border border-solid border-black'
                >
                    Login
                </button>
            </form>
        </div>
    )
}
