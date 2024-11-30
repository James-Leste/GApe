/** @format */

import * as React from 'react'
import { ProfileCard } from "@/components/blocks/v2/profile/ProfileCard"
import { EduBlock_L,EduBlock_M } from '@/components/blocks/v2/profile/EducationCard'
import { WorkBlock_L,WorkBlock_M } from '@/components/blocks/v2/profile/ExperienceCard'
import { PublicationBlock_L, PublicationBlock_M } from '@/components/blocks/v2/profile/PublicationCard'
import { SkillsCard } from '@/components/blocks/v2/profile/SkillsCard'

export default function ProfilePage() {
    const profileData = {
        name: 'John Smith',
        title: 'Software Developer',
        description:
            "I'm a Software Developer and Aalto University graduate with expertise in building web and data-driven applications. I enjoy solving complex problems using technologies .",
        phone: '189-3849-343',
        email: 'example@mail.com',
        imageUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/a3827856688a042542ad9e567ae365a57fc1d089116f559125c4352d76b9bd19?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b',
        skills: ['Vue', 'React', 'TS/JS', 'Next'],
    }

    const educationData = {
        institution: 'Aalto university',
        location: 'Espoo,Finland',
        degree: 'Master Degree',
        field: 'Computer science',
        gpa: '3.85/4',
        minor: 'Human Computer Interection',
        dateRange: 'Sept 2024- July 2026',
        description:
            'Completed a Master of Science in Computer Science with a specialization in Human-Computer Interaction. Achieved a GPA of 3.85/4, reflecting strong academic performance and proficiency in designing user-centric computing systems.',
        logoUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/3ffda4f2e4bc6420b663a0bdac641d23b169162badce65081c66f522d603309c?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b',
    }

    const workData = {
        company: 'JadeFoci Technology',
        title: 'Engineer | User Interface Engineer',
        location: 'Hangzhou, China',
        dateRange: 'Dec 2022 ‑ Mar 2023',
        description:
            'Conducted competitive analysis of AI painting apps like Stable Diffusion WebUI and Midjourney. Designed UX/UI for uType.ai, a web app generating font graphics, and developed a NextJS-based demo with Tailwind, ShadCN, and REST API integration to connect front and back-end services',
        logoUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/8ab2db17a88c2ef83dedff0f1ff302bee1c700cdf9a79ff19ff87b303904237c?placeholderIfAbsent=true&apiKey=cf0d30cc7fd245a4886607b2fdd26b2b',
        type: 'internship',
    }

    const publicationData = {
        title: 'Differentiable spike: Rethinking gradient-descent for training spiking neural networks',
        authors: 'Li, Yuhang and Guo, Yufei and Zhang',
        year: '2021',
        type: 'Article',
        description:
            "Spiking Neural Networks (SNNs) have emerged as a biology-inspired method mimicking the spiking nature of brain neurons. This bio-mimicry derives SNNs' energy efficiency of inference on neuromorphic hardware. However, it also causes an intrinsic disadvantage in training high-performing SNNs from scratch ",
        journal: 'Advances in Neural Information Processing Systems',
    }

    const skillsData = {
        categories: [
            {
                name: 'Programming',
                skills: [
                    'JS/TS',
                    'React',
                    'Vue',
                    'NextJS',
                    'AntV',
                    'Python',
                    'C/C++',
                    'SQL',
                ],
            },
            {
                name: 'Interaction Design',
                skills: ['Prototype', 'Design System', 'Figma'],
            },
            {
                name: 'User research',
                skills: [
                    'Questionnaire',
                    'User Interviews',
                    'Usage Scenario',
                    'Usage Tasting',
                    'Focus Group',
                    'Empathy Mapping',
                    'User Journey Map',
                ],
            },
            {
                name: 'Language',
                skills: [
                    'English IELTS(6.5/B2)',
                    'Chinese Native',
                    'Uyghur Native',
                ],
            },
        ],
    }

    return (
        <div className='flex overflow-hidden flex-col px-16 py-32 bg-white max-md:px-5 max-md:py-24'>
            <div className='grid grid-cols-2 gap-5 max-md:grid-cols-1'>
                {/* <ProfileCard {...profileData} /> */}
                <WorkBlock_L {...workData} />
                <WorkBlock_M {...workData} />
                <EduBlock_L {...educationData} />
                <EduBlock_M {...educationData} />
                <PublicationBlock_L {...publicationData} />
                <PublicationBlock_M {...publicationData} />
                <SkillsCard {...skillsData} />
            </div>
        </div>
    )
}
