/** @format */
'use client'
import { colors } from '@atlaskit/theme'
import styled from '@emotion/styled'
import React, { ReactNode, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import type { ItemMap, ItemType } from './scripts/types'
import { reorderQuoteMap } from './scripts/reorder'

import { Button } from '@/components/ui/button'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

//import { InfoBlockData } from '@/components/blocks/blockType'
import { Label } from '@/components/ui/label'
import { getBlock, getBlockById, getBlockMap, getTemplates } from './actions'
import {
    blockColumn,
    BlockMap,
    Canvas,
    EduBlockData,
    Template,
    Block,
    InfoBlockData,
} from '@/types/dbtypes'

import customSheet, { info_block_data, edu_block_data } from './default'

import { EduBlock_L, EduBlock_M } from '@/components/blocks/edu-block'
import { InfoBlock_L, InfoBlock_M } from '@/components/blocks/info-block'
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
import { Input } from '@/components/ui/input'

const Parent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

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

export default function App({ canvas_id }: { canvas_id: string }) {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [blocks, setBlocks] = useState<BlockMap>(new Map())
    const [templates, setTemplates] = useState<ItemType[]>([])
    const [columns, setColumns] = useState<ItemMap>({})
    const ordered = useMemo(() => Object.keys(columns), [columns])
    const [isEditsheetOpen, setIsEditsheetOpen] = useState<boolean>(false)
    const [selectedTemplate, setSelectedTemplate] = useState<string[]>([])
    const [selectedContent, setSelectedContent] = useState<
        InfoBlockData | EduBlockData | null
    >(null)
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

    useEffect(() => {
        showTemplates()
        showBlock(canvas_id)
        initMap(canvas_id)
    }, [])

    //load block from database to local state
    const initMap = async (canvas_id: string) => {
        const data = await getBlockMap(canvas_id)
        if (data) {
            // list1: first column
            // list2: second column
            const lists: blockColumn[] = data
            const column1: blockColumn = lists.filter(
                (list) => list.column === 0
            )[0]
            const column2: blockColumn = lists.filter(
                (list) => list.column === 1
            )[0]
            const columns: ItemMap = {
                [column1.id]: [],
                [column2.id]: [],
            }

            const fetchBlocks = async (
                blockIds: string[],
                columnId: string
            ) => {
                const blocks = await Promise.all(
                    blockIds.map(async (block_id) => {
                        const data: Block = await getBlockById(block_id)
                        if (data) {
                            const block: Block = data
                            const content: InfoBlockData =
                                block.content as InfoBlockData
                            switch (block.template_name) {
                                case 'Info':
                                    if (block.isBig) {
                                        return {
                                            id: block.id,
                                            component: (
                                                <InfoBlock_L
                                                    onBlockClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        //console.log(content)
                                                    }}
                                                    block_data={content}
                                                ></InfoBlock_L>
                                            ),
                                        }
                                    } else {
                                        return {
                                            id: block.id,
                                            component: (
                                                <InfoBlock_M
                                                    onBlockClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(
                                                                block.content
                                                            )
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        //console.log(content)
                                                    }}
                                                    block_data={content}
                                                ></InfoBlock_M>
                                            ),
                                        }
                                    }
                            }
                        }
                        return null
                    })
                )
                columns[columnId] = blocks.filter((block) => block !== null)
            }

            await Promise.all([
                fetchBlocks(column1.blocks, column1.id),
                fetchBlocks(column2.blocks, column2.id),
            ])
            console.log(columns)
            setColumns(columns)
        }
    }

    const showTemplates = async () => {
        const dbtemplates = await getTemplates()
        if (dbtemplates) {
            //setTemplates(templates)
            const initTemplates: ItemType[] = []

            dbtemplates?.map((template) => {
                if (template.name === 'Info') {
                    console.log('Adding 2 info blocks')
                    initTemplates.push({
                        id: template.id + '-L',
                        component: (
                            <InfoBlock_L
                                onBlockClick={() => {
                                    addItem({
                                        id: (Math.random() + 1)
                                            .toString(36)
                                            .substring(7),
                                        component: (
                                            <InfoBlock_L
                                                onBlockClick={() => {}}
                                                block_data={info_block_data}
                                            ></InfoBlock_L>
                                        ),
                                    })
                                }}
                                block_data={info_block_data}
                            ></InfoBlock_L>
                        ),
                    })
                    initTemplates.push({
                        id: template.id + '-M',
                        component: (
                            <InfoBlock_M
                                onBlockClick={() => {}}
                                block_data={info_block_data}
                            ></InfoBlock_M>
                        ),
                    })
                } else if (template.name === 'Education') {
                    console.log('Adding 2 Edu blocks')
                    initTemplates.push({
                        id: template.id + '-L',
                        component: (
                            <EduBlock_L
                                onBlockClick={() => {}}
                                block_data={edu_block_data}
                            ></EduBlock_L>
                        ),
                    })
                    initTemplates.push({
                        id: template.id + '-M',
                        component: (
                            <EduBlock_M
                                onBlockClick={() => {}}
                                block_data={edu_block_data}
                            ></EduBlock_M>
                        ),
                    })
                }
            })
            setTemplates(initTemplates)
        }
    }

    const showBlock = async (canvas_id: string) => {
        const newBlockMap: BlockMap =
            (await getBlock(canvas_id, blocks)) ?? new Map()
        setBlocks(newBlockMap)
    }

    // const addColumn = () => {
    //     const newColumn = {
    //         ...columns,
    //         [`column-${ordered.length}`]: [],
    //     }
    //     setColumns(newColumn)
    // }

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

    const addItem = (item: ItemType) => {
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
            <Sheet
                modal={true}
                defaultOpen={false}
                onOpenChange={setIsEditsheetOpen}
                open={isEditsheetOpen}
            >
                <SheetContent className='overflow-y-auto max-h-screen'>
                    <SheetHeader>
                        <SheetTitle>Set values</SheetTitle>
                        <SheetDescription>
                            Customize your block
                        </SheetDescription>
                    </SheetHeader>
                    <form
                        className='grid gap-4 py-4'
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const formData = new FormData(e.currentTarget)
                            const formObject = Object.fromEntries(
                                formData.entries()
                            )

                            console.log(JSON.stringify(formObject, null, 2))

                            // if (user?.id) {
                            //     await addBlock(
                            //         canvas.id,
                            //         user.id,
                            //         selectedTemplateId,
                            //         formObject,
                            //         Number(formObject.column),
                            //         'Info'
                            //     )
                            // } else {
                            //     console.error(
                            //         'User ID is undefined'
                            //     )
                            // }
                            // if (user?.id) {
                            //     addBlock(item.id, user.id, )
                            // }
                        }}
                    >
                        {selectedTemplate.map((template_id) => {
                            return (
                                <div
                                    className='grid grid-cols-6 items-center gap-1'
                                    key={template_id}
                                >
                                    <Label
                                        htmlFor={template_id}
                                        className='overflow-hidden col-span-2'
                                    >
                                        {template_id.toUpperCase()}
                                    </Label>
                                    <Input
                                        id={template_id}
                                        className='col-span-4'
                                        type='text'
                                        name={template_id}
                                        defaultValue={
                                            (
                                                selectedContent as Record<
                                                    string,
                                                    any
                                                >
                                            )?.[template_id]
                                        }
                                    />
                                </div>
                            )
                        })}
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type='submit'>Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

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
                <div className='bg-green-500 w-[25rem] h-[calc(100vh-4rem)] overflow-y-auto'>
                    <div>
                        <Label>
                            Click on the component that you would like to use.
                        </Label>
                    </div>

                    {templates.length === 0 ? (
                        <div>
                            <Label>
                                No templates to choose from? Try refresh
                            </Label>
                        </div>
                    ) : (
                        templates.map((selection) => (
                            <div key={selection.id}>{selection.component}</div>
                        ))
                    )}
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
