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
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => (
                            <Item key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
