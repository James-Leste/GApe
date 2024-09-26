/** @format */

// app/login/page.tsx
'use client' // Since we're handling form inputs on the client-side

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        // Here you can implement login logic (e.g., API call)
        console.log({ email, password })

        // Example login simulation: route to a dashboard page on success
        if (email === 'test@example.com' && password === 'password') {
            router.push('/dashboard')
        } else {
            alert('Invalid credentials')
        }
    }

    return (
        <div className='h-screen flex items-center justify-center'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded-2xl shadow-md max-w-sm w-full'
            >
                <div className='flex flex-row items-center justify-center'>
                    <h1 className=' text-2xl mb-6 w-fit px-1'>Login</h1>
                </div>

                {/* Email Input */}
                <div className='mb-4'>
                    <label
                        htmlFor='email'
                        className='block mb-2 text-sm border border-black border-solid w-fit bg-green-300 px-1'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100 '
                        placeholder='Enter your email'
                        required
                    />
                </div>

                {/* Password Input */}
                <div className='mb-6'>
                    <label
                        htmlFor='password'
                        className='block mb-2 text-sm border border-black border-solid w-fit bg-green-300 px-1'
                    >
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 outline-black border border-slate-100'
                        placeholder='Enter your password'
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full bg-green-300 p-2  hover:bg-slate-200 transition border border-solid border-black'
                >
                    Login
                </button>
            </form>
        </div>
    )
}
