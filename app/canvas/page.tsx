/** @format */
'use client'
import RoutingButton from '@/components/ui/routingButton'

import React, { useState } from 'react'

interface BlockItem {
    name: string
    description: string
    icon: string
}

const BlockList: BlockItem[] = [
    {
        name: 'Info',
        description: 'Personal information and contact details',
        icon: 'info-circle',
    },
    {
        name: 'Education',
        description: 'Educational background and qualifications',
        icon: 'graduation-cap',
    },
    {
        name: 'Project',
        description: 'Projects and portfolio',
        icon: 'project-diagram',
    },
    {
        name: 'Work Experience',
        description: 'Professional work experience',
        icon: 'briefcase',
    },
    { name: 'Skills', description: 'Technical and soft skills', icon: 'tools' },
    {
        name: 'Language',
        description: 'Languages spoken and proficiency',
        icon: 'language',
    },
    {
        name: 'GitHub',
        description: 'GitHub profile and repositories',
        icon: 'github',
    },
    {
        name: 'Listening',
        description: 'Favorite podcasts and audio content',
        icon: 'headphones',
    },
    {
        name: 'Stories',
        description: 'Personal stories and blog posts',
        icon: 'book-open',
    },
]
function Block({ block }: { block: BlockItem }) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(block))
    }

    return (
        <div
            className='bg-green-700 w-full h-full p-1'
            draggable
            onDragStart={handleDragStart}
        >
            <div className='font-bold'>{block.name}</div>
            <div>icon</div>
            <div className='font-light'>{block.description}</div>
        </div>
    )
}

export default function Home() {
    const [canvasBlocks, setCanvasBlocks] = useState<BlockItem[]>([])

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const blockData = e.dataTransfer.getData('text/plain')
        const block = JSON.parse(blockData)
        setCanvasBlocks([...canvasBlocks, block])
    }

    return (
        <div className='flex flex-col'>
            <div className='grid grid-cols-6 min-h-screen h-screen gap-8 p-2 font-[family-name:var(--font-geist-sans)]'>
                <div
                    className='bg-red-400 col-span-4 h-full grid grid-cols-4 grid-rows-4 gap-2 p-2'
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {canvasBlocks.map((block, index) => (
                        <Block block={block} key={index} />
                    ))}
                </div>
                <div className='bg-green-400 p-2 col-span-2 flex flex-col gap-2'>
                    <div className='bg-green-700 p-1'>search</div>
                    <div className='h-full grid grid-cols-2 gap-2'>
                        {BlockList.map((block, index) => (
                            <Block block={block} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
