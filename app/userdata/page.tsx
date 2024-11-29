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
    getBlockColumn,
} from './actions'
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
    const [blockMap, setBlockMap] = useState<BlockMap>(new Map())
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
            (await getBlock(canvas_id, blockMap)) ?? new Map()
        setBlockMap(newBlockMap)
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
                <Button onClick={() => console.log(blockMap)}>
                    Show BlockMap
                </Button>
            </div>
            <div className='border-solid border-2 border-black w-fit'>
                <h1>Canvas</h1>
                {canvas?.map((item) => (
                    <div key={item.id} className='m-5'>
                        <div>
                            <Button
                                onClick={async () => {
                                    await showBlock(item.id)
                                    //console.log(blockMap.get(item.id))
                                    await getBlockColumn(item.id, 0)
                                }}
                            >
                                Canvas name: {item.name}
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
                                                    item.id,
                                                    user.id,
                                                    selectedTemplateId,
                                                    formObject,
                                                    Number(formObject.column)
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
                                        {selectedTemplate.map((item) => (
                                            <div
                                                className='grid grid-cols-6 items-center gap-1'
                                                key={item}
                                            >
                                                <Label
                                                    htmlFor={item}
                                                    className='overflow-hidden col-span-2'
                                                >
                                                    {item.toUpperCase()}
                                                </Label>
                                                <Input
                                                    id={item}
                                                    className='col-span-4'
                                                    type='text'
                                                    name={item}
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
                                {blockMap.get(item.id)?.length === 0 ? (
                                    <p>No blocks</p>
                                ) : (
                                    blockMap.get(item.id)?.map((block) => (
                                        <div key={block.id}>
                                            <p>{block.id}</p>
                                            <Button
                                                onClick={() => {
                                                    //console.log(block.id)
                                                    deleteBlock(block.id)
                                                    showBlock(item.id)
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
