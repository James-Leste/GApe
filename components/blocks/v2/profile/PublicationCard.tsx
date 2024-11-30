/** @format */

import * as React from 'react'
import { PublicationCardProps } from './types'

export const PublicationCard: React.FC<PublicationCardProps> = ({
    title,
    authors,
    year,
    type,
    description,
    journal,
}) => {
    return (
        <div className='flex flex-col justify-between py-2 pr-2 pl-3 w-full bg-white rounded-lg border-t border-r border-b border-l-4 border-solid border-b-slate-400 border-l-slate-400 border-r-slate-400 border-t-slate-400 min-h-[236px]'>
            <div className='flex gap-3.5 items-center w-full'>
                <div className='flex gap-2 items-center self-stretch my-auto text-xs font-medium leading-loose whitespace-nowrap'>
                    <div className='gap-2.5 self-stretch px-1 my-auto rounded-lg border border-solid border-neutral-300 text-neutral-800'>
                        {type}
                    </div>
                    <div className='self-stretch my-auto text-neutral-500'>
                        {year}
                    </div>
                </div>
                <div className='flex gap-1 items-center self-stretch my-auto w-4'>
                    <img
                        loading='lazy'
                        src='https://cdn.builder.io/api/v1/image/assets/TEMP/463dea923f5e8d5a241ac8023375b011bffa4234e0ffc74a300c03dd76d90f49?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b'
                        className='object-contain self-stretch my-auto w-4 aspect-square'
                        alt=''
                    />
                </div>
            </div>
            <div className='flex flex-col mt-1 w-full'>
                <div className='text-sm font-bold leading-5 text-neutral-800'>
                    {title}
                </div>
                <div className='self-stretch w-full text-xs font-medium leading-loose text-neutral-500'>
                    {authors}
                </div>
            </div>
            <div className='flex-1 shrink gap-2.5 self-stretch py-1 mt-1 w-full text-xs font-medium leading-5 border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'>
                {description}
            </div>
            <div className='flex gap-7 items-center mt-1 w-full text-xs font-medium leading-loose text-neutral-500'>
                <div className='flex gap-1.5 items-center self-stretch my-auto min-w-[240px]'>
                    <div className='flex flex-col items-start self-stretch my-auto min-w-[240px]'>
                        <div className='flex gap-1 items-center'>
                            <img
                                loading='lazy'
                                src='https://cdn.builder.io/api/v1/image/assets/TEMP/9d6a953de997106f12d356c2a42f4997add528afc9f05c06b4d2231be36d6c24?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b'
                                className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                                alt=''
                            />
                            <div className='self-stretch my-auto'>
                                {journal}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
