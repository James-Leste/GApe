/** @format */

// app/login/page.tsx
'use client' // Since we're handling form inputs on the client-side

import { useState } from 'react'
import RoutingButton from '@/components/ui/routingButton'
import { login } from '../actions'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault()

    //     // Here you can implement login logic (e.g., API call)
    //     console.log({ email, password })

    //     // Example login simulation: route to a dashboard page on success
    //     if (email === 'test@example.com' && password === 'password') {
    //         router.push('/dashboard')
    //     } else {
    //         alert('Invalid credentials')
    //     }
    // }

    return (
        <div className='h-screen flex items-center justify-center'>
            <form className='bg-slate-50 p-8 rounded-2xl shadow-md max-w-sm w-full'>
                <div className='flex flex-row justify-start'>
                    <RoutingButton
                        routing='/'
                        displayName='Go Back'
                        className='w-fit text-sm bg-green-300 hover:bg-slate-100 border border-black border-solid px-1'
                    ></RoutingButton>
                    {/* <button className='w-fit text-sm bg-green-300 hover:bg-slate-100 border border-black border-solid'>
                        Go back
                    </button> */}
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <h1 className=' text-2xl mb-6 w-fit px-1'>Login</h1>
                </div>

                {/* Email Input */}
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2 text-sm w-fit'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        // link to the formData.get(name)
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100 text-sm'
                        placeholder='Enter your email'
                        required
                    />
                </div>

                {/* Password Input */}
                <div className='mb-6'>
                    <label htmlFor='password' className='block mb-2 text-sm '>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        // link to the formData.get(name)
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100 text-sm'
                        placeholder='Enter your password'
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    formAction={login}
                    className='w-full bg-green-300 p-2  hover:bg-slate-200 transition border border-solid border-black'
                >
                    Login
                </button>
            </form>
        </div>
    )
}
