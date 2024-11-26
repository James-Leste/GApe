/** @format */
'use client'
import React, { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import InfoBlock from '@/components/blocks/info'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

const Counter = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}

const supabase = createClient()

const UserDataPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<Error | null>(null)
    useEffect(() => {
        const getUser = () => {
            supabase.auth.getUser().then(({ data, error }) => {
                if (error) {
                    setError(error)
                } else {
                    setUser(data.user)
                }
            })
        }

        getUser()
    }, [])

    const insert = async () => {
        const { data, error } = await supabase.from('canvas').insert([
            {
                userId: user ? user.id : '',
                // create_at: new Date(),
            },

            {
                userId: user ? user.id : '',
                // create_at: new Date(),
            },
        ])
    }

    const showdata = async () => {
        const { data: canvas, error } = await supabase
            .from('canvas')
            .select('*')

        console.log(canvas)
    }

    return (
        <div>
            <div>
                <h1>User Data Page</h1>
                <p>Welcome to the user data page.</p>
                <p>Hello {user?.email}</p>
                <p></p>
            </div>
            <div>
                <Button>hello</Button>
                <Button onClick={insert}>create new canvas</Button>
                <Button onClick={showdata}>add new item</Button>
            </div>
            <div>
                <div className='flex flex-row gap-5'>
                    <InfoBlock></InfoBlock>
                    <InfoBlock></InfoBlock>
                    <InfoBlock></InfoBlock>
                    <InfoBlock></InfoBlock>
                </div>
            </div>
            <div>
                <Counter></Counter>
                <Counter></Counter>
            </div>
            <div>
                <div className='grid grid-cols-2 gap-2'>
                    <Sheet key='bottom' modal={false}>
                        <SheetTrigger asChild>
                            <Button variant='outline'>bottom</Button>
                        </SheetTrigger>
                        <SheetContent side='bottom' className='bg-white'>
                            {/* <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className='grid gap-4 py-4'></div> */}
                            <div className='flex flex-row gap-5'>
                                <InfoBlock key={1}></InfoBlock>
                                <InfoBlock key={2}></InfoBlock>
                                <InfoBlock key={3}></InfoBlock>
                                <InfoBlock key={4}></InfoBlock>
                            </div>

                            <SheetFooter></SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default UserDataPage
