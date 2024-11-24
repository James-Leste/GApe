/** @format */
'use client'
import { colors } from '@atlaskit/theme'
import styled from '@emotion/styled'
import React, { ReactElement, useState } from 'react'
import { useMemo } from 'use-memo-one'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import type { Quote } from './scripts/types'
import { grid } from './scripts/constants'
import { authorQuoteMap, generateFakeData } from './scripts/data'
import reorder, { reorderQuoteMap } from './scripts/reorder'

const Parent = styled.div`
    display: flex;
    flex-direction: column;
`

type Size = 'small' | 'large'

interface ItemProps {
    quote: Quote
    index: number
}

const StyledItem = styled.div`
    border: 2px solid ${colors.N100};
    background: ${colors.G50};
    padding: ${grid}px;
    margin-bottom: ${grid}px;
    user-select: none;
    width: 200px;
    flex-shrink: 0;
`

function Item(props: ItemProps) {
    const { quote, index } = props

    return (
        <Draggable draggableId={quote.id} index={index}>
            {(provided) => (
                <StyledItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {quote.content}
                </StyledItem>
            )}
        </Draggable>
    )
}

interface ListProps {
    listId: string
    quotes: Quote[]
}

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Controls = styled.div`
    display: flex;
    flex-direction: column;
`

interface StyledListProps {
    isDraggingOver: boolean
    size: Size
}

const StyledList = styled.div<StyledListProps>`
    display: flex;
    flex-direction: row;
    border: 1px solid ${colors.N100};
    margin: ${grid}px;
    padding: ${grid}px;
    box-sizing: border-box;
    background-color: ${(props) =>
        props.isDraggingOver ? colors.B100 : 'inherit'};
    height: ${(props) => (props.size === 'large' ? 800 : 200)}px;
`

function List(props: ListProps) {
    const [size, setSize] = useState<Size>('small')
    return (
        <ListContainer>
            <Controls>
                <button type='button' onClick={() => setSize('small')}>
                    Small
                </button>
                <button type='button' onClick={() => setSize('large')}>
                    Large
                </button>
            </Controls>
            <Droppable droppableId={props.listId} direction='horizontal'>
                {(provided, snapshot) => (
                    <StyledList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        size={size}
                    >
                        {props.quotes.map((quote: Quote, index: number) => (
                            <Item key={quote.id} quote={quote} index={index} />
                        ))}
                        {provided.placeholder}
                    </StyledList>
                )}
            </Droppable>
        </ListContainer>
    )
}

export default function App(): ReactElement {
    const [columns, setColumns] = useState(authorQuoteMap)
    const ordered = useMemo(() => Object.keys(columns), [columns])

    function onDragEnd(result: DropResult) {
        const { source, destination } = result

        if (!destination) {
            return
        }

        // reordering in same list
        if (source.droppableId === destination.droppableId) {
            const newQuotes: Quote[] = reorder(
                columns[source.droppableId],
                source.index,
                destination.index
            )
            setColumns({
                ...columns,
                [source.droppableId]: newQuotes,
            })
            return
        }

        // moving between columns

        // remove item from source list
        const newColumns = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination,
        })

        setColumns(newColumns.quoteMap)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Parent>
                {ordered.map((key: string) => (
                    <List listId={key} quotes={columns[key]} key={key} />
                ))}
            </Parent>
        </DragDropContext>
    )
}
