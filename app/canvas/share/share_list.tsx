/** @format */
'use client'
import { colors } from '@atlaskit/theme'
import styled from '@emotion/styled'
import React, { ReactNode, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import type { ItemMap, ItemType } from '../scripts/types'
import { reorderQuoteMap } from '../scripts/reorder'

import { Button } from '@/components/ui/button'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

import { Label } from '@/components/ui/label'
import {
    addBlock,
    deleteBlock,
    getBlock,
    getBlockById,
    getBlockMap,
    getTemplates,
    updateBlock,
    updateBlockColumn,
} from '../actions'
import {
    blockColumn,
    BlockMap,
    Block,
    ProfileCardProps,
    ProjectCardProps,
    PublicationCardProps,
    ExperienceCardProps,
    EducationCardProps,
} from '@/types/dbtypes'

import {
    EduBlock_L,
    EduBlock_M,
} from '@/components/blocks/v2/profile/EducationCard'
import {
    WorkBlock_L,
    WorkBlock_M,
} from '@/components/blocks/v2/profile/ExperienceCard'
import {
    ProjectBlock_L,
    ProjectBlock_M,
} from '@/components/blocks/v2/profile/ProjectCard'
import {
    PublicationBlock_L,
    PublicationBlock_M,
} from '@/components/blocks/v2/profile/PublicationCard'

//import { EduBlock_L, EduBlock_M } from '@/components/blocks/edu-block'
import {
    InfoBlock_L,
    InfoBlock_M,
} from '@/components/blocks/v2/profile/info-block'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { TagInput } from 'rsuite'

import 'rsuite/TagInput/styles/index.css'

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
    const [selectedContent, setSelectedContent] = useState<Record<string, any>>(
        {}
    )
    const [tags, setTags] = useState<string[]>([])
    const [blockId, setBlockId] = useState<string>('')
    const [columnNumber, setColumnNumber] = useState<number>(-1)
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
        if (user) {
            showTemplates()
        }
    }, [user])

    useEffect(() => {
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

                            switch (block.template_name) {
                                case 'Info': {
                                    const content: ProfileCardProps =
                                        block.content as ProfileCardProps
                                    if (block.isBig) {
                                        return {
                                            id: block.id,
                                            component: (
                                                <InfoBlock_L
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setTags(content.tags)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></InfoBlock_L>
                                            ),
                                        }
                                    } else {
                                        return {
                                            id: block.id,
                                            component: (
                                                <InfoBlock_M
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setTags(content.tags)
                                                        setBlockId(block.id)
                                                    }}
                                                    blockData={content}
                                                ></InfoBlock_M>
                                            ),
                                        }
                                    }
                                }
                                case 'Education': {
                                    const content: EducationCardProps =
                                        block.content as EducationCardProps
                                    if (block.isBig) {
                                        return {
                                            id: block.id,
                                            component: (
                                                <EduBlock_L
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></EduBlock_L>
                                            ),
                                        }
                                    } else {
                                        return {
                                            id: block.id,
                                            component: (
                                                <EduBlock_M
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></EduBlock_M>
                                            ),
                                        }
                                    }
                                }
                                case 'Work': {
                                    const content: ExperienceCardProps =
                                        block.content as ExperienceCardProps
                                    if (block.isBig) {
                                        return {
                                            id: block.id,
                                            component: (
                                                <WorkBlock_L
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></WorkBlock_L>
                                            ),
                                        }
                                    } else {
                                        return {
                                            id: block.id,
                                            component: (
                                                <WorkBlock_M
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></WorkBlock_M>
                                            ),
                                        }
                                    }
                                }
                                case 'Project': {
                                    const content: ProjectCardProps =
                                        block.content as ProjectCardProps
                                    if (block.isBig) {
                                        return {
                                            id: block.id,
                                            component: (
                                                <ProjectBlock_L
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></ProjectBlock_L>
                                            ),
                                        }
                                    } else {
                                        return {
                                            id: block.id,
                                            component: (
                                                <ProjectBlock_M
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></ProjectBlock_M>
                                            ),
                                        }
                                    }
                                }
                                case 'Publication': {
                                    const content: PublicationCardProps =
                                        block.content as PublicationCardProps
                                    if (block.isBig) {
                                        return {
                                            id: block.id,
                                            component: (
                                                <PublicationBlock_L
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></PublicationBlock_L>
                                            ),
                                        }
                                    } else {
                                        return {
                                            id: block.id,
                                            component: (
                                                <PublicationBlock_M
                                                    onClick={() => {
                                                        setSelectedTemplate(
                                                            Object.keys(content)
                                                        )
                                                        setSelectedContent(
                                                            content
                                                        )
                                                        setIsEditsheetOpen(true)
                                                        setBlockId(block.id)
                                                        setColumnNumber(
                                                            block.column
                                                        )
                                                    }}
                                                    blockData={content}
                                                ></PublicationBlock_M>
                                            ),
                                        }
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

    // todo add on click functions to each block
    const showTemplates = async () => {
        const dbtemplates = await getTemplates()
        //console.log(dbtemplates)
        if (dbtemplates && user) {
            //setTemplates(templates)
            const initTemplates: ItemType[] = []

            dbtemplates?.map((template) => {
                if (template.name === 'Info') {
                    console.log('Adding 2 info blocks')
                    initTemplates.push({
                        id: template.id + '-L',
                        component: (
                            <InfoBlock_L
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        true
                                    )
                                }}
                                blockData={template.content}
                            ></InfoBlock_L>
                        ),
                    })
                    initTemplates.push({
                        id: template.id + '-M',
                        component: (
                            <InfoBlock_M
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        false
                                    )
                                }}
                                blockData={template.content}
                            ></InfoBlock_M>
                        ),
                    })
                } else if (template.name === 'Education') {
                    console.log('Adding 2 Project blocks')
                    initTemplates.push({
                        id: template.id + '-L',
                        component: (
                            <EduBlock_L
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        true
                                    )
                                }}
                                blockData={template.content}
                            ></EduBlock_L>
                        ),
                    })
                    initTemplates.push({
                        id: template.id + '-M',
                        component: (
                            <EduBlock_M
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        false
                                    )
                                }}
                                blockData={template.content}
                            ></EduBlock_M>
                        ),
                    })
                } else if (template.name === 'Work') {
                    initTemplates.push({
                        id: template.id + '-L',
                        component: (
                            <WorkBlock_L
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        true
                                    )
                                }}
                                blockData={template.content}
                            ></WorkBlock_L>
                        ),
                    })
                    initTemplates.push({
                        id: template.id + '-M',
                        component: (
                            <WorkBlock_M
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        false
                                    )
                                }}
                                blockData={template.content}
                            ></WorkBlock_M>
                        ),
                    })
                } else if (template.name === 'Publication') {
                    initTemplates.push({
                        id: template.id + '-L',
                        component: (
                            <PublicationBlock_L
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        true
                                    )
                                }}
                                blockData={template.content}
                            ></PublicationBlock_L>
                        ),
                    })
                    initTemplates.push({
                        id: template.id + '-M',
                        component: (
                            <PublicationBlock_M
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        false
                                    )
                                }}
                                blockData={template.content}
                            ></PublicationBlock_M>
                        ),
                    })
                } else if (template.name === 'Project') {
                    initTemplates.push({
                        id: template.id + '-L',
                        component: (
                            <ProjectBlock_L
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        true
                                    )
                                }}
                                blockData={template.content}
                            ></ProjectBlock_L>
                        ),
                    })
                    initTemplates.push({
                        id: template.id + '-M',
                        component: (
                            <ProjectBlock_M
                                onClick={async () => {
                                    await addBlockState(
                                        canvas_id,
                                        user.id,
                                        template.id,
                                        template.content,
                                        template.name,
                                        false
                                    )
                                }}
                                blockData={template.content}
                            ></ProjectBlock_M>
                        ),
                    })
                }
                // } else if (template.name === 'Education') {
                //     console.log('Adding 2 Edu blocks')
                //     initTemplates.push({
                //         id: template.id + '-L',
                //         component: (
                //             <EduBlock_L
                //                 onBlockClick={() => {}}
                //                 block_data={edu_block_data}
                //             ></EduBlock_L>
                //         ),
                //     })
                //     initTemplates.push({
                //         id: template.id + '-M',
                //         component: (
                //             <EduBlock_M
                //                 onBlockClick={() => {}}
                //                 block_data={edu_block_data}
                //             ></EduBlock_M>
                //         ),
                //     })
                // }
            })
            console.log(initTemplates)
            setTemplates(initTemplates)
        }
    }

    // get the map mapping the canvas_id to the block_id
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
        let counter = 0
        let shortestColumnIndex = 0
        for (const column in columns) {
            if (columns[column].length < minLength) {
                minLength = columns[column].length

                shortestColumnIndex = counter
            }
            counter++
        }
        return shortestColumnIndex
    }

    //decrapated
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

    const addBlockState = async (
        canvas_id: string,
        user_id: string,
        template_id: string,
        content: object,
        template_name: string,
        isBig: boolean
    ) => {
        await addBlock(
            canvas_id,
            user_id,
            template_id,
            content,
            0,
            template_name,
            isBig
        )
        await initMap(canvas_id)
    }

    async function onDragEnd(result: DropResult) {
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

        // const idList1: string[] = newColumns.itemMap[ordered[0]].map(
        //     (item) => item.id
        // )
        // const idList2: string[] = newColumns.itemMap[ordered[1]].map(
        //     (item) => item.id
        // )
        // console.log(idList1)
        // console.log(idList2)

        // await Promise.all([
        //     updateBlockColumn(canvas_id, 0, idList1),
        //     updateBlockColumn(canvas_id, 1, idList2),
        // ])
    }

    const deleteBlockState = async (
        canvas_id: string,
        block_id: string,
        column_number: number
    ) => {
        deleteBlock(canvas_id, block_id, column_number)
        await initMap(canvas_id)
    }

    return (
        <div className='flex flex-col h-full overflow-y-scroll justify-center items-center'>
            <div>
                <Label>
                    Here you could view the masterpiece and play around with it
                </Label>
                <Button
                    className='m-5'
                    onClick={async () => {
                        await initMap(canvas_id)
                    }}
                >
                    Reset
                </Button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(columns).length != 0 ? (
                    <Parent>
                        {ordered.map((key: string) => (
                            <List listId={key} items={columns[key]} key={key} />
                        ))}
                    </Parent>
                ) : null}
            </DragDropContext>

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
        </div>
    )
}
