/** @format */
import { Globe, Twitter, Github, Phone, Mail, Trash2, Edit } from 'lucide-react'
import { EduBlockData } from '@/components/blocks/blockType'

export function EduBlock_L({
    onBlockClick,
    onDelete,
    onEdit,
    showDelete,
    showEdit,
    block_data,

}: {
    onBlockClick: (block: EduBlockData , componentName:string) => void
    onDelete?: () => void
    onEdit?: () => void
    showDelete?: boolean
    showEdit?: boolean
    block_data: EduBlockData
}) {
    function Tag({ name }: { name: string }) {
        return (
            <div className='h-[22px] px-0.5 py-1 bg-green-300 rounded-sm border border-black justify-center items-center gap-2.5 inline-flex'>
                <div className="text-black text-sm font-medium font-['Inter'] leading-[14px]">
                    {name}
                </div>
            </div>
        )
    }

    return (
        <div
            onClick={() => onBlockClick(block_data, 'EduBlock_L')}
            className='relative group w-96 h-[236px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex hover:border-2 hover:shadow-md hover:border-customeBorder cursor-pointer'
        >
            {showDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete && onDelete()
                    }}
                    className='absolute top-2 right-2 hidden group-hover:block'
                >
                    <Trash2 className='w-4 h-4' />
                </button>
            )}
            {showEdit && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit && onEdit()
                    }}
                    className='absolute top-2 right-8 hidden group-hover:block'
                >
                    <Edit className='w-4 h-4' />
                </button>
            )}

            <div className='flex flex-row gap-2 pb-2 border-b'>
                <img src={block_data.image} className='w-28 rounded' />
                this is EduBlock_L
            </div>
           
        </div>
    )
}

export function EduBlock_M({
    onBlockClick,
    onDelete,
    onEdit,
    showDelete,
    showEdit,
    block_data,
}: {
    onBlockClick: (block: EduBlockData,componentName:string) => void
    onDelete?: () => void
    onEdit?: () => void
    showDelete?: boolean
    showEdit?: boolean
    block_data: EduBlockData
}) {
    return (
        <>
            {block_data && (
                <div
                    onClick={() => onBlockClick(block_data, 'EduBlock_M')}
                    className='relative group w-96 h-[140px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex hover:border-2 hover:shadow-md hover:border-customeBorder cursor-pointer'
                >
                    {showDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete && onDelete()
                            }}
                            className='absolute top-2 right-2 hidden group-hover:block'
                        >
                            <Trash2 className='w-4 h-4' />
                        </button>
                    )}
                    {showEdit && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onEdit && onEdit()
                            }}
                            className='absolute top-2 right-8 hidden group-hover:block'
                        >
                            <Edit className='w-4 h-4' />
                        </button>
                    )}

                    <div className='text-black text-xl font-semibold'>
                        {block_data.institutionName}
                    </div>
                    <div className='self-stretch justify-start items-start gap-2 inline-flex'>
                        <img
                            className='w-20 h-20 rounded-full object-cover'
                            src={block_data.image}
                            alt='Profile'
                        />
                    
                    </div>
                </div>
            )}
        </>
    )
}
