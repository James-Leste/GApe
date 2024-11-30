/** @format */
import { Globe, Twitter, Github, Phone, Mail, Trash2, Edit } from 'lucide-react'
import { InfoBlockData } from '@/components/blocks/blockType'

export function InfoBlock_L({
    onBlockClick,
    onDelete,
    onEdit,
    showDelete,
    showEdit,
    block_data,
}: {
    onBlockClick: (block: InfoBlockData,componentName:string) => void
    onDelete?: () => void
    onEdit?: () => void
    showDelete?: boolean
    showEdit?: boolean
    block_data: InfoBlockData
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
            onClick={() => onBlockClick(block_data,'InfoBlock_L')}
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
                <div className='flex flex-col justify-between'>
                    <p
                        className='text-sm overflow-hidden'
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 6,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {block_data.description}
                    </p>
                    <div className='flex gap-2'>
                        {block_data.tags.map((tag) => (
                            <Tag name={tag} key={tag}></Tag>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-between items-center'>
                <div className=' item-center'>
                    <div className='text-xl font-semibold break-words'>
                        {block_data.name}
                    </div>
                    <a className='text-sm' href={block_data.url}>
                        <Globe className='w-4' />
                    </a>
                </div>
                <div className='grid grid-cols-2 gap-1 text-[12px]'>
                    <div className='flex flex-row items-center gap-1'>
                        <Phone className='w-4'></Phone>
                        {block_data.contact.phone}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Mail className='w-4'></Mail>
                        {block_data.contact.email}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Github className='w-4'></Github>
                        {block_data.contact.github}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Twitter className='w-4'></Twitter>
                        {block_data.contact.x}
                    </div>
                </div>
            </div>
        </div>
    )
}


export function InfoBlock_M({
    onBlockClick,
    onDelete,
    onEdit,
    showDelete,
    showEdit,
    block_data,
}: {
    onBlockClick: (block: InfoBlockData,componentName:string) => void
    onDelete?: () => void
    onEdit?: () => void
    showDelete?: boolean
    showEdit?: boolean
    block_data: InfoBlockData
}) {
    return (
        <div
            onClick={() => onBlockClick(block_data,'InfoBlock_M')}
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
                {block_data.name}
            </div>
            <div className='self-stretch justify-start items-start gap-2 inline-flex'>
                <img
                    className='w-20 h-20 rounded-full object-cover'
                    src={block_data.image}
                    alt='Profile'
                />
                <div className='grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex'>
                    <div
                        className='text-sm overflow-hidden self-stretch'
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {block_data.description}
                    </div>
                    <div className='self-stretch justify-between items-start inline-flex'>
                        <div className="text-neutral-700 text-xs font-normal font-['Inter'] flex items-center gap-1">
                            <Phone className='w-4'></Phone>
                            {block_data.contact.phone}
                        </div>

                        <div className="text-neutral-700 text-xs font-normal font-['Inter'] flex items-center gap-1">
                            <Mail className='w-4'></Mail>{' '}
                            {block_data.contact.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
