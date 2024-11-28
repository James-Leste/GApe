/** @format */
'use client'
import {
    Save,
    Forward,
    Undo2,
    Printer,
    Laptop,
    Touchpad,
    Smartphone,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Share from '@/components/ui/sharing'

interface HeaderMenuProps {
    children?: React.ReactNode
}
function ToolBar() {
    return (
        <div className='flex justify-between w-full items-center'>
            <div className='flex flex-row gap-1'>
                <Button variant={'secondary'} size='icon'>
                    <Undo2 className='h-4 w-4' />
                </Button>
                <Button variant={'secondary'} size='icon'>
                    <Forward className='h-4 w-4' />
                </Button>
                <Button variant={'secondary'} size='icon'>
                    <Save className='h-4 w-4' />
                </Button>
            </div>

            <Tabs>
                <TabsList className='grid w-full grid-cols-3'>
                    <TabsTrigger value='pc'>
                        <Laptop className='h-4 w-4' />
                    </TabsTrigger>
                    <TabsTrigger value='pad'>
                        <Touchpad className='h-4 w-4' />
                    </TabsTrigger>
                    <TabsTrigger value='phone'>
                        <Smartphone className='h-4 w-4' />
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <div className='flex justify-between gap-2 items-center'>
                <Button variant={'secondary'} size='icon'>
                    <Printer className='h-4 w-4' />
                </Button>
                <Share />
            </div>
        </div>
    )
}

export default function HeaderMenu({ children }: HeaderMenuProps) {
    const pathname = usePathname()
    const isCanvasPage =
        pathname === '/canvas' || pathname.startsWith('/canvas/edit')
    const isSharePage = pathname.startsWith('/canvas/share')

    return (
        <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur border-b border-customeBorder supports-[backdrop-filter]:bg-background/70'>
            <div className='container flex h-14 max-w-screen-2xl items-center '>
                <div className='mx-4 gap-4 hidden md:flex items-center justify-between w-full'>
                    <div className=' h-full pl-9 pr-9 flex flex-col justify-center items-center '>
                        <div className='text-customeText1 text-2xl font-inter font-semibold break-words'>
                            <a href='/'>GApe</a>
                        </div>
                    </div>
                    {isCanvasPage && <ToolBar />}
                    {isSharePage && (
                        <div className='flex w-full justify-end'>
                            <Share />
                        </div>
                    )}

                    <div className='w-10 h-10 flex justify-center'>
                        {children}
                    </div>

                    {/* <nav className='flex items-center gap-4 text-sm lg:gap-6'>
                        <a
                            className='transition-colors hover:text-foreground/80 text-foreground/60'
                            href='/'
                        >
                            Home
                        </a>
                    </nav> */}
                </div>
            </div>
        </header>
    )
}
