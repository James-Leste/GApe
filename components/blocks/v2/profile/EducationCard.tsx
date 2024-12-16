/** @format */

import * as React from 'react'
import { EducationCardProps } from './types'
import { Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EduBlock_L({
    onClick,
    isInList,
    blockData,
}: {
    onClick?: () => void
    isInList?: boolean
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
            className='flex relative flex-col gap-1 p-2  w-96 h-[236px] bg-white rounded-lg border border-solid border-slate-300 min-h-[140px] hover:border-2 hover:shadow-md hover:border-customeBorder group'
        >
            {!isInList && (
                 <button
                
                 onClick={onClick}
                 className='absolute top-2 right-2 hidden group-hover:block bg-customeBG1 p-1 border border-customeBorder rounded-sm cursor-pointer'
             >
                 <Edit className='w-4 h-4 text-customeText2' />
             </button>)}
            
            <div className='flex flex-row   w-full'>
                <div className='flex gap-2  items-center w-full '>
                    <img
                        loading='lazy'
                        src={logoUrl}
                        className='object-contain shrink-0 self-stretch    h-12 w-12'
                        alt='🏫'
                        onError={(e) => {
                            e.currentTarget.src =
                                'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/university.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3VuaXZlcnNpdHkucG5nIiwiaWF0IjoxNzMzNDc5NzU3LCJleHAiOjQ4NTU1NDM3NTd9.L8IVingUVIiunJxMWTJ_Dl7OfDtdM8Naoa_3fyqgE14&t=2024-12-06T10%3A09%3A17.317Z'
                        }}
                    />
                    <div className='flex flex-col  gap-1 w-full  '>
                        <div className='text-xl font-semibold tracking-normal leading-none text-neutral-800'>
                            {institution}
                        </div>
                        <div className='flex gap-1 justify-between'>
                            <div className='text-sm font-medium leading-none text-neutral-700'>
                                {location}
                            </div>
                            <div className=' text-sm font-medium leading-none text-gray-700'>
                                {dateRange}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                }}
                className=' h-full overflow-hidden py-2 w-full text-base font-medium  border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'
            >
                {description}
            </div>
            <div className='flex flex-col  max-w-full text-sm text-gray-700'>
                <div className='flex gap-3.5 items-center w-full '>
                    <div className='self-stretch    text-xl font-semibold leading-none text-slate-800'>
                        {field}
                    </div>
                    <div className='self-stretch   '>{degree}</div>
                    <div className='self-stretch   '>{gpa}</div>
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
            className='flex flex-col gap-1  p-2 w-96 h-[140px] bg-white rounded-lg border border-solid border-slate-300 min-h-[140px] hover:border-2 hover:shadow-md hover:border-customeBorder'
        >
            <div className='flex gap-10 justify-between items-center w-full'>
                <div className='flex gap-1 items-center self-stretch w-full   '>
                    <img
                        loading='lazy'
                        src={logoUrl}
                        className='object-contain shrink-0 self-stretch    aspect-[1.36] w-[38px]'
                        alt='🏫'
                        onError={(e) => {
                            e.currentTarget.src =
                                'https://ogbwfcmgzyaldlnrwazo.supabase.co/storage/v1/object/sign/Gape/block_template/university.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJHYXBlL2Jsb2NrX3RlbXBsYXRlL3VuaXZlcnNpdHkucG5nIiwiaWF0IjoxNzMzNDc5NzU3LCJleHAiOjQ4NTU1NDM3NTd9.L8IVingUVIiunJxMWTJ_Dl7OfDtdM8Naoa_3fyqgE14&t=2024-12-06T10%3A09%3A17.317Z'
                        }}
                    />
                    <div className='flex flex-col self-stretch w-full px-1 '>
                        <div className='text-base font-semibold tracking-normal leading-none text-neutral-800'>
                            {institution}
                        </div>
                        <div className=' flex gap-2 justify-between w-full '>
                            <div className='text-sm font-medium leading-none text-neutral-700'>
                                {location}
                            </div>
                            <div className='self-stretch    text-sm font-medium leading-none text-gray-700'>
                                {dateRange}
                            </div>
                        </div>
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
                className=' h-full overflow-hidden shrink  self-stretch py-1 w-full text-sm font-medium leading-4 border-t border-b border-solid border-b-gray-300 border-t-gray-300 text-neutral-600'
            >
                {description}
            </div>
            <div className='flex flex-col max-w-full text-sm text-gray-700'>
                <div className='flex gap-3.5 items-center w-full leading-none'>
                    <div className='self-stretch    text-base font-semibold leading-none text-slate-800'>
                        {field}
                    </div>
                    <div className='self-stretch   '>{degree}</div>
                    <div className='self-stretch   '>{gpa}</div>
                </div>
                {minor && <div className='leading-none'>Minor in {minor}</div>}
            </div>
        </div>
    )
}
