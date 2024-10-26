/** @format */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

export default function Layout() {
    const router = useRouter()
    return (
        <div className='flex flex-col flex-grow items-center justify-center'>
            <div className='h-screen w-full flex items-center justify-center py-10'>
                {/* <header>This is header</header> */}
                <Card className='shadow-md rounded-3xl h-fit w-fit bg-slate-50 p-5 border-hidden'>
                    <CardHeader>
                        <HoverCard>
                            <HoverCardTrigger asChild className='mt-5 mb-0'>
                                <Button
                                    asChild
                                    variant={'link'}
                                    className='text-xl text-secondary-foreground font-bold'
                                >
                                    <Link href='https://github.com/James-Leste/GApe'>
                                        @GApe
                                    </Link>
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent side='top'>
                                <div className='flex justify-between space-x-4'>
                                    {/* <Avatar>
                                        <AvatarImage src='https://github.com/vercel.png' />
                                        <AvatarFallback>VC</AvatarFallback>
                                    </Avatar> */}
                                    <div className='space-y-1'>
                                        <h4 className='text-xl font-semibold'>
                                            @GApe
                                        </h4>
                                        <p className='text-sm'>
                                            An Interactive Tool for generating
                                            One-Page Content
                                        </p>
                                        <div className='flex items-center pt-2'>
                                            <span className='text-xs text-muted-foreground'>
                                                Joined October 2024
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-row item-center justify-center'>
                            <Button
                                className='mx-5 border border-solid border-secondary-foreground'
                                onClick={() => {
                                    console.log('/authentication/login')
                                    router.push('/authentication/login')
                                }}
                            >
                                Login
                            </Button>

                            <Button
                                className='mx-5 border border-solid border-secondary-foreground'
                                variant={'outline'}
                                onClick={() => {
                                    console.log('/authentication/register')
                                    router.push('/authentication/register')
                                }}
                            >
                                Register
                            </Button>

                            <Button
                                className='mx-5 border border-solid border-secondary-foreground'
                                variant={'outline'}
                                onClick={() => {
                                    console.log('/canvas')
                                    router.push('/canvas')
                                }}
                            >
                                Canvas
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-row content-center justify-start mx-5'>
                        <a href='#intro' className='text-muted-foreground'>
                            About
                        </a>
                        {/* <p className='text-muted-foreground'>About</p> */}
                    </CardFooter>
                </Card>
            </div>
            <div className='h-screen w-full flex flex-col items-center justify-center bg-customeBG1'>
                <h1 id='intro' className='text-customeText2'>Introduction</h1>
            </div>
        </div>
    )
}
