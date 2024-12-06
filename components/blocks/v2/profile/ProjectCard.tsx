/** @format */

import * as React from 'react'
import { ProjectCardProps } from './types'
import { Link2 } from 'lucide-react'
import Link from 'next/link'

export function ProjectBlock_L({
    onClick,
    blockData,
}: {
    onClick: () => void
    blockData: ProjectCardProps
}) {
    const {
        project,
        company,
        role,
        location,
        dateRange,
        description,
        image,
        Heyperlink,
    } = blockData
    return (
        <div
            onClick={onClick}
            className='flex w-96 h-[236px] flex-col justify-between p-2  bg-white rounded-lg border border-solid border-slate-400 min-h-[236px] hover:border-2 hover:shadow-md hover:border-customeBorder'
        >
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
                            alt='🧑🏻‍💻'
                            onError={(e) => {
                                e.currentTarget.src =
                                    'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/project-management.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3Byb2plY3QtbWFuYWdlbWVudC5wbmciLCJpYXQiOjE3MzM0ODIxNjgsImV4cCI6NDg1NTU0NjE2OH0.0umRVoCaXnKs4twEf8gp8rauh-WeWNqW2gkZulAQ_ps&t=2024-12-06T10%3A49%3A28.429Z'
                            }}
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
                            strokeWidth='4'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M24 35C24 35 37 26.504 37 16.6818C37 9.67784 31.1797 4 24 4C16.8203 4 11 9.67784 11 16.6818C11 26.504 24 35 24 35Z'
                            fill='none'
                            stroke='#254d3e'
                            strokeWidth='4'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M24 22C26.7614 22 29 19.7614 29 17C29 14.2386 26.7614 12 24 12C21.2386 12 19 14.2386 19 17C19 19.7614 21.2386 22 24 22Z'
                            fill='none'
                            stroke='#254d3e'
                            strokeWidth='4'
                            strokeLinejoin='round'
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
export function ProjectBlock_M({
    onClick,
    blockData,
}: {
    onClick: () => void
    blockData: ProjectCardProps
}) {
    const {
        project,
        company,
        role,
        location,
        dateRange,
        description,
        image,
        Heyperlink,
    } = blockData
    return (
        <div
            onClick={onClick}
            className='flex  flex-col  w-96 h-[140px] justify-between p-2  bg-white rounded-lg border border-solid border-slate-400 hover:border-2 hover:shadow-md hover:border-customeBorder'
        >
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
                            alt='🧑🏻‍💻'
                            onError={(e) => {
                                e.currentTarget.src =
                                    'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/project-management.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3Byb2plY3QtbWFuYWdlbWVudC5wbmciLCJpYXQiOjE3MzM0ODIxNjgsImV4cCI6NDg1NTU0NjE2OH0.0umRVoCaXnKs4twEf8gp8rauh-WeWNqW2gkZulAQ_ps&t=2024-12-06T10%3A49%3A28.429Z'
                            }}
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
                            strokeWidth='4'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M24 35C24 35 37 26.504 37 16.6818C37 9.67784 31.1797 4 24 4C16.8203 4 11 9.67784 11 16.6818C11 26.504 24 35 24 35Z'
                            fill='none'
                            stroke='#254d3e'
                            strokeWidth='4'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M24 22C26.7614 22 29 19.7614 29 17C29 14.2386 26.7614 12 24 12C21.2386 12 19 14.2386 19 17C19 19.7614 21.2386 22 24 22Z'
                            fill='none'
                            stroke='#254d3e'
                            strokeWidth='4'
                            strokeLinejoin='round'
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
