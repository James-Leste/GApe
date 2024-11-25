/** @format */

'use client'

import { BlockProvider } from '@/lib/blockContext'
import InfoBlock from '@/components/blocks/info'

export default function Home() {
    return (
        <BlockProvider>
                <div className='relative flex place-items-center m-4'>
                    <InfoBlock />
                </div>
        </BlockProvider>
    )
}
