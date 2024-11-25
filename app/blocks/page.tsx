'use client'

import InfoBlock from '@/components/blocks/info/info-block'
import { InfoBlock_L, InfoBlock_M } from '@/components/blocks/info/info-block'
import { ArrowUp, Edit } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import EditBlockContent from '@/components/blocks/edit-block-content'
import { toast } from 'sonner'

interface BlockData {
  id: string;
  type: string;
  content: {
    name: string;
    description: string;
    tags: string[];
    image: string;
    url: string;
    contact: {
      phone: string;
      email: string;
      github: string;
      linkedin: string;
      x: string;
    };
  };
}

export default function Blocks() {
    const [selectedBlocks, setSelectedBlocks] = useState<BlockData[]>([])
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

    const handleBlockClick = async (block: string) => {
        const newBlock: BlockData = {
            id: Date.now().toString(),
            type: block,
            content: {
                name: '',
                description: '',
                tags: [],
                image: '',
                url: '',
                contact: {
                    phone: '',
                    email: '',
                    github: '',
                    linkedin: '',
                    x: '',
                },
            },
        }

        try {
            const response = await fetch('/api/blocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlock),
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

    const handleEditSave = async (data: BlockData['content']) => {
        try {
            const updatedBlock = selectedBlocks.find((block) => block.id === editingBlock)
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
            setSelectedBlocks(selectedBlocks.map((block) => 
                block.id === editingBlock ? result.block : block
            ))
            setEditingBlock(null)
            toast.success('Block updated')
            
        } catch (error) {
            console.error('Error saving block data:', error)
            toast.error('Failed to save block data')
          
        }
    }

    const renderBlock = (block: BlockData) => {
        const commonProps = {
            key: block.id,
            onBlockClick: () => {},
            onDelete: () => handleBlockDelete(block.id),
            onEdit: () => handleEditClick(block.id),
            showDelete: true,
            showEdit: true,
            ...block.content,
        }

        switch (block.type) {
            case 'InfoBlock_L':
                return <InfoBlock_L {...commonProps} />
            case 'InfoBlock_M':
                return <InfoBlock_M {...commonProps} />
            default:
                return null
        }
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
                    <InfoBlock onBlockClick={handleBlockClick} />
                </SheetContent>
            </Sheet>

            <Sheet open={editingBlock !== null} onOpenChange={() => setEditingBlock(null)}>
                <SheetContent>
                    {editingBlock && (
                        <EditBlockContent
                            initialData={selectedBlocks.find((block) => block.id === editingBlock)?.content}
                            onSave={handleEditSave}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

