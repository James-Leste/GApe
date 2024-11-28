/** @format */
import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'
import AsyncButton from '@/components/ui/asyncButton'
import { signout } from '@/app/authentication/actions'
import Image from 'next/image'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Button } from './button'
import Link from 'next/link'


export default async function UserInfo() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    const userId = data.user?.id
    const userUrl = `/user/${userId}`

    function User({ userdata }: { userdata: User }) {
        return (
            <HoverCard openDelay={0}>
                <HoverCardTrigger className='size-10'>
                    <Image
                        height={40}
                        width={40}
                        alt='userAvater'
                        className='w-10 h-10 rounded-[40px]'
                        src='/defualtAvatar.png'
                    />
                </HoverCardTrigger>
                <HoverCardContent>
                    <div className='flex flex-col gap-2 items-center'>
                        {userdata.email}
                        <AsyncButton func={signout} displayName='Sign out' />
                        <Link href={userUrl}>
                            <Button>My Profile</Button>
                        </Link>
                    </div>
                </HoverCardContent>
            </HoverCard>
        )
    }

    return (
        <div className='items-center flex'>
            <div className='text-customeText1'>
                {error || !data?.user ? (
                    <a href='/authentication/login'>Login</a>
                ) : (
                    <div className='size-10'>
                        <User userdata={data.user} />
                    </div>
                )}
            </div>
        </div>
    )
}
