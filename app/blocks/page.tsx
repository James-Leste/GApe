/** @format */

'use client'

import InfoBlock from '@/components/blocks/info/info-block'
import { InfoBlock_L,InfoBlock_M } from '@/components/blocks/info/info-block';
import { useState } from 'react'

export default function Blocks() {
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

    const handleBlockClick = (block: string) => {
        setSelectedBlocks([...selectedBlocks, block]);
    };

    const handleBlockDelete = (index: number) => {
        setSelectedBlocks(selectedBlocks.filter((_, i) => i !== index));
    };

    const renderBlock = (block: string, index: number) => {
        switch (block) {
            case 'InfoBlock_L':
                return <InfoBlock_L key={index} onBlockClick={() => {}} onDelete={() => handleBlockDelete(index)} showDelete={true} />;
            case 'InfoBlock_M':
                return <InfoBlock_M key={index} onBlockClick={() => {}} onDelete={() => handleBlockDelete(index)} showDelete={true} />;
            default:
                return null;
        }
    };

    return (
        <div className='p-4 h-full'>
            <div className='h-4/6 w-full grid grid-cols-3 '>
                {selectedBlocks.map((block, index) => renderBlock(block, index))}
            </div>
            <InfoBlock onBlockClick={handleBlockClick} />
        </div>
    )
}
