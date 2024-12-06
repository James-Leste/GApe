/** @format */

import * as React from 'react'
import { EducationCardProps } from './types'

export function EduBlock_L({
    onClick,
    blockData,
}: {
    onClick: () => void
    blockData: EducationCardProps
}) {
    const {
        logoUrl,
        institution,
        location,
        dateRange,
        description,
        field,
        degree,
        gpa,
        minor,
    } = blockData
    return (
        <div
            onClick={onClick}
            className='flex flex-col justify-between p-2  w-96 h-[236px] bg-white rounded-lg border border-solid border-slate-400 min-h-[140px] hover:border-2 hover:shadow-md hover:border-customeBorder'
        >
            <div className='flex  justify-between items-center w-full'>
                <div className='flex gap-1 items-center self-stretch my-auto'>
                    <img
                        loading='lazy'
                        src={logoUrl}
                        className='object-contain shrink-0 self-stretch my-auto aspect-[1.36] h-9'
                        alt='🏫'
                        onError={(e) => {
                            e.currentTarget.src =
                                'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/university.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3VuaXZlcnNpdHkucG5nIiwiaWF0IjoxNzMzNDc5NzU3LCJleHAiOjQ4NTU1NDM3NTd9.L8IVingUVIiunJxMWTJ_Dl7OfDtdM8Naoa_3fyqgE14&t=2024-12-06T10%3A09%3A17.317Z'
                        }}
                    />
                    <div className='flex flex-col self-stretch my-auto'>
                        <div className='text-xl font-semibold tracking-normal leading-none text-neutral-800'>
                            {institution}
                        </div>
                        <div className='text-sm font-medium leading-none text-neutral-700'>
                            {location}
                        </div>
                    </div>
                </div>
                <div className='self-stretch my-auto text-sm font-medium leading-none text-gray-700'>
                    {dateRange}
                </div>
            </div>
            <div
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
                className='  overflow-hidden py-2 w-full text-base font-medium my-2 border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'
            >
                {description}
            </div>
            <div className='flex flex-col  max-w-full text-sm text-gray-700'>
                <div className='flex gap-3.5 items-center w-full '>
                    <div className='self-stretch my-auto text-xl font-semibold leading-none text-slate-800'>
                        {field}
                    </div>
                    <div className='self-stretch my-auto'>{degree}</div>
                    <div className='self-stretch my-auto'>{gpa}</div>
                </div>
                {minor && <div className='leading-none'>Minor in {minor}</div>}
            </div>
        </div>
    )
}

export function EduBlock_M({
    onClick,
    blockData,
}: {
    onClick: () => void
    blockData: EducationCardProps
}) {
    const {
        logoUrl,
        institution,
        location,
        dateRange,
        description,
        field,
        degree,
        gpa,
        minor,
    } = blockData
    return (
        <div
            onClick={onClick}
            className='flex flex-col justify-between p-2 w-96 h-[140px] bg-white rounded-lg border border-solid border-slate-400 min-h-[140px] hover:border-2 hover:shadow-md hover:border-customeBorder'
        >
            <div className='flex gap-10 justify-between items-center w-full'>
                <div className='flex gap-1 items-center self-stretch my-auto'>
                    <img
                        loading='lazy'
                        src={logoUrl}
                        className='object-contain shrink-0 self-stretch my-auto aspect-[1.36] w-[38px]'
                        alt='🏫'
                        onError={(e) => {
                            e.currentTarget.src =
                                'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/university.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3VuaXZlcnNpdHkucG5nIiwiaWF0IjoxNzMzNDc5NzU3LCJleHAiOjQ4NTU1NDM3NTd9.L8IVingUVIiunJxMWTJ_Dl7OfDtdM8Naoa_3fyqgE14&t=2024-12-06T10%3A09%3A17.317Z'
                        }}
                    />
                    <div className='flex flex-col self-stretch my-auto'>
                        <div className='text-base font-semibold tracking-normal leading-none text-neutral-800'>
                            {institution}
                        </div>
                        <div className='text-sm font-medium leading-none text-neutral-700'>
                            {location}
                        </div>
                    </div>
                </div>
                <div className='self-stretch my-auto text-sm font-medium leading-none text-gray-700'>
                    {dateRange}
                </div>
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
            <div className='flex flex-col max-w-full text-sm text-gray-700'>
                <div className='flex gap-3.5 items-center w-full leading-none'>
                    <div className='self-stretch my-auto text-base font-semibold leading-none text-slate-800'>
                        {field}
                    </div>
                    <div className='self-stretch my-auto'>{degree}</div>
                    <div className='self-stretch my-auto'>{gpa}</div>
                </div>
                {minor && <div className='leading-none'>Minor in {minor}</div>}
            </div>
        </div>
    )
}
