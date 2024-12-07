/** @format */

import * as React from 'react'
import { SkillsCardProps } from './types'

export const SkillsBlock_L: React.FC<SkillsCardProps> = ({ categories }) => {
    return (
        <div className='flex flex-col grow gap-2 px-2 py-2.5 text-xs  leading-loose bg-white rounded-lg border border-solid border-slate-400 w-96 h-[236px]'>
            {categories.map((category, index) => (
                <div
                    key={index}
                    className='flex flex-col w-full border-b border-gray-300'
                >
                    <div className='flex flex-col w-full whitespace-nowrap'>
                        <div className='flex items-start w-full text-neutral-800'>
                            <div className='flex  items-center'>
                                <div className=' self-stretch leading-4 px-1  rounded-lg font-medium border border-solid border-neutral-300'>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-0.5 items-start self-start mt-1 min-h-[20px] text-neutral-500'>
                            {category.skills.map((skill, skillIndex) => (
                                <React.Fragment key={skillIndex}>
                                    <div className='leading-4'>{skill}</div>
                                    {skillIndex <
                                        category.skills.length - 1 && (
                                        <div className='leading-4'>|</div>
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

export const SkillsBlock_M: React.FC<SkillsCardProps> = ({ categories }) => {
      const categoriesForMedium = [categories[0], categories[categories.length - 1]]
    return (
        <div className='flex flex-col grow gap-2 justify-center px-2 py-2.5  text-xs font-medium leading-loose bg-white rounded-lg border border-solid border-slate-300   w-96 h-[140px]'>
            {categoriesForMedium.map((category, index) => (
                <div
                    key={index}
                    className='flex flex-col w-full border-b border-gray-300'
                >
                    <div className='flex flex-col w-full whitespace-nowrap'>
                        <div className='flex items-start w-full text-neutral-800'>
                            <div className='flex  items-center'>
                                <div className=' self-stretch leading-4 px-1  rounded-lg font-medium border border-solid border-neutral-300'>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-0.5 items-start self-start mt-1 min-h-[20px] text-neutral-500'>
                            {category.skills.map((skill, skillIndex) => (
                                <React.Fragment key={skillIndex}>
                                    <div className='leading-4'>{skill}</div>
                                    {skillIndex <
                                        category.skills.length - 1 && (
                                        <div className='leading-4'>|</div>
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
