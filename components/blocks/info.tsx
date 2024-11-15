/** @format */
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Twitter, Github, Phone, Mail } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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

export function InfoBlock_L({
    handleSizeChange,
}: {
    handleSizeChange: (value: string) => void
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
        <div className='relative group w-96 h-[236px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex'>
            <SizeChanger defaultSize='l' handleSizeChange={handleSizeChange} />
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

export function InfoBlock_M({
    handleSizeChange,
}: {
    handleSizeChange: (value: string) => void
}) {
    return (
        <div className='relative group w-96 h-[140px] p-2 bg-white rounded-lg border border-slate-300 flex-col justify-start items-start gap-2 inline-flex'>
            <SizeChanger defaultSize='m' handleSizeChange={handleSizeChange} />
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

export default function InfoBlock() {
    const [selectedSize, setSelectedSize] = useState('M')

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: '0%',
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            transition: { duration: 0.3 },
            transitionEnd: { display: 'none' },
        }),
    }

    const handleSizeChange = (value: string) => {
        setSelectedSize(value.toUpperCase())
    }

    return (
        <div className='flex flex-col gap-4'>
            <motion.div
                key={selectedSize}
                variants={variants}
                initial='enter'
                animate={'center'}
                exit='exit'
                transition={{
                    opacity: { duration: 0.2 },
                }}
                className='w-full'
            >
                {selectedSize === 'S' && (
                    <InfoBlock_S handleSizeChange={handleSizeChange} />
                )}
                {selectedSize === 'M' && (
                    <InfoBlock_M handleSizeChange={handleSizeChange} />
                )}
                {selectedSize === 'L' && (
                    <InfoBlock_L handleSizeChange={handleSizeChange} />
                )}
            </motion.div>
        </div>
    )
}
