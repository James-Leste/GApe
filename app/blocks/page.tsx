/** @format */

'use client'

import { BlockProvider } from '@/lib/blockContext'
import InfoBlock from '@/components/blocks/info'
import BlockSheet from '@/components/blocks/Context-sheet'

export default function Home() {
    return (
        <BlockProvider>
            <main className='flex min-h-screen flex-col items-center justify-between p-24'>
                <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
                    <h1 className='text-4xl font-bold mb-8'>Info Block Demo</h1>
                </div>
                <div className='relative flex place-items-center'>
                    <InfoBlock />
                </div>
                <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
                    <BlockSheet />
                </div>
            </main>
        </BlockProvider>
    )
}
