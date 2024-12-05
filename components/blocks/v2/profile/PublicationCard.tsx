/** @format */

import * as React from 'react'
import { PublicationCardProps } from './types'

export const PublicationBlock_L: React.FC<PublicationCardProps> = ({
    title,
    authors,
    year,
    type,
    description,
    journal,
}) => {
    return (
        <div className='flex flex-col justify-between py-2 pr-2 pl-3  w-96 h-[236px] bg-white rounded-lg border-t border-r border-b border-l-4 border-solid border-b-slate-400 border-l-slate-400 border-r-slate-400 border-t-slate-400 '>
            <div className='flex gap-3.5 items-center w-full'>
                <div className='flex gap-2 items-center self-stretch my-auto text-xs font-medium leading-loose whitespace-nowrap'>
                    <div className='gap-2.5 leading-4 self-stretch px-1 my-auto rounded-lg border border-solid border-neutral-300 text-neutral-800'>
                        {type}
                    </div>
                    <div className='self-stretch my-auto text-neutral-500'>
                        {year}
                    </div>
                </div>
                <div className='flex gap-1 items-center self-stretch my-auto w-4'>
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 48 48'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='object-contain self-stretch my-auto w-4 aspect-square'
                    >
                        <path
                            d='M28 6H42V20'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M25.7998 22.1999L41.0998 6.8999'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
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
            <div
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
                className='  overflow-hidden py-1 w-full text-sm leading-tight font-medium  border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'
            >
                {description}
            </div>
            <div className='flex gap-7 items-center mt-1 w-full text-xs font-medium leading-loose text-neutral-500'>
                <div className='flex gap-1.5 items-center self-stretch my-auto min-w-[240px]'>
                    <div className='flex flex-col items-start self-stretch my-auto min-w-[240px]'>
                        <div className='flex gap-1 items-center'>
                            <svg
                                className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                                width='16'
                                height='16'
                                viewBox='0 0 48 48'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M8 6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6Z'
                                    fill='none'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M16 4V44'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M24 12H32'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M24 20H32'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M10 4H22'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M10 44H22'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
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
export const PublicationBlock_M: React.FC<PublicationCardProps> = ({
    title,
    authors,
    year,
    type,
    description,
    journal,
}) => {
    return (
        <div className='flex  flex-col justify-between py-2 pr-2 pl-3 w-96 h-[140px] bg-white rounded-lg border-t border-r border-b border-l-4 border-solid border-b-slate-400 border-l-slate-400 border-r-slate-400 border-t-slate-400'>
            <div className='flex gap-3.5 items-center w-full'>
                <div className='flex gap-2 items-center self-stretch my-auto text-xs font-medium leading-loose whitespace-nowrap'>
                    <div className='gap-2.5 leading-4 self-stretch px-1 my-auto rounded-lg border border-solid border-neutral-300 text-neutral-800'>
                        {type}
                    </div>
                    <div className='self-stretch my-auto text-neutral-500'>
                        {year}
                    </div>
                </div>
                <div className='flex gap-1 items-center self-stretch my-auto w-4'>
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 48 48'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='object-contain self-stretch my-auto w-4 aspect-square'
                    >
                        <path
                            d='M28 6H42V20'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M25.7998 22.1999L41.0998 6.8999'
                            stroke='#254d3e'
                            stroke-width='4'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
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

            <div className='flex gap-7 items-center mt-1 w-full text-xs font-medium leading-loose text-neutral-500 border-t'>
                <div className='flex gap-1.5 items-center self-stretch my-auto min-w-[240px]'>
                    <div className='flex flex-col items-start self-stretch my-auto min-w-[240px]'>
                        <div className='flex gap-1 items-center'>
                            <svg
                                className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
                                width='16'
                                height='16'
                                viewBox='0 0 48 48'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M8 6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6Z'
                                    fill='none'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M16 4V44'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M24 12H32'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M24 20H32'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M10 4H22'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M10 44H22'
                                    stroke='#254d3e'
                                    stroke-width='4'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>

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
