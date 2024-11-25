/** @format */
'use client'
import { useState } from 'react'
import { Globe, Twitter, Github, Phone, Mail, CircleUser, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

const block_data = {
    name: 'John Simth',
    description:
        'I’m a Software Developer and Aalto University graduate with expertise in building web and data-driven applications. I enjoy solving complex problems using technologies like Python, Java, and JavaScript. Let’s connect and create something awesome together!',
    tags: ['Vue', 'React', 'TS/JS', 'Next'],
    image: 'https://s3.is-ali.tech/3ce276f382ff8edb74a24d8a2c872fa8.png',
    url: 'https://www.linkedin.com/in/john-smith-123456/',
    contact: {
        Phone: '+358 401234567',
        Email: 'example@mail.com',
        github: '@John_Smith22',
        linkedin: '@John_Smith22',
        x: '@IsJohn_Smith22',
    },
}

function SizeChanger({
    handleSizeChange,
    defaultSize,
}: {
    handleSizeChange: (value: string) => void
    defaultSize: string
}) {
    return (
        <div className='absolute top-2 right-[-16px] hidden group-hover:block bg-customeBG1 p-1 rounded'>
            <RadioGroup
                onValueChange={handleSizeChange}
                defaultValue={defaultSize}
                className='flex flex-col gap-1'
            >
                <div>
                    <RadioGroupItem value='s' id='s' className='peer sr-only' />
                    <Label
                        htmlFor='s'
                        className='flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-customeBG1 border border-transparent peer-data-[state=checked]:border-customeBorder peer-data-[state=checked]:bg-customeBG2'
                    >
                        <span className='text-sm font-bold text-muted-foreground peer-data-[state=checked]:text-primary'>
                            S
                        </span>
                    </Label>
                </div>

                <div>
                    <RadioGroupItem value='m' id='m' className='peer sr-only' />
                    <Label
                        htmlFor='m'
                        className='flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-customeBG1 border  border-transparent peer-data-[state=checked]:border-customeBorder peer-data-[state=checked]:bg-customeBG2'
                    >
                        <span className='text-sm font-bold text-muted-foreground peer-data-[state=checked]:text-primary'>
                            M
                        </span>
                    </Label>
                </div>

                <div>
                    <RadioGroupItem value='l' id='l' className='peer sr-only' />
                    <Label
                        htmlFor='l'
                        className='flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-customeBG1 border  border-transparent peer-data-[state=checked]:border-customeBorder peer-data-[state=checked]:bg-customeBG2'
                    >
                        <span className='text-sm font-bold text-muted-foreground peer-data-[state=checked]:text-primary'>
                            L
                        </span>
                    </Label>
                </div>
            </RadioGroup>
        </div>
    )
}

export function InfoBlock_L({ onBlockClick, onDelete, showDelete }: { onBlockClick: (block: string) => void, onDelete?: () => void, showDelete?: boolean }) {
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
        <div onClick={() => onBlockClick('InfoBlock_L')} className='relative group w-96 h-[236px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex hover:border-2 hover:shadow-md hover:border-customeBorder cursor-pointer'>
            {showDelete && <button onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }} className='absolute top-2 right-2 hidden group-hover:block'><Trash2 className='w-4 h-4' /></button>}
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
                        {block_data.contact.Phone}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Mail className='w-4'></Mail>
                        {block_data.contact.Email}
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

export function InfoBlock_M({ onBlockClick, onDelete, showDelete }: { onBlockClick: (block: string) => void, onDelete?: () => void, showDelete?: boolean }) {
    return (
        <div onClick={() => onBlockClick('InfoBlock_M')} className='relative group w-96 h-[140px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex hover:border-2 hover:shadow-md hover:border-customeBorder cursor-pointer'>
            {showDelete && <button onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }} className='absolute top-2 right-2 hidden group-hover:block'><Trash2 className='w-4 h-4' /></button>}
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
                            {block_data.contact.Phone}
                        </div>

                        <div className="text-neutral-700 text-xs font-normal font-['Inter'] flex items-center gap-1">
                            <Mail className='w-4'></Mail>{' '}
                            {block_data.contact.Email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function InfoBlock_S({
    handleSizeChange,
}: {
    handleSizeChange: (value: string) => void
}) {
    return (
        <div className=' relative group w-40 h-[140px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-1 inline-flex'>
            <SizeChanger defaultSize='s' handleSizeChange={handleSizeChange} />
            <div className='text-black text-sm font-semibold'>
                {block_data.name}
            </div>
            <div
                className='text-neutral-700  overflow-hidden text-xs font-light  leading-[14px]'
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
            >
                {' '}
                {block_data.description}{' '}
            </div>
            <div className='flex justify-between w-full'>
                <Twitter className='w-4' /> <Github className='w-4' />{' '}
                <Phone className='w-4' /> <Mail className='w-4' />
            </div>
        </div>
    )
}

export default function InfoBlock({ onBlockClick }: { onBlockClick: (block: string) => void }) {
    const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

    const handleBlockClick = (block: string) => {
        setSelectedBlock(block);
        onBlockClick(block);
    };

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className='h-[137px] p-2 bg-[#ede1d1] rounded-xl border-2 border-[#a69986] flex-col justify-start items-start gap-2 inline-flex'>
                    <div className="text-[#0e3c26] text-lg font-semibold  leading-7">
                        Name / Basic
                    </div>
                    <CircleUser className='size-11' />
                    
                    <div className="self-stretch text-[#0e3c26] text-xs font-medium  leading-tight">
                        using this block showing your basic information{' '}
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className='flex flex-row gap-5 w-fit items-center'>
                <InfoBlock_M onBlockClick={onBlockClick} showDelete={false} />
                <InfoBlock_L onBlockClick={onBlockClick} showDelete={false} />
            </HoverCardContent>
        </HoverCard>
    )
}
