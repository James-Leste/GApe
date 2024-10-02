/** @format */
import { createClient } from '@/utils/supabase/server'

export default async function UserInfo() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    console.log(data.user)

    return (
        <div>
            <h2>
                {error || !data?.user
                    ? 'Welcome to GApe! Login to get full features.'
                    : data.user.email}
            </h2>
        </div>
    )
}
