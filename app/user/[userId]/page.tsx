/** @format */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserInfo } from './user-info'
import { CanvasList } from './canvas-list'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { toast } from 'sonner'
import { addCanvas } from '@/app/canvas/actions'

export default function UserPage() {
    const supabase = createClient()

    const [user, setUser] = useState<User | null>(null)
    interface Canvas {
        id: string
        name: string
        userId: string
        create_at: string
    }

    const [canvases, setCanvases] = useState<Canvas[]>([])
    const [error, setError] = useState<string | null>(null)
    const [canvasName, setCanvasName] = useState<string>('')

    async function fetchCanvases(id: string) {
        const { data: canvasData, error: canvasError } = await supabase
            .from('canvas')
            .select('*')
            .eq('userId', id)

        if (canvasError) {
            setError(canvasError.message)
            return
        }
        setCanvases(canvasData)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                setError(error.message)
                return
            }
            setUser(data.user)
            fetchCanvases(data.user.id)
        }

        fetchData()
    }, [supabase])

    const createNewCanvas = async (id: string) => {
        const data = await addCanvas(id, canvasName)
        if (!data) {
            toast.error('Error creating canvas')
            return
        }
        toast.success('Canvas created successfully')
        setCanvases((prevCanvases) => [...prevCanvases, ...data])
    }

    async function deleteCanvas(id: string) {
        const { error } = await supabase.from('canvas').delete().eq('id', id)
        if (error) {
            console.error(error)
            toast.error('Error deleting canvas')
            return
        }
        user && fetchCanvases(user.id)
        toast.success('Canvas deleted successfully')
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className='bg-customeBG1 min-h-full'>
            <div className='container mx-auto p-4 space-y-8 '>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold text-customeText2'>
                        User Information
                    </h1>
                    <Link href='/'>
                        <Button variant='outline'>Back to Home</Button>
                    </Link>
                </div>
                <UserInfo user={user} />
                <div>
                    <div className='flex flex-row items-center justify-between'>
                        <h2 className='text-2xl font-bold mb-4 text-customeText2'>
                            Your Canvases
                        </h2>

                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant='link'>create new</Button>
                            </HoverCardTrigger>
                            <HoverCardContent className='w-80'>
                                <div className='flex justify-between space-x-4'>
                                    <Label htmlFor='canvasName'>
                                        Canvas Name
                                    </Label>
                                    <Input
                                        value={canvasName}
                                        onChange={(e) =>
                                            setCanvasName(e.target.value)
                                        }
                                        className='h-8'
                                        id='canvasName'
                                    />
                                    <Button
                                        onClick={() => createNewCanvas(user.id)}
                                    >
                                        confirm
                                    </Button>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    {canvases.length > 0 && (
                        <CanvasList
                            canvases={canvases}
                            deleteCanvas={deleteCanvas}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
