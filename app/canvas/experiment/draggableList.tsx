/** @format */

'use client'
import { useState } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import ColumnComponent from './column'

export interface Task {
    id: string
    title: string
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
        'task-1': {
            id: 'task-1',
            title: 'first title',
            content: 'Take out the garbage',
        },
        'task-2': {
            id: 'task-2',
            title: 'first title',
            content: 'Watch my favorite show',
        },
        'task-3': {
            id: 'task-3',
            title: 'first title',
            content: 'Charge my phone',
        },
        'task-4': {
            id: 'task-4',
            title: 'first title',
            content: 'Cook dinner',
        },
        'task-5': {
            id: 'task-5',
            title: 'first title',
            content: 'Fifth ddtask',
        },
        'task-6': {
            id: 'task-6',
            title: 'first title',
            content: 'Sixth tasdddk',
        },
        'task-7': {
            id: 'task-7',
            title: 'first title',
            content: 'Seventh task',
        },
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
                'task-7',
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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId]
                const tasks = column.taskIds.map((taskId) => data.tasks[taskId])
                return (
                    <ColumnComponent
                        key={index}
                        column={column}
                        tasks={tasks}
                    />
                )
            })}
        </DragDropContext>
    )

    // return tasks.map((task) => (
    //     <ColumnComponent
    //         key={task.id}
    //         column={column}
    //         tasks={}
    //     ></ColumnComponent>
    // ))
}
