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
//import { ColumnObject } from './column'
import ColumnObject from './column'

export interface Task {
    id: string
    content: string
}

export interface Column {
    id: string
    title: string
    taskIds: string[]
}

export interface Data {
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
        'task-5': { id: 'task-5', content: 'Fifth task' },
        'task-6': { id: 'task-6', content: 'Sixth task' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: [
                'task-1',
                'task-2',
                'task-3',
                'task-4',
                'task-5',
                'task-6',
            ],
        },
    },
    columnOrder: ['column-1'],
}

export default function DraggableList() {
    const [data, setData] = useState<Data>(initialData)

    function onDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const column = data.columns[source.droppableId]
        const newTaskIds = Array.from(column.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        }

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newColumn.id]: newColumn,
            },
        }
        setData(newState)
    }

    return data.columnOrder.map((columnId) => {
        const column = data.columns[columnId]
        const tasks: Task[] = column.taskIds.map(
            (taskId: string) => data.tasks[taskId]
        )

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId]
                    const tasks = column.taskIds.map(
                        (taskId) => data.tasks[taskId]
                    )

                    return (
                        <ColumnObject
                            key={column.id}
                            column={column}
                            tasks={tasks}
                        />
                    )
                })}
            </DragDropContext>
        )
    })
}
