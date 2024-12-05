/** @format */

'use client'

import { toast } from 'sonner'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { User } from '@supabase/supabase-js'

export function UserInfo({ user }: { user: User }) {
    return (
        <Card>
            <CardContent className='p-6 space-y-4 flex flex-row items-center '>
                <div className='flex items-center space-x-4 w-full'>
                    <Image
                        src={'/defualtAvatar.png'}
                        alt='User avatar'
                        width={50}
                        height={50}
                        className='rounded-full'
                    />
                    <div>
                        <h2 className='text-2xl font-bold'>{user.email}</h2>
                        <p className='text-gray-500'>{user.id}</p>
                    </div>
                </div>
                <Button
                    onClick={() =>
                        toast.warning(
                            'Coming Soon:Editing user information will be available in a future update. But you can edit and share canvases now.'
                        )
                    }
                >
                    Edit Profile
                </Button>
            </CardContent>
        </Card>
    )
}
