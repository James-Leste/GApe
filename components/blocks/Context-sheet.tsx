/** @format */

'use client'

import { useContext, useState } from 'react'
import { BlockContext, BlockData } from '@/lib/blockContext'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function BlockSheet() {
    const { blockData, updateBlockData } = useContext(BlockContext)
    const [formData, setFormData] = useState<BlockData>(blockData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name.includes('.')) {
            const [parent, child] = name.split('.')
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...(typeof prev[parent] === 'object' &&
                    prev[parent] !== null
                        ? prev[parent]
                        : {}),
                    [child]: value,
                },
            }))
        } else if (name === 'tags') {
            setFormData((prev) => ({
                ...prev,
                [name]: value.split(',').map((tag) => tag.trim()),
            }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateBlockData(formData)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Edit Info Block</Button>
            </SheetTrigger>
            <SheetContent className='h-full bg-white overflow-y-scroll'>
                <SheetHeader>
                    <SheetTitle>Edit Info Block</SheetTitle>
                    <SheetDescription>
                        Make changes to your info block here. Click save when
                        you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className=''>
                    <form onSubmit={handleSubmit} className='space-y-4 '>
                        <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='description'>Description</Label>
                            <Input
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='tags'>Tags (comma-separated)</Label>
                            <Input
                                id='tags'
                                name='tags'
                                value={formData.tags.join(', ')}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='image'>Image URL</Label>
                            <Input
                                id='image'
                                name='image'
                                value={formData.image}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='url'>URL</Label>
                            <Input
                                id='url'
                                name='url'
                                value={formData.url}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='contact.Phone'>Phone</Label>
                            <Input
                                id='contact.Phone'
                                name='contact.Phone'
                                value={formData.contact.Phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='contact.Email'>Email</Label>
                            <Input
                                id='contact.Email'
                                name='contact.Email'
                                value={formData.contact.Email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='contact.github'>GitHub</Label>
                            <Input
                                id='contact.github'
                                name='contact.github'
                                value={formData.contact.github}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='contact.linkedin'>LinkedIn</Label>
                            <Input
                                id='contact.linkedin'
                                name='contact.linkedin'
                                value={formData.contact.linkedin}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='contact.x'>X (Twitter)</Label>
                            <Input
                                id='contact.x'
                                name='contact.x'
                                value={formData.contact.x}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button type='submit'>Save Changes</Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}
