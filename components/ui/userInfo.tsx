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

export default async function UserInfo() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    console.log(data.user)

    function User({ userdata }: { userdata: User }) {
        return (
            <HoverCard>
                <HoverCardTrigger>
                    <Image
                        height={40}
                        width={40}
                        alt='userAvater'
                        className='w-10 h-10 rounded-[40px]'
                        src='/defualtAvatar.png'
                    />
                </HoverCardTrigger>
                <HoverCardContent>
                    <div className='flex flex-col gap-2'>
                    {userdata.email}
                    <AsyncButton func={signout} displayName='Sign out' />{' '}
                    </div>
               
                  
                </HoverCardContent>
            </HoverCard>
        )
    }

    return (
        <div>
            <h2 className='text-customeText1'>
                {error || !data?.user ? (
                    <a href='/authentication/login'>Login</a>
                ) : (
                    <div>
                        <User userdata={data.user} />
                    </div>
                )}
            </h2>
        </div>
    )
}
