/** @format */

import { ReactNode } from 'react'

export interface blockColumn {
    id: string
    canvas_id: string
    column: number
    blocks: string[]
    create_at: string
}

export interface ItemType {
    id: string
    component: ReactNode
}

export interface Template {
    id: string
    create_at: string
    name: string
    content: string
    description: string
    cover: string
}

//map for canvas_id:block[]
export type BlockMap = Map<string, Block[]>

export interface Canvas {
    id: string
    userId: string
    create_at: string
    name: string
}

export interface Block {
    id: string
    user_id: string
    create_at: string
    canvas_id: string
    template_id: string
    content:
        | ProfileCardProps
        | EducationCardProps
        | ExperienceCardProps
        | ProjectCardProps
        | PublicationCardProps
        | SkillsCardProps
    column: number
    template_name: string
    isBig: boolean
}

// export interface InfoBlockData {
//     type: string
//     name: string
//     description: string
//     image: string
//     url: string
//     phone: string
//     email: string
//     github: string
//     linkedin: string
//     x: string
//     tags: string[]
// }

// export interface EduBlockData {
//     type: string
//     institutionName: string
//     location: string
//     degree: string
//     startDate: string
//     endDate: string
//     major: string
//     minor?: string
//     gpa?: string
//     description: string
//     tags: string[]
//     image: string
//     url: string
// }

export interface ProfileCardProps {
    name: string
    title: string
    description: string
    phone: string
    email: string
    location?: string
    imageUrl: string
    tags: string[]
    github: string
    linkedin: string
    image: string
    x: string
    url: string
}

export interface EducationCardProps {
    institution: string
    location: string
    degree: string
    field: string
    gpa: string
    minor?: string
    dateRange: string
    description: string
    logoUrl: string
}

export interface ExperienceCardProps {
    company: string
    title: string
    location: string
    dateRange: string
    description: string
    logoUrl: string
    type?: string
}

export interface ProjectCardProps {
    project: string
    company: string
    role: string
    dateRange: string
    Heyperlink: string
    location: string
    description: string
    image: string
    type?: string
}

export interface PublicationCardProps {
    title: string
    authors: string
    year: string
    type: string
    description: string
    journal: string
}

export interface SkillsCardProps {
    categories: {
        name: string
        skills: string[]
    }[]
}
