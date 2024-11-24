/** @format */
'use client'
import React, { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

const supabase = createClient()

const UserDataPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [canvas, setCanvas] = useState<any>(null)

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
        let { data: canvas, error } = await supabase.from('canvas').select('*')

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
        </div>
    )
}

export default UserDataPage
