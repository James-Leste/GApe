/** @format */

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

export type { Task, Column, Data }
