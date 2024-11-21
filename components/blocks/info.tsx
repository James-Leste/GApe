/** @format */

'use client'

import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { Globe, Twitter, Github, Phone, Mail } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { BlockContext, BlockData } from '@/lib/blockContext'

function SizeChanger({
    handleSizeChange,
    defaultSize,
}: {
    handleSizeChange: (value: string) => void
    defaultSize: string
}) {
    return (
        <div className='absolute top-2 right-[-16px] hidden group-hover:block bg-background p-1 rounded'>
            <RadioGroup
                onValueChange={handleSizeChange}
                defaultValue={defaultSize}
                className='flex flex-col gap-1'
            >
                {['s', 'm', 'l'].map((size) => (
                    <div key={size}>
                        <RadioGroupItem
                            value={size}
                            id={size}
                            className='peer sr-only'
                        />
                        <Label
                            htmlFor={size}
                            className='flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-background border border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-secondary'
                        >
                            <span className='text-sm font-bold text-muted-foreground peer-data-[state=checked]:text-primary'>
                                {size.toUpperCase()}
                            </span>
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

function Tag({ name }: { name: string }) {
    return (
        <div className='h-[22px] px-2 py-1 bg-green-300 rounded-sm border border-black justify-center items-center gap-2.5 inline-flex'>
            <div className="text-black text-sm font-medium font-['Inter'] leading-[14px]">
                {name}
            </div>
        </div>
    )
}

function InfoBlock_L({
    handleSizeChange,
    data,
}: {
    handleSizeChange: (value: string) => void
    data: BlockData
}) {
    return (
        <div className='relative group w-96 h-[236px] p-2 bg-card rounded-lg border border-border flex-col justify-start items-start gap-2 inline-flex'>
            <SizeChanger defaultSize='l' handleSizeChange={handleSizeChange} />
            <div className='flex flex-row gap-2 pb-2 border-b'>
                <img
                    src={data.image}
                    alt={data.name}
                    className='w-28 rounded'
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
                        {data.description}
                    </p>
                    <div className='flex gap-2'>
                        {data.tags.map((tag) => (
                            <Tag name={tag} key={tag} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-between items-center'>
                <div className='item-center'>
                    <div className='text-xl font-semibold break-words'>
                        {data.name}
                    </div>
                    <a className='text-sm' href={data.url}>
                        <Globe className='w-4' />
                    </a>
                </div>
                <div className='grid grid-cols-2 gap-1 text-[12px]'>
                    <div className='flex flex-row items-center gap-1'>
                        <Phone className='w-4' />
                        {data.contact.Phone}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Mail className='w-4' />
                        {data.contact.Email}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Github className='w-4' />
                        {data.contact.github}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Twitter className='w-4' />
                        {data.contact.x}
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoBlock_M({
    handleSizeChange,
    data,
}: {
    handleSizeChange: (value: string) => void
    data: BlockData
}) {
    return (
        <div className='relative group w-96 h-[140px] p-2 bg-card rounded-lg border border-border flex-col justify-start items-start gap-2 inline-flex'>
            <SizeChanger defaultSize='m' handleSizeChange={handleSizeChange} />
            <div className='text-foreground text-xl font-semibold'>
                {data.name}
            </div>
            <div className='self-stretch justify-start items-start gap-2 inline-flex'>
                <img
                    className='w-20 h-20 rounded-full object-cover'
                    src={data.image}
                    alt={data.name}
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
                        {data.description}
                    </div>
                    <div className='self-stretch justify-between items-start inline-flex'>
                        <div className="text-muted-foreground text-xs font-normal font-['Inter'] flex items-center gap-1">
                            <Phone className='w-4' />
                            {data.contact.Phone}
                        </div>
                        <div className="text-muted-foreground text-xs font-normal font-['Inter'] flex items-center gap-1">
                            <Mail className='w-4' />
                            {data.contact.Email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoBlock_S({
    handleSizeChange,
    data,
}: {
    handleSizeChange: (value: string) => void
    data: BlockData
}) {
    return (
        <div className='relative group w-40 h-[140px] p-2 bg-card rounded-lg border border-border flex-col justify-start items-start gap-1 inline-flex'>
            <SizeChanger defaultSize='s' handleSizeChange={handleSizeChange} />
            <div className='text-foreground text-sm font-semibold'>
                {data.name}
            </div>
            <div
                className='text-muted-foreground overflow-hidden text-xs font-light leading-[14px]'
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
            >
                {data.description}
            </div>
            <div className='flex justify-between w-full'>
                <Twitter className='w-4' /> <Github className='w-4' />
                <Phone className='w-4' /> <Mail className='w-4' />
            </div>
        </div>
    )
}

export default function InfoBlock() {
    const [selectedSize, setSelectedSize] = useState('M')
    const { blockData } = useContext(BlockContext)

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
                animate='center'
                exit='exit'
                transition={{
                    opacity: { duration: 0.2 },
                }}
                className='w-full'
            >
                {selectedSize === 'S' && (
                    <InfoBlock_S
                        handleSizeChange={handleSizeChange}
                        data={blockData}
                    />
                )}
                {selectedSize === 'M' && (
                    <InfoBlock_M
                        handleSizeChange={handleSizeChange}
                        data={blockData}
                    />
                )}
                {selectedSize === 'L' && (
                    <InfoBlock_L
                        handleSizeChange={handleSizeChange}
                        data={blockData}
                    />
                )}
            </motion.div>
        </div>
    )
}
