/** @format */

import { Droppable } from 'react-beautiful-dnd'
import TaskComponent from './task'
import { Data, Column, Task } from './draggableList'

export default function ColumnObject({
    column,
    tasks,
}: {
    column: Column
    tasks: Task[]
}) {
    return (
        <div>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='grid grid-row-6 gap-0'
                    >
                        {tasks.map((task, index) => (
                            <TaskComponent
                                key={task.id}
                                task={task}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
