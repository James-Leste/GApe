/** @format */
'use client'
import { colors } from '@atlaskit/theme'
import styled from '@emotion/styled'
import React, { ReactElement, ReactNode, useState } from 'react'
import { useMemo } from 'use-memo-one'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import type { Quote } from './scripts/types'
import { grid } from './scripts/constants'
import { quotes2 } from './scripts/data'
import reorder, { reorderQuoteMap } from './scripts/reorder'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import InfoBlock from '@/components/blocks/info'

const initial: ItemType[] = [
    {
        id: 'button',
        component: (
            <div>
                <InfoBlock></InfoBlock>
                {/* <p>Standard</p>
                <button type='button'>hello world</button>
                <br />
                <p>
                    With child{' '}
                    <a
                        href='https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        phrasing content
                    </a>
                </p>
                <button type='button'>
                    why{' '}
                    <strong>
                        hello <em>there!</em>
                    </strong>
                </button>
                <p>
                    With child{' '}
                    <a
                        href='https://developer.mozilla.org/en-US/docs/Web/API/SVGElement'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        SVGElement
                    </a>
                </p>
                <button type='button'>
                    My circle <br />
                    <svg width='40' height='40'>
                        <circle cx='20' cy='20' r='20' />
                    </svg>
                </button> */}
            </div>
        ),
    },
    {
        id: 'select',
        component: (
            <select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
            </select>
        ),
    },
    {
        id: 'textarea',
        component: <textarea placeholder='type some text here' />,
    },
    {
        id: 'input',
        component: (
            <div>
                <input type='text' placeholder='text input' />
            </div>
        ),
    },
    {
        id: 'checkbox',
        component: (
            <div>
                <label htmlFor='myCheckbox1'>
                    <input id='myCheckbox1' type='checkbox' name='myCheckbox' />
                    Checkbox 1
                </label>
                <br />
                <label htmlFor='myCheckbox2'>
                    <input id='myCheckbox2' type='checkbox' name='myCheckbox' />
                    Checkbox 2
                </label>
            </div>
        ),
    },
    {
        id: 'radio',
        component: (
            <div>
                <label htmlFor='myRadio'>
                    <input id='myRadio1' type='radio' name='myRadio' />
                    Option 1
                </label>
                <br />
                <label htmlFor='myRadio'>
                    <input id='myRadio2' type='radio' name='myRadio' />
                    Option 2
                </label>
            </div>
        ),
    },
    {
        id: 'range',
        component: <input type='range' min='1' max='100' />,
    },
    {
        id: 'content editable',
        component: (
            <div
                contentEditable
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: `
              A content editable with
              <strong>my super cool content</strong>
            `,
                }}
            />
        ),
    },
]

interface ItemType {
    id: string
    component: ReactNode
}

const Parent = styled.div`
    display: flex;
    flex-direction: column;
`

type Size = 'small' | 'large'

// interface ItemProps {
//     quote: Quote
//     index: number
// }

const StyledItem = styled.div`
    border: 2px solid ${colors.N100};
    background: ${colors.G50};
    padding: ${grid}px;
    margin-bottom: ${grid}px;
    user-select: none;
    width: fit-content;
    height: fit-content;
    flex-shrink: 0;
    overflow-y: auto;
    overflow-x: hidden;
`

function Item({ item, index }: { item: ItemType; index: number }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <StyledItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {item.component}
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
    // height: ${(props) => (props.size === 'large' ? 300 : 200)}px;
    height: fit-content;
`

function List({ listId, items }: { listId: string; items: ItemType[] }) {
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
            <Droppable droppableId={listId} direction='horizontal'>
                {(provided, snapshot) => (
                    <StyledList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        size={size}
                    >
                        {items.map((item: ItemType, index: number) => (
                            <Item key={item.id} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                    </StyledList>
                )}
            </Droppable>
        </ListContainer>
    )
}

export default function App() {
    // const [columns, setColumns] = useState({authorQuoteMap})
    const [columns, setColumns] = useState({
        ['column-0']: [],
        ['column-1']: [],
        ['column-2']: [],
    })
    //const ordered = ['Finn', 'Jake', 'Princess bubblegum', 'BMO']
    const ordered = useMemo(() => Object.keys(columns), [columns])

    const addColumn = () => {
        const newColumn = {
            ...columns,
            [`column-${ordered.length}`]: [],
        }
        setColumns(newColumn)
    }

    const addItem = (listId: string, item: {}) => {
        if (Object.keys(columns).length === 0) {
            console.log('no columns available')
        } else {
            setColumns((prevColumns) => ({
                ...prevColumns,
                [listId]: [...(prevColumns[listId] || []), item],
            }))
        }
    }

    function onDragEnd(result: DropResult) {
        const { source, destination } = result

        if (!destination) {
            return
        }

        // reordering in same list
        // if (source.droppableId === destination.droppableId) {
        //     const newQuotes: Quote[] = reorder(
        //         columns[source.droppableId],
        //         source.index,
        //         destination.index
        //     )
        //     setColumns({
        //         ...columns,
        //         [source.droppableId]: newQuotes,
        //     })
        //     return
        // }

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
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(columns).length != 0 ? (
                    <Parent>
                        {ordered.map((key: string) => (
                            <List listId={key} items={columns[key]} key={key} />
                        ))}
                    </Parent>
                ) : null}
            </DragDropContext>
            <div>
                <Sheet key='bottom' modal={false}>
                    <SheetTrigger asChild>
                        <Button variant='outline'>bottom</Button>
                    </SheetTrigger>
                    <SheetContent side='bottom' className='bg-white'>
                        <SheetHeader>
                            <SheetTitle>Choose your block</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                            </SheetDescription>
                        </SheetHeader>

                        <div className='flex flex-row gap-5'>
                            <Button onClick={addColumn}>add a column</Button>
                            <Button
                                onClick={() => addItem('column-0', initial[0])}
                            >
                                add an item
                            </Button>
                            <Button onClick={() => console.log(columns)}>
                                3
                            </Button>
                            <Button>4</Button>
                            <Button>5</Button>
                            <Button>6</Button>
                        </div>

                        <SheetFooter></SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
