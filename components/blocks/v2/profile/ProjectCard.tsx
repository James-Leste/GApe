/** @format */

import * as React from 'react'
import { ProjectCardProps } from './types'
import { Link2 } from 'lucide-react'
import Link from 'next/link'

export const ProjectBlock_L: React.FC<ProjectCardProps> = ({
    project,
    company,
    role,
    location,
    dateRange,
    description,
    image,
    Heyperlink,
    type,
}) => {
    return (
        <div className='flex   w-96 h-[236px] flex-col justify-between p-2  bg-white rounded-lg border border-solid border-slate-400 min-h-[236px]'>
            <div className='flex items-center gap-2'>
                <div className='self-stretch my-auto text-xl font-semibold'>
                    {project}
                </div>
                <Link href={Heyperlink}>
                    {' '}
                    <Link2 />
                </Link>
            </div>

            <div className='flex gap-2 justify-between items-center w-full'>
                <div className='flex gap-2 items-center self-stretch my-auto min-w-[240px]'>
                    <div className='flex flex-row self-stretch my-auto gap-2'>
                        <img
                            loading='lazy'
                            src={image}
                            className='object-contain shrink-0 self-stretch my-auto aspect-square w-[14px]'
                            alt={`${company} logo`}
                        />
                        <div className='text-sm  tracking-normal leading-snug text-black'>
                            {company}
                        </div>
                        <div className='text-sm  tracking-normal leading-snug'>
                            |
                        </div>
                        <div className='text-sm  tracking-normal leading-snug text-black'>
                            {role}
                        </div>

                        <div className='flex gap-1.5 items-center text-sm font-medium leading-none text-neutral-700'></div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
                className='  overflow-hidden py-2 w-full text-base font-medium my-2 border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'
            >
                {description}
            </div>
            <div className='flex gap-10 justify-between items-center mt-1.5 w-full text-sm font-medium leading-none'>
                <div className='flex gap-1 items-center self-stretch my-auto text-black'>
                    <img
                        loading='lazy'
                        src='https://cdn.builder.io/api/v1/image/assets/TEMP/dc71ab0f216929cfa8c383cb604ee2b1b39e6ca864c17ed382074e93a5876767?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b'
                        className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                        alt=''
                    />
                    <div className='self-stretch my-auto'>{location}</div>
                </div>
                <div className='self-stretch my-auto text-gray-700'>
                    {dateRange}
                </div>
            </div>
        </div>
    )
}
export const ProjectBlock_M: React.FC<ProjectCardProps> = ({
    project,
    company,
    role,
    location,
    dateRange,
    description,
    Heyperlink,
    image,
    type,
}) => {
    return (
        <div className='flex  flex-col  w-96 h-[140px] justify-between p-2  bg-white rounded-lg border border-solid border-slate-400 '>
            <div className='flex items-center gap-2'>
                <div className='self-stretch my-auto text-xl font-semibold'>
                    {project}
                </div>
                <Link href={Heyperlink}>
                    <Link2 />
                </Link>
            </div>

            <div className='flex gap-2 justify-between items-center w-full'>
                <div className='flex gap-2 items-center self-stretch my-auto min-w-[240px]'>
                    <div className='flex flex-row self-stretch my-auto gap-2'>
                        <img
                            loading='lazy'
                            src={image}
                            className='object-contain shrink-0 self-stretch my-auto aspect-square w-[14px]'
                            alt={`${company} logo`}
                        />
                        <div className='text-sm  tracking-normal leading-snug text-black'>
                            {company}
                        </div>
                        <div className='text-sm  tracking-normal leading-snug'>
                            |
                        </div>
                        <div className='text-sm  tracking-normal leading-snug text-black'>
                            {role}
                        </div>

                        <div className='flex gap-1.5 items-center text-sm font-medium leading-none text-neutral-700'></div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
                className='  overflow-hidden shrink  self-stretch py-1 w-full text-sm font-medium leading-4 border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'
            >
                {description}
            </div>
            <div className='flex  justify-between items-center  w-full text-sm font-medium leading-none'>
                <div className='flex gap-1 items-center self-stretch my-auto text-black'>
                    <img
                        loading='lazy'
                        src='https://cdn.builder.io/api/v1/image/assets/TEMP/dc71ab0f216929cfa8c383cb604ee2b1b39e6ca864c17ed382074e93a5876767?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b'
                        className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                        alt=''
                    />
                    <div className='self-stretch my-auto'>{location}</div>
                </div>
                <div className='self-stretch my-auto text-gray-700'>
                    {dateRange}
                </div>
            </div>
        </div>
    )
}
