/** @format */
/** @format */
'use client'
import { useState } from 'react'
import {
    DragDropContext,
    DropResult,
    Droppable,
    Draggable,
} from 'react-beautiful-dnd'

interface Task {
    id: string
    content: string
}

interface Column {
    id: string
    title: string
    taskIds: string[]
}

interface Data {
    tasks: { [key: string]: Task }
    columns: { [key: string]: Column }
    columnOrder: string[]
}

const initialData: Data = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
    },
    columnOrder: ['column-1'],
}

export default function DraggableList() {
    const [data, setData] = useState<Data>(initialData)

    function onDragEnd(result: DropResult) {
        return
    }

    return data.columnOrder.map((columnId) => {
        const column = data.columns[columnId]
        const tasks: Task[] = column.taskIds.map(
            (taskId: string) => data.tasks[taskId]
        )

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <div className=''>
                    <Droppable droppableId={column.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className='grid grid-cols-10 gap-0'>
                                    {tasks.map((task, index) => (
                                        <div
                                            key={task.id}
                                            className='border border-solid border-black m-0'
                                        >
                                            <Draggable
                                                draggableId={task.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        //innerRef={provided.innerRef}
                                                    >
                                                        {task.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                            {/* <div>{task.content}</div> */}
                                        </div>
                                    ))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    {/* {tasks.map((task) => (
                        <div
                            key={task.id}
                            className='border border-solid border-black h-[100px] w-[150px] m-0'
                        >
                            <div>{task.content}</div>
                        </div>
                    ))} */}
                </div>
            </DragDropContext>
        )
    })
}
