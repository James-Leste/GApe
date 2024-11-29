/** @format */

export interface InfoBlockData {
    type: string
    name: string
    description: string
    image: string
    url: string
    phone: string
    email: string
    github: string
    linkedin: string
    x: string
    tags: string[]
}

export interface EduBlockData {
    type: string
    institutionName: string
    location: string
    degree: string
    startDate: string
    endDate: string
    major: string
    minor?: string
    gpa?: string
    description: string
    tags: string[]
    image: string
    url: string
}
