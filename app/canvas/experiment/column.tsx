/** @format */

import { Droppable } from '@hello-pangea/dnd'
import Item from './item'
import { Column, Task } from './draggableList'

export default function ColumnComponent({
    column,
    tasks,
}: {
    column: Column
    tasks: Task[]
}) {
    return (
        <div>
            {/* <div>{column.title}</div> */}
            <Droppable droppableId={column.id} direction='horizontal'>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='flex flex-row flex-wrap m-5'
                    >
                        {tasks.map((task, index) => (
                            <div className='w-1/5'>
                                <Item key={task.id} task={task} index={index} />
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
