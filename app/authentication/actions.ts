/** @format */

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function emailLogin(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true, message: 'User has successfully logged in.' }
}

export async function emailSignup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        return { success: false, message: error.message }
    }

    return {
        success: true,
        message: 'Please check your email to confirm your signup.',
    }
}

export async function signout() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log(error)
        redirect('/authentication/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
