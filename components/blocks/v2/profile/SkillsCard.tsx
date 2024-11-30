/** @format */

import * as React from 'react'
import { SkillsCardProps } from './types'

export const SkillsCard: React.FC<SkillsCardProps> = ({ categories }) => {
    return (
        <div className='flex flex-col grow px-2 py-2.5 w-full text-xs font-medium leading-loose bg-white rounded-lg border border-solid border-slate-400 min-h-[236px]'>
            {categories.map((category, index) => (
                <div
                    key={index}
                    className='flex flex-col pb-2 w-full border-b border-gray-300'
                >
                    <div className='flex flex-col w-full whitespace-nowrap'>
                        <div className='flex items-start w-full text-neutral-800'>
                            <div className='flex gap-2 items-center w-[198px]'>
                                <div className='gap-2.5 self-stretch px-1 my-auto rounded-lg border border-solid border-neutral-300'>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-0.5 items-start self-start mt-1 min-h-[20px] text-neutral-500'>
                            {category.skills.map((skill, skillIndex) => (
                                <React.Fragment key={skillIndex}>
                                    <div>{skill}</div>
                                    {skillIndex <
                                        category.skills.length - 1 && (
                                        <div>|</div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
