/** @format */

import * as React from 'react'
import { ExperienceCardProps } from './types'

export const WorkBlock_L: React.FC<ExperienceCardProps> = ({
    company,
    title,
    location,
    dateRange,
    description,
    logoUrl,
    type,
}) => {
    return (
        <div className='flex   w-96 h-[236px] flex-col justify-between p-2  bg-white rounded-lg border border-solid border-slate-400 min-h-[236px]'>
            <div className='flex gap-2 justify-between items-center w-full'>
                <div className='flex gap-2 items-center self-stretch my-auto min-w-[240px]'>
                    <img
                        loading='lazy'
                        src={logoUrl}
                        className='object-contain shrink-0 self-stretch my-auto aspect-square w-[38px]'
                        alt={`${company} logo`}
                    />
                    <div className='flex flex-col self-stretch my-auto'>
                        <div className='text-xl font-semibold tracking-normal leading-snug text-black'>
                            {company}
                        </div>
                        <div className='flex gap-1.5 items-center text-sm font-medium leading-none text-neutral-700'>
                            <div className='self-stretch my-auto'>{title}</div>
                        </div>
                    </div>
                </div>
                {type && (
                    <div className='self-stretch my-auto text-base leading-7 text-black'>
                        {type}
                    </div>
                )}
            </div>
            <div className='flex-1 shrink gap-2.5 self-stretch py-1 mt-1.5 w-full text-sm leading-6 text-black border-t border-b border-solid border-b-gray-300 border-t-gray-300'>
                {description}
            </div>
            <div className='flex gap-10 justify-between items-center mt-1.5 w-full text-sm font-medium leading-none'>
                <div className='flex gap-1 items-center self-stretch my-auto text-black'>
                <svg
                        width='16'
                        height='16'
                        viewBox='0 0 48 48'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                    >
                        <path
                            d='M9.85786 32.7574C6.23858 33.8432 4 35.3432 4 37C4 40.3137 12.9543 43 24 43C35.0457 43 44 40.3137 44 37C44 35.3432 41.7614 33.8432 38.1421 32.7574'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M24 35C24 35 37 26.504 37 16.6818C37 9.67784 31.1797 4 24 4C16.8203 4 11 9.67784 11 16.6818C11 26.504 24 35 24 35Z'
                            fill='none'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M24 22C26.7614 22 29 19.7614 29 17C29 14.2386 26.7614 12 24 12C21.2386 12 19 14.2386 19 17C19 19.7614 21.2386 22 24 22Z'
                            fill='none'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linejoin='round'
                        />
                    </svg>
                    <div className='self-stretch my-auto'>{location}</div>
                </div>
                <div className='self-stretch my-auto text-gray-700'>
                    {dateRange}
                </div>
            </div>
        </div>
    )
}
export const WorkBlock_M: React.FC<ExperienceCardProps> = ({
    company,
    title,
    location,
    dateRange,
    description,
    logoUrl,
    type,
}) => {
    return (
        <div className='flex  flex-col  w-96 h-[140px] justify-between p-2  bg-white rounded-lg border border-solid border-slate-400 '>
            <div className='flex gap-1 justify-between items-center w-full'>
                <div className='flex gap-2 items-center self-stretch my-auto '>
                    <img
                        loading='lazy'
                        src={logoUrl}
                        className='object-contain shrink-0 self-stretch my-auto aspect-square w-[38px]'
                        alt={`${company} logo`}
                    />
                    <div className='flex flex-col self-stretch my-auto'>
                        <div className='text-xl font-semibold tracking-normal leading-snug text-black'>
                            {company}
                        </div>
                        <div className='flex gap-1.5 items-center text-sm font-medium leading-none text-neutral-700'>
                            <div className='self-stretch my-auto'>{title}</div>
                        </div>
                    </div>
                </div>
                {type && (
                    <div className='self-stretch my-auto text-base leading-7 text-black'>
                        {type}
                    </div>
                )}
            </div>
            <div
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
                className='  overflow-hidden shrink  self-stretch py-1 w-full text-sm font-medium leading-4 border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'
            >
                {description}
            </div>
            <div className='flex  justify-between items-center  w-full text-sm font-medium leading-none'>
                <div className='flex gap-1 items-center self-stretch my-auto text-black'>
                    
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 48 48'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                    >
                        <path
                            d='M9.85786 32.7574C6.23858 33.8432 4 35.3432 4 37C4 40.3137 12.9543 43 24 43C35.0457 43 44 40.3137 44 37C44 35.3432 41.7614 33.8432 38.1421 32.7574'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M24 35C24 35 37 26.504 37 16.6818C37 9.67784 31.1797 4 24 4C16.8203 4 11 9.67784 11 16.6818C11 26.504 24 35 24 35Z'
                            fill='none'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M24 22C26.7614 22 29 19.7614 29 17C29 14.2386 26.7614 12 24 12C21.2386 12 19 14.2386 19 17C19 19.7614 21.2386 22 24 22Z'
                            fill='none'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linejoin='round'
                        />
                    </svg>
                    <div className='self-stretch my-auto'>{location}</div>
                </div>
                <div className='self-stretch my-auto text-gray-700'>
                    {dateRange}
                </div>
            </div>
        </div>
    )
}
