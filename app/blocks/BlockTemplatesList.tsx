/** @format */

'use client'

import { useState, useEffect, use } from 'react'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { InfoBlock_L, InfoBlock_M } from '@/components/blocks/info-block'
import { EduBlock_L, EduBlock_M } from '@/components/blocks/edu-block'
import { EduBlockData, InfoBlockData } from '@/components/blocks/blockType'
type blockType = EduBlockData | InfoBlockData

export default function BlockTemplatesList({
    onBlockClick,
}: {
    onBlockClick: (block: blockType,componentName:string) => void
}) {
    const supabase = createClient()
    interface Template {
        id: string
        name: string
        description: string
        cover_url: string
        content: blockType
        // Add other fields as necessary
    }

    const [templates, setTemplates] = useState<Template[]>([])
    useEffect(() => {
        const fetchTemplates = async () => {
            const { data, error } = await supabase.from('templates').select()

            if (error) {
                console.error('Error fetching templates:', error)
                toast.error('Failed to fetch templates')
            } else {
                setTemplates(data)
            }
        }

        fetchTemplates()
    }, [])

    const componentMap: { [key: string]: (content: blockType) => JSX.Element } =
        {
            Info: (content: blockType) => {
                const InfoContent = content as InfoBlockData
                return (
                    <>
                        <InfoBlock_M
                            onBlockClick={onBlockClick}
                            showDelete={false}
                            block_data={InfoContent}
                        />
                        <InfoBlock_L
                            onBlockClick={onBlockClick}
                            showDelete={false}
                            block_data={InfoContent}
                        />
                    </>
                )
            },
            Education: (content: blockType) => {
                const eduContent = content as EduBlockData
                return (
                    <>
                        <EduBlock_M
                            onBlockClick={onBlockClick}
                            showDelete={false}
                            block_data={eduContent}
                        />
                        <EduBlock_L
                            onBlockClick={onBlockClick}
                            showDelete={false}
                            block_data={eduContent}
                        />
                    </>
                )
            },
            // Add other mappings here
        }

    return (
        <>
            {templates.map((template) => (
                <HoverCard key={template.id}>
                    <HoverCardTrigger asChild>
                        <div className='h-[137px] p-2 bg-[#ede1d1] rounded-xl border-2 border-[#a69986] flex-col justify-start items-start gap-2 inline-flex'>
                            <div className='text-[#0e3c26] text-lg font-semibold leading-7'>
                                {template.name}
                            </div>
                            <img src={template.cover_url} className='size-11' />
                            <div className='self-stretch text-[#0e3c26] text-xs font-medium leading-tight'>
                                {template.description}
                            </div>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className='flex flex-row gap-5 w-fit items-center'>
                        {componentMap[template.name]?.(template.content) ||
                            null}
                    </HoverCardContent>
                </HoverCard>
            ))}
        </>
    )
}
