/** @format */
'use client'
import React, { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'

import { Canvas, BlockMap, Template } from '@/types/dbtypes'
import {
    getCanvasByUserId,
    getBlock,
    addBlock,
    deleteBlock,
    getBlockMap,
} from '@/app/canvas/actions'
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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const supabase = createClient()

const UserDataPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<Error | null>(null)
    // all the canvas
    const [canvas, setCanvas] = useState<Canvas[] | null>([])
    // all the blocks based on canvas_id
    const [blocks, setBlocks] = useState<BlockMap>(new Map())
    // all the templates
    const [templates, setTemplates] = useState<Template[]>([])
    // current template
    const [selectedTemplate, setSelectedTemplate] = useState<string[]>([])
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')

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
        const getTemplates = () => {
            supabase
                .from('templates')
                .select('*')
                .then(({ data, error }) => {
                    if (error) {
                        console.log(error.code)
                        return
                    } else {
                        setTemplates(data)
                    }
                })
        }

        getTemplates()
    }, [])

    const showCanvas = async () => {
        if (!user) {
            return
        }
        const canvas = await getCanvasByUserId(user?.id)
        setCanvas(canvas)
    }

    const showBlock = async (canvas_id: string) => {
        const newBlockMap: BlockMap =
            (await getBlock(canvas_id, blocks)) ?? new Map()
        setBlocks(newBlockMap)
    }

    const showBlockMap = async (canvas_id: string) => {
        const data = await getBlockMap(canvas_id)
        console.log(data)
    }

    return (
        <div>
            <div>
                <h1>User Data Page</h1>
                <p>Welcome to the user data page.</p>
                <p>Hello {user?.email}</p>
                <p></p>
            </div>
            <div>
                <Button onClick={showCanvas}>Show Canvas</Button>
                <Button onClick={() => console.log(blocks)}>
                    Show BlockMap
                </Button>
            </div>
            <div className='border-solid border-2 border-black w-fit'>
                <h1>Canvas</h1>
                {canvas?.map((canvas) => (
                    <div key={canvas.id} className='m-5'>
                        <div>
                            <Button
                                onClick={async () => {
                                    await showBlock(canvas.id)
                                    //console.log(blocks.get(item.id))
                                    //await getBlockColumn(item.id, 0)]
                                    await showBlockMap(canvas.id)
                                }}
                            >
                                Canvas name: {canvas.name}
                            </Button>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant='outline'>
                                        Add a block
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
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
                                            const formData = new FormData(
                                                e.currentTarget
                                            )
                                            const formObject =
                                                Object.fromEntries(
                                                    formData.entries()
                                                )

                                            console.log(
                                                JSON.stringify(
                                                    formObject,
                                                    null,
                                                    2
                                                )
                                            )
                                            if (user?.id) {
                                                await addBlock(
                                                    canvas.id,
                                                    user.id,
                                                    selectedTemplateId,
                                                    formObject,
                                                    Number(formObject.column),
                                                    'Info'
                                                )
                                            } else {
                                                console.error(
                                                    'User ID is undefined'
                                                )
                                            }
                                            // if (user?.id) {
                                            //     addBlock(item.id, user.id, )
                                            // }
                                        }}
                                    >
                                        {selectedTemplate.map((template_id) => (
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
                                                />
                                            </div>
                                        ))}
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button type='submit'>
                                                    Save changes
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </form>
                                </SheetContent>
                            </Sheet>

                            <div>
                                {blocks.get(canvas.id)?.length === 0 ? (
                                    <p>No blocks</p>
                                ) : (
                                    blocks.get(canvas.id)?.map((block) => (
                                        <div key={block.id}>
                                            <p>{block.id}</p>
                                            <Button
                                                onClick={() => {
                                                    //console.log(block.id)
                                                    deleteBlock(
                                                        canvas.id,
                                                        block.id,
                                                        Number(block.column)
                                                    )
                                                    showBlock(canvas.id)
                                                }}
                                            >
                                                delete
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='border-solid border-2 border-black w-fit'>
                <h1>Available Templates</h1>
                <RadioGroup defaultValue='comfortable'>
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className='flex items-center space-x-2'
                        >
                            <RadioGroupItem
                                value={template.name}
                                id={template.id}
                                onClick={() => {
                                    setSelectedTemplate(
                                        Object.keys(template.content)
                                    )

                                    setSelectedTemplateId(template.id)
                                }}
                            />
                            <Label htmlFor={template.id}>{template.name}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div>
                {selectedTemplate.map((item) => (
                    <div key={item}>
                        <h1>{item}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserDataPage
