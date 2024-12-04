/** @format */
'use client'
import { colors } from '@atlaskit/theme'
import styled from '@emotion/styled'
import React, { ReactNode, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import type { Quote, ItemMap } from './scripts/types'
import { grid } from './scripts/constants'
import { reorderQuoteMap } from './scripts/reorder'

import { Button } from '@/components/ui/button'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { InfoBlock_L, InfoBlock_M } from '@/components/blocks/info-block'

import { InfoBlockData } from '@/components/blocks/blockType'

const block_data: InfoBlockData = {
    url: 'https://www.linkedin.com/in/john-smith-123456/',
    name: 'John Dash',
    image: 'https://s3.is-ali.tech/3ce276f382ff8edb74a24d8a2c872fa8.png',
    x: '@IsJohn_Smith22',
    email: 'example@mail.com',
    phone: '+358 401234567',
    github: '@John_Smith22',
    linkedin: '@John_Smith22',
    description:
        "I'm a Software Developer and Aalto University graduate with expertise in building web and data-driven applications. I enjoy solving complex problems using technologies like Python, Java, and JavaScript. Let's connect and create something awesome together!",
    type: 'Default type',
    tags: ['Python', 'Java', 'JavaScript', 'Node.js'],
}

const initial: ItemType[] = [
    {
        id: '1',
        component: (
            <InfoBlock_L
                onBlockClick={() => {}}
                block_data={block_data}
            ></InfoBlock_L>
        ),
    },
    {
        id: '2',
        component: (
            <InfoBlock_M
                onBlockClick={() => {}}
                block_data={block_data}
            ></InfoBlock_M>
        ),
    },
]

interface ItemType {
    id: string
    component: ReactNode
}

const Parent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

type Size = 'small' | 'large'

// interface ItemProps {
//     quote: Quote
//     index: number
// }

const StyledItem = styled.div`
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

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

interface StyledListProps {
    isDraggingOver: boolean
}

const StyledList = styled.div<StyledListProps>`
    display: flex;
    flex-direction: column;
    aligh-items: center;
    align-content: center;
    border: 1px solid ${colors.N100};
    background-color: ${(props) =>
        props.isDraggingOver ? colors.B100 : 'inherit'};
    height: 100%;
    width: 24rem;
`

function List({ listId, items }: { listId: string; items: ItemType[] }) {
    return (
        <ListContainer>
            <Droppable droppableId={listId} direction='vertical'>
                {(provided, snapshot) => (
                    <StyledList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
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

const supabase = createClient()

export default function App() {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<Error | null>(null)
    //const [templates, setTemplates] = useState<any>(null)
    useEffect(() => {
        const getUser = () => {
            supabase.auth.getUser().then(({ data, error }) => {
                if (error) {
                    setError(error)
                } else {
                    setUser(data.user)
                }
            })
        }
        getUser()
    }, [])

    const selections: ReactNode[] = [
        <InfoBlock_L
            onBlockClick={() =>
                addItem('column-0', {
                    id: (Math.random() + 1).toString(36).substring(7),
                    component: (
                        <InfoBlock_L
                            onBlockClick={() => {}}
                            block_data={block_data}
                        ></InfoBlock_L>
                    ),
                })
            }
            block_data={block_data}
        ></InfoBlock_L>,
        <InfoBlock_M
            onBlockClick={() =>
                addItem('column-0', {
                    id: (Math.random() + 1).toString(36).substring(7),
                    component: (
                        <InfoBlock_M
                            onBlockClick={() => {}}
                            block_data={block_data}
                        ></InfoBlock_M>
                    ),
                })
            }
            block_data={block_data}
        ></InfoBlock_M>,
    ]

    const [columns, setColumns] = useState<ItemMap>({
        ['column-0']: [initial[0]],
        ['column-1']: [initial[1]],
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

    const getShortestColumn = (columns: ItemMap) => {
        let minLength = Infinity
        let shortestColumn = ''

        for (const column in columns) {
            if (columns[column].length < minLength) {
                minLength = columns[column].length
                shortestColumn = column
            }
        }

        return shortestColumn
    }

    const addItem = (listId: string, item: ItemType) => {
        if (Object.keys(columns).length === 0) {
            console.log('no columns available')
        } else {
            const leastIndex = getShortestColumn(columns)
            setColumns((prevColumns) => ({
                ...prevColumns,
                [leastIndex]: [...(prevColumns[leastIndex] || []), item],
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
            itemMap: columns,
            source,
            destination,
        })

        setColumns(newColumns.itemMap)
    }

    return (
        <div className='flex h-full'>
            <div className='flex-shrink-0 flex-grow bg-gray-200'></div>
            <div className='flex flex-shrink-0 w-[75rem]'>
                <div className='bg-blue-500 w-[50rem]'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {Object.keys(columns).length != 0 ? (
                            <Parent>
                                {ordered.map((key: string) => (
                                    <List
                                        listId={key}
                                        items={columns[key]}
                                        key={key}
                                    />
                                ))}
                            </Parent>
                        ) : null}
                    </DragDropContext>
                </div>
                <div className='bg-green-500 w-[25rem]'>
                    {selections.map((selection, index) => (
                        <>{selection}</>
                    ))}
                </div>
            </div>

            {/* 

            <div className='col-span-1 bg-red-20 flex flex-col'>
                <div>Choose your block</div>

                <div>Make changes to your profile here.</div>

                <Button onClick={addColumn}>add a column</Button>
                <Button
                    onClick={() =>
                        addItem('column-0', {
                            id: (Math.random() + 1).toString(36).substring(7),
                            component: (
                                <InfoBlock_L
                                    onBlockClick={() => {}}
                                    block_data={block_data}
                                ></InfoBlock_L>
                            ),
                        })
                    }
                >
                    add an item
                </Button>
                <Button onClick={() => console.log(columns)}>3</Button>
                <Button onClick={() => addItem('column-0', initial[1])}>
                    4
                </Button>
                <Button onClick={showdata}>5</Button>
                <Button>6</Button>
            </div> */}

            <div className='flex-shrink-0 flex-grow bg-gray-200'></div>
        </div>
    )
}
