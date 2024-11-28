/** @format */

export interface InfoBlockData {
    id: string
    type: string
    name: string
    description: string
    tags: string[]
    image: string
    url: string
    contact: {
        phone: string
        email: string
        github: string
        linkedin: string
        x: string
    }
}

export interface EduBlockData {
    id: string
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
