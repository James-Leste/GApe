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
                    className='w-28 h-36 rounded object-cover '
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/public/GApe_public/block_user_assets/0.8377113559874916.png'
                    }}
                />
                <div className='flex flex-col'>
                    <div className='text-xl font-semibold flex  items-center gap-1 '>
                        {blockData.name}
                        <a className='text-sm' href={blockData.url}>
                            <Globe className='w-4' />
                        </a>
                    </div>
                    <div className='flex flex-col justify-between h-full'>
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
            </div>
            <div className='grid grid-cols-2 gap-1 text-[12px] w-full px-2'>
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
            <div className='self-stretch justify-start items-start gap-2 inline-flex'>
                <img
                    className='w-24 h-32 rounded-xl  object-cover'
                    src={blockData.image}
                    alt='Profile'
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/public/GApe_public/block_user_assets/0.8377113559874916.png'
                    }}
                />
                <div className='grow shrink basis-0 self-stretch flex-col  inline-flex'>
                    <div className='text-black text-xl font-semibold flex gap-1 items-center'>
                        {blockData.name} <a className='text-sm' href={blockData.url}>
                            <Globe className='w-4' />
                        </a>
                    </div>
                    <div
                        className='text-sm overflow-hidden self-stretch h-full'
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
