/** @format */

'use client' // Since we're handling form inputs on the client-side

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RoutingButton from '@/components/ui/routingButton'
import { login, signup } from '../actions'

export default function RegisterPage() {
    const [email, setEmail]: [email: string, setEmail: Function] = useState('')
    const [password, setPassword]: [password: string, setPassword: Function] =
        useState('')
    const [confirmPassword, setConfirmPassword]: [
        confirmPassword: string,
        setConfirmPassword: Function,
    ] = useState('')
    const router = useRouter()

    return (
        <div className='h-screen flex items-center justify-center'>
            <form className='bg-slate-50 p-8 rounded-2xl shadow-md max-w-sm w-full'>
                <div className='flex flex-row justify-start'>
                    <RoutingButton
                        routing='/'
                        displayName='Go Back'
                        className='w-fit text-sm bg-green-300 hover:bg-slate-100 border border-black border-solid px-1'
                    ></RoutingButton>
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100 text-sm'
                        placeholder='Enter your password again'
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    formAction={signup}
                    className='w-full bg-green-300 p-2 hover:bg-slate-200 transition border border-solid border-black'
                >
                    Login
                </button>
            </form>
        </div>
    )
}
