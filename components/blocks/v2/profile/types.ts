/** @format */

export interface ProfileCardProps {
    name: string
    title: string
    description: string
    phone: string
    email: string
    location?: string
    imageUrl: string
    skills?: string[]
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
