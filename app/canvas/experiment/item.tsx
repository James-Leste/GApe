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
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    )
}
