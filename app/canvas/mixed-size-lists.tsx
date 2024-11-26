/** @format */
'use client'
import { colors } from '@atlaskit/theme'
import styled from '@emotion/styled'
import React, { ReactNode, useEffect, useState } from 'react'
import { useMemo } from 'use-memo-one'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import type { Quote } from './scripts/types'
import { grid } from './scripts/constants'
import { reorderQuoteMap } from './scripts/reorder'
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
import { InfoBlock_L } from '@/components/blocks/info-block'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

const initial: ItemType[] = [
    {
        id: 'button',
        component: (
            <div>
                <InfoBlock_L onBlockClick={() => {}}></InfoBlock_L>
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
    flex-direction: row;
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
    width: 400px;
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
    flex-direction: column;
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
    flex-direction: column;
    border: 0px solid ${colors.N100};
    margin: ${grid}px;
    padding: ${grid}px;
    box-sizing: border-box;
    background-color: ${(props) =>
        props.isDraggingOver ? colors.B100 : 'inherit'};
    // height: ${(props) => (props.size === 'large' ? 300 : 200)}px;
    height: 100%;
    width: 430px;
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
            <Droppable droppableId={listId} direction='vertical'>
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

    const showdata = async () => {
        const { data: templates, error } = await supabase
            .from('templates')
            .select('*')
        if (templates && templates.length > 0) {
            console.log(templates[0].content)
        } else {
            console.log('No templates found')
        }
    }

    // const [columns, setColumns] = useState({authorQuoteMap})
    const [columns, setColumns] = useState<Record<string, ItemType[]>>({
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

    const addItem = (listId: string, item: ItemType) => {
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
            itemMap: columns,
            source,
            destination,
        })

        setColumns(newColumns.itemMap)
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
            <div>{user ? user.email : 'loading'}</div>
            <div>
                <Sheet key='bottom' modal={false}>
                    <SheetTrigger asChild>
                        <Button variant='outline'>bottom</Button>
                    </SheetTrigger>
                    <SheetContent side='bottom' className='bg-white'>
                        <SheetHeader>
                            <SheetTitle>Choose your block</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here.
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
                            <Button
                                onClick={() => addItem('column-0', initial[1])}
                            >
                                4
                            </Button>
                            <Button onClick={showdata}>5</Button>
                            <Button>6</Button>
                        </div>

                        <SheetFooter></SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
