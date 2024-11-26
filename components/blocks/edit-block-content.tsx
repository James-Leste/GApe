'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EduBlockData, InfoBlockData } from '@/components/blocks/blockType'
type blockType = EduBlockData | InfoBlockData


export default function EditBlockContent({ initialData, onSave }: { initialData?: blockType, onSave: (data: blockType) => void }) {
    const [formData, setFormData] = useState<blockType>({} as blockType)

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        console.log('submitting', formData)
        e.preventDefault()
        onSave(formData)
    }

    const renderFields = () => {
        return Object.keys(formData)
            .filter((key) => key !== 'id' && key !== 'type')
            .map((key) => {
                const value = (formData as EduBlockData & InfoBlockData)[key as keyof (EduBlockData & InfoBlockData)]
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    return Object.keys(value).map((subKey) => (
                        <div key={subKey}>
                            <label>{subKey.charAt(0).toUpperCase() + subKey.slice(1)}</label>
                            <Input
                                name={subKey}
                                placeholder={subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                                value={(value as { [key: string]: string })[subKey]}
                                onChange={handleChange}
                            />
                        </div>
                    ))
                } else if (Array.isArray(value)) {
                    return (
                        <div key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <Input
                                name={key}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                value={value.join(', ')}
                                onChange={handleChange}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <Input
                                name={key}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                value={value}
                                onChange={handleChange}
                            />
                        </div>
                    )
                }
            })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {renderFields()}
            <Button className='w-full h-8' type="submit">Save Changes</Button>
        </form>
    )
}

