'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface BlockContent {
    name: string;
    description: string;
    tags: string[];
    image: string;
    url: string;
    contact: {
        phone: string;
        email: string;
        github: string;
        linkedin: string;
        x: string;
    };
}

export default function EditBlockContent({ initialData, onSave }: { initialData?: BlockContent, onSave: (data: BlockContent) => void }) {
    const [formData, setFormData] = useState<BlockContent>({
        name: '',
        description: '',
        tags: [],
        image: '',
        url: '',
        contact: {
            phone: '',
            email: '',
            github: '',
            linkedin: '',
            x: '',
        },
    })

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name in formData.contact) {
            setFormData(prev => ({
                ...prev,
                contact: {
                    ...prev.contact,
                    [name]: value
                }
            }))
        } else if (name === 'tags') {
            setFormData(prev => ({
                ...prev,
                [name]: value.split(',').map(tag => tag.trim())
            }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
            <Input name="tags" placeholder="Tags (comma separated)" value={formData.tags.join(', ')} onChange={handleChange} />
            <Input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
            <Input name="url" placeholder="Website URL" value={formData.url} onChange={handleChange} />
            <Input name="phone" placeholder="Phone" value={formData.contact.phone} onChange={handleChange} />
            <Input name="email" placeholder="Email" value={formData.contact.email} onChange={handleChange} />
            <Input name="github" placeholder="GitHub" value={formData.contact.github} onChange={handleChange} />
            <Input name="linkedin" placeholder="LinkedIn" value={formData.contact.linkedin} onChange={handleChange} />
            <Input name="x" placeholder="X (Twitter)" value={formData.contact.x} onChange={handleChange} />
            <Button type="submit">Save Changes</Button>
        </form>
    )
}

