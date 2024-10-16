/** @format */

import { Draggable } from 'react-beautiful-dnd'
import { Data, Column, Task } from './draggableList'

export default function TaskComponent({
    task,
    index,
}: {
    task: Task
    index: number
}) {
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
