/** @format */

import React from 'react'

import { Draggable } from '@hello-pangea/dnd'
import { Task, Column, Data } from './draggableList'

export default function Item({ task, index }: { task: Task; index: number }) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className='flex flex-col justify-between border border-solid border-black px-5 m-5'
                >
                    <div className='truncate whitespace-nowrap'>
                        {task.title}
                    </div>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                        {task.content}
                    </div>
                </div>
            )}
        </Draggable>
    )
}
