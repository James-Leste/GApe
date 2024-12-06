/** @format */

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import UserInfo from '@/components/ui/userInfo'
import HeaderMenu from '@/components/ui/headerMenu'
import { Toaster } from '@/components/ui/sonner'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'GApe',
    description:
        'GApe (Get A Page Easily), an interactive design tool for creating one-page content such as a curriculum vitae or leaflets for both personal and commercial use.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning className='h-full'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
            >
                <div className='flex flex-col h-full'>
                    <HeaderMenu>
                        <UserInfo />
                    </HeaderMenu>
                    <div className='flex-grow'>{children}</div>
                </div>

                <Toaster closeButton />
            </body>
        </html>
    )
}
