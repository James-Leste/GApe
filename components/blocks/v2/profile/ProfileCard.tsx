/** @format */

import * as React from 'react'
import { ProfileCardProps } from './types'

export function ProfileCard({
    blockData,
    onClick,
}: {
    blockData: ProfileCardProps
    onClick: () => void
}) {
    const { name, description, phone, email, imageUrl, tags } = blockData
    return (
        <div
            onClick={onClick}
            className='flex flex-col p-2 w-96 h-[140px] bg-white rounded-lg border border-solid border-slate-300'
        >
            <div className='flex gap-1 items-center self-start text-xl font-semibold text-black'>
                <div className='self-stretch my-auto'>{name}</div>
                <img
                    loading='lazy'
                    src={imageUrl}
                    className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                    alt=''
                />
            </div>
            <div className='flex gap-2 mt-4 w-full text-xs text-neutral-700'>
                <img
                    loading='lazy'
                    src={imageUrl}
                    className='object-contain shrink-0 self-start rounded-full aspect-square shadow-[0px_1px_10px_rgba(0,123,255,0.15)] w-[84px]'
                    alt={`${name}'s profile`}
                />
                <div className='flex flex-col flex-1 shrink justify-between basis-0 min-w-[240px]'>
                    <div>{description}</div>
                    <div className='flex gap-10 justify-between items-start mt-2.5 w-full whitespace-nowrap'>
                        <div className='flex gap-1 items-center'>
                            <img
                                loading='lazy'
                                src='https://cdn.builder.io/api/v1/image/assets/TEMP/fb3516fe77a64032a6b1ce9d3a1e90dbefe7f53b7650f34dcf8f29352c68dca8?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b'
                                className='object-contain shrink-0 self-stretch my-auto aspect-square w-[15px]'
                                alt=''
                            />
                            <div className='self-stretch my-auto'>{phone}</div>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <img
                                loading='lazy'
                                src='https://cdn.builder.io/api/v1/image/assets/TEMP/c74893e3937a65cb7c5b4f11298f0321c674eb15a0efd520183f2ba817f01a0f?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b'
                                className='object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square'
                                alt=''
                            />
                            <div className='self-stretch my-auto'>{email}</div>
                        </div>
                    </div>
                </div>
            </div>
            {tags && (
                <div className='flex gap-2 mt-4'>
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className='overflow-hidden gap-2.5 px-0.5 py-1 bg-green-300 rounded-sm border border-black border-solid'
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
