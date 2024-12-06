/** @format */
import { Globe, Twitter, Github, Phone, Mail, Trash2, Edit } from 'lucide-react'
import { ProfileCardProps } from './types'

export function InfoBlock_L({
    onClick,
    blockData,
}: {
    onClick: () => void
    blockData: ProfileCardProps
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
            onClick={onClick}
            className='relative group w-96 h-[236px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex hover:border-2 hover:shadow-md hover:border-customeBorder cursor-pointer'
        >
            <div className='flex flex-row gap-2 pb-2 border-b'>
                <img
                    src={blockData.image}
                    className='w-28 rounded'
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/user.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3VzZXIucG5nIiwiaWF0IjoxNzMzNDg5NjUxLCJleHAiOjE3NDIwNDMyNTF9.4ncnZ0CEOOo_gWlwRsrpziR89_vwA_DiDlto7LKYRBA&t=2024-12-06T12%3A54%3A12.014Z'
                    }}
                />
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
                        {blockData.description}
                    </p>
                    <div className='flex gap-2'>
                        {blockData.tags?.map((tag) => (
                            <Tag name={tag} key={tag}></Tag>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-between items-center'>
                <div className=' item-center'>
                    <div className='text-xl font-semibold break-words'>
                        {blockData.name}
                    </div>
                    <a className='text-sm' href={blockData.url}>
                        <Globe className='w-4' />
                    </a>
                </div>
                <div className='grid grid-cols-2 gap-1 text-[12px]'>
                    <div className='flex flex-row items-center gap-1'>
                        <Phone className='w-4'></Phone>
                        {blockData.phone}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Mail className='w-4'></Mail>
                        {blockData.email}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Github className='w-4'></Github>
                        {blockData.github}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Twitter className='w-4'></Twitter>
                        {blockData.x}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function InfoBlock_M({
    onClick,
    blockData,
}: {
    onClick: () => void
    blockData: ProfileCardProps
}) {
    return (
        <div
            onClick={onClick}
            className='relative group w-96 h-[140px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex hover:border-2 hover:shadow-md hover:border-customeBorder cursor-pointer'
        >
            <div className='text-black text-xl font-semibold'>
                {blockData.name}
            </div>
            <div className='self-stretch justify-start items-start gap-2 inline-flex'>
                <img
                    className='w-20 h-20 rounded-full object-cover'
                    src={blockData.image}
                    alt='Profile'
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/user.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3VzZXIucG5nIiwiaWF0IjoxNzMzNDg5NjUxLCJleHAiOjE3NDIwNDMyNTF9.4ncnZ0CEOOo_gWlwRsrpziR89_vwA_DiDlto7LKYRBA&t=2024-12-06T12%3A54%3A12.014Z'
                    }}
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
                        {blockData.description}
                    </div>
                    <div className='self-stretch justify-between items-start inline-flex'>
                        <div className="text-neutral-700 text-xs font-normal font-['Inter'] flex items-center gap-1">
                            <Phone className='w-4'></Phone>
                            {blockData.phone}
                        </div>

                        <div className="text-neutral-700 text-xs font-normal font-['Inter'] flex items-center gap-1">
                            <Mail className='w-4'></Mail> {blockData.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
