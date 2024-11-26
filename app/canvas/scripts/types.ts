/** @format */

import type { DraggableId, DraggableLocation } from '@hello-pangea/dnd'
import { ReactNode } from 'react'

export type Id = string

export interface AuthorColors {
    soft: string
    hard: string
}

export interface Author {
    id: Id
    name: string
    url: string
    colors: AuthorColors
}

export interface Quote {
    id: Id
    content: string
    author: Author
}

export interface Dragging {
    id: DraggableId
    location: DraggableLocation
}

export interface QuoteMap {
    [key: string]: Quote[]
}

export interface Task {
    id: Id
    content: string
}

export interface ItemMap {
    [key: string]: ItemType[]
}

export interface ItemType {
    id: string
    component: ReactNode
}
