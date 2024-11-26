/** @format */

'use client'

import { InfoBlock_L, InfoBlock_M } from '@/components/blocks/info-block'
import { EduBlock_L, EduBlock_M } from '@/components/blocks/edu-block'
import { ArrowUp } from 'lucide-react'
import { useState, useEffect, use } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import EditBlockContent from '@/components/blocks/edit-block-content'
import { toast } from 'sonner'
import BlockTemplatesList from './BlockTemplatesList'
import { EduBlockData, InfoBlockData } from '@/components/blocks/blockType'


export default function Blocks() {
    const [selectedBlocks, setSelectedBlocks] = useState<(EduBlockData | InfoBlockData)[]>([])
    const [editingBlock, setEditingBlock] = useState<string | null>(null)

    useEffect(() => {
        // Fetch existing blocks when the component mounts
        fetchBlocks()
    }, [])

    const fetchBlocks = async () => {
        try {
            const response = await fetch('/api/blocks')
            if (!response.ok) {
                throw new Error('Failed to fetch blocks')
            }
            const data = await response.json()
            setSelectedBlocks(data.blocks)
        } catch (error) {
            console.error('Error fetching blocks:', error)
            toast.error('Failed to fetch blocks')
        }
    }

    const handleBlockClick = async (block:EduBlockData|InfoBlockData,componentName:string ) => {
       
        try {
            const response = await fetch('/api/blocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({block:block,componentName:componentName}),
            })

            if (!response.ok) {
                throw new Error('Failed to create block')
            }

            const result = await response.json()
            setSelectedBlocks([...selectedBlocks, result.block])
            toast.success('Block created')
        } catch (error) {
            console.error('Error creating block:', error)
            toast.error('Failed to create block')
        }
    }

    const handleBlockDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/blocks?id=${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete block')
            }

            setSelectedBlocks(selectedBlocks.filter((block) => block.id !== id))
            toast.success('Block deleted')
        } catch (error) {
            console.error('Error deleting block:', error)
            toast.error('Failed to delete block')
        }
    }

    const handleEditClick = (id: string) => {
        setEditingBlock(id)
    }

    const handleEditSave = async (data: EduBlockData | InfoBlockData) => {
        try {
            const updatedBlock = selectedBlocks.find(
                (block) => block.id === editingBlock
            )
            if (!updatedBlock) {
                throw new Error('Block not found')
            }

            const updatedBlockData = { ...updatedBlock, content: data }

            const response = await fetch('/api/blocks', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBlockData),
            })

            if (!response.ok) {
                throw new Error('Failed to save block data')
            }

            const result = await response.json()
            setSelectedBlocks(
                selectedBlocks.map((block) =>
                    block.id === editingBlock ? result.block : block
                )
            )
            setEditingBlock(null)
            toast.success('Block updated')
        } catch (error) {
            console.error('Error saving block data:', error)
            toast.error('Failed to save block data')
        }
    }

    const componentMap: { [key: string]: (props: { onBlockClick: () => void; showDelete: boolean; block_data: EduBlockData | InfoBlockData }) => JSX.Element } = {
        InfoBlock_L: (props) => <InfoBlock_L {...props} block_data={props.block_data as InfoBlockData} />,
        InfoBlock_M: (props) => <InfoBlock_M {...props} block_data={props.block_data as InfoBlockData} />,
        EduBlock_L: (props) => <EduBlock_L {...props} block_data={props.block_data as EduBlockData} />,
        EduBlock_M: (props) => <EduBlock_M {...props} block_data={props.block_data as EduBlockData} />,
        // Add other mappings here
    }

    const renderBlock = (block: EduBlockData|InfoBlockData) => {
        const commonProps = {
            key: block.id,
            onBlockClick: () => {},
            onDelete: () => handleBlockDelete(block.id),
            onEdit: () => handleEditClick(block.id),
            showDelete: true,
            showEdit: true,
            block_data: block,
        }

        const Component = componentMap[block.type]
        return Component ? <Component {...commonProps} /> : null
    }

    return (
        <div className='p-4 h-full'>
            <div className='h-4/6 w-full grid grid-cols-3 gap-4'>
                {selectedBlocks.map((block) => renderBlock(block))}
            </div>

            <Sheet key={'bottom'}>
                <SheetTrigger asChild>
                    <div className='w-full flex justify-center mt-4'>
                        <div className='px-6 h-10 flex text-customeText2 bg-customeBG1 rounded-[7px] shadow border border-customeBorder justify-center items-center gap-1 cursor-pointer'>
                            <p className='text-sm font-semibold text-center'>
                                Pick Up Block
                            </p>
                            <ArrowUp size={20} />
                        </div>
                    </div>
                </SheetTrigger>
                <SheetContent side={'bottom'}>
                    <BlockTemplatesList onBlockClick={handleBlockClick} />
                </SheetContent>
            </Sheet>

            {/* <Sheet
                open={editingBlock !== null}
                onOpenChange={() => setEditingBlock(null)}
            >
                <SheetContent>
                    {editingBlock && (
                        <EditBlockContent
                            initialData={
                                selectedBlocks.find(
                                    (block) => block.id === editingBlock
                                ) as InfoBlockData | EduBlockData
                            }
                            onSave={handleEditSave}
                        />
                    )}
                </SheetContent>
            </Sheet> */}
        </div>
    )
}
