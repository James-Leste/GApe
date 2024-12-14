/** @format */
'use client'
import { Save, Printer } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import Share from '@/components/ui/sharing'
import { toast } from 'sonner'
import { PreviewButton } from './previewButton'

interface HeaderMenuProps {
    children?: React.ReactNode
}
function ToolBar() {
    return (
        <div className='flex justify-between w-full items-center'>
            <div className='flex flex-row gap-1'>
                <Button
                    onClick={() => toast.success('Saved successfully!')}
                    variant={'secondary'}
                    size='icon'
                >
                    <Save className='h-4 w-4' />
                </Button>
            </div>
            <div className='flex justify-between gap-2 items-center'>
                <Button
                    variant={'secondary'}
                    size='icon'
                    onClick={() => window.print()}
                >
                    <Printer className='h-4 w-4' />
                </Button>
                <Share />
                <PreviewButton></PreviewButton>
            </div>
        </div>
    )
}

export default function HeaderMenu({ children }: HeaderMenuProps) {
    const pathname = usePathname()
    const isCanvasPage =
        pathname === '/canvas' ||
        pathname.startsWith('/canvas/edit') ||
        pathname.startsWith('/blocks')
    const isSharePage = pathname.startsWith('/canvas/share')

    return (
        <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur border-b border-customeBorder supports-[backdrop-filter]:bg-background/70 print:hidden  flex justify-center'>
            <div className=' container flex h-14 items-center '>
                <div className='mx-4 gap-4  flex items-center justify-between w-full'>
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

                    <div className='w-10 h-10 flex justify-center mr-8'>
                        {children}
                    </div>
                </div>
            </div>
        </header>
    )
}
