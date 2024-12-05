/** @format */

import { InfoBlock_L, InfoBlock_M } from '@/components/blocks/info-block'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { EduBlockData, InfoBlockData, ItemType } from '@/types/dbtypes'
import { User } from '@supabase/supabase-js'
import { ReactNode } from 'react'
import { Button } from 'react-day-picker'

export const info_block_data: InfoBlockData = {
    id: '1',
    url: 'https://www.linkedin.com/in/john-smith-123456/',
    name: 'John Dash',
    image: 'https://s3.is-ali.tech/3ce276f382ff8edb74a24d8a2c872fa8.png',
    x: '@IsJohn_Smith22',
    email: 'example@mail.com',
    phone: '+358 401234567',
    github: '@John_Smith22',
    linkedin: '@John_Smith22',
    description:
        "I'm a Software Developer and Aalto University graduate with expertise in building web and data-driven applications. I enjoy solving complex problems using technologies like Python, Java, and JavaScript. Let's connect and create something awesome together!",
    type: 'Default type',
    tags: ['Python', 'Java', 'JavaScript', 'Node.js'],
}

export const edu_block_data: EduBlockData = {
    id: '1',
    type: 'Education',
    institutionName: 'Aalto University',
    location: 'Espoo, Finland',
    degree: 'Master of Science',
    startDate: 'August 2015',
    endDate: 'May 2017',
    major: 'Computer Science',
    minor: 'Data Science',
    gpa: '3.9',
    description:
        'Completed a Master of Science in Computer Science with a focus on Data Science. Worked on various projects involving machine learning, data analysis, and software development.',
    tags: ['Machine Learning', 'Data Analysis', 'Software Development'],
    image: 'https://s3.is-ali.tech/3ce276f382ff8edb74a24d8a2c872fa8.png',
    url: 'https://www.aalto.fi/en',
}

export const initial: ItemType[] = [
    {
        id: '1',
        component: (
            <InfoBlock_L
                onBlockClick={() => {}}
                block_data={info_block_data}
            ></InfoBlock_L>
        ),
    },
    {
        id: '2',
        component: (
            <InfoBlock_M
                onBlockClick={() => {}}
                block_data={info_block_data}
            ></InfoBlock_M>
        ),
    },
]

export default function customSheet({
    selectedTemplate,
    user,
    component,
}: {
    selectedTemplate: string[]
    user: User
    component: ReactNode
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>{component}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Set values</SheetTitle>
                    <SheetDescription>Customize your block</SheetDescription>
                </SheetHeader>
                <form
                    className='grid gap-4 py-4'
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        const formObject = Object.fromEntries(
                            formData.entries()
                        )

                        console.log(JSON.stringify(formObject, null, 2))
                        if (user?.id) {
                            // await addBlock(
                            //     canvas.id,
                            //     user.id,
                            //     selectedTemplateId,
                            //     formObject,
                            //     Number(formObject.column),
                            //     'Info'
                            // )
                        } else {
                            console.error('User ID is undefined')
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
                            <Button type='submit'>Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

// export const selections: ReactNode[] = [
//     <InfoBlock_L
//         onBlockClick={() =>
//             addItem({
//                 id: (Math.random() + 1).toString(36).substring(7),
//                 component: (
//                     <InfoBlock_L
//                         onBlockClick={() => {}}
//                         block_data={info_block_data}
//                     ></InfoBlock_L>
//                 ),
//             })
//         }
//         block_data={info_block_data}
//     ></InfoBlock_L>,
//     <InfoBlock_M
//         onBlockClick={() =>
//             addItem({
//                 id: (Math.random() + 1).toString(36).substring(7),
//                 component: (
//                     <InfoBlock_M
//                         onBlockClick={() => {}}
//                         block_data={info_block_data}
//                     ></InfoBlock_M>
//                 ),
//             })
//         }
//         block_data={info_block_data}
//     ></InfoBlock_M>,
//     <InfoBlock_L
//         onBlockClick={() =>
//             addItem({
//                 id: (Math.random() + 1).toString(36).substring(7),
//                 component: (
//                     <InfoBlock_L
//                         onBlockClick={() => {}}
//                         block_data={info_block_data}
//                     ></InfoBlock_L>
//                 ),
//             })
//         }
//         block_data={info_block_data}
//     ></InfoBlock_L>,
//     <InfoBlock_L
//         onBlockClick={() =>
//             addItem({
//                 id: (Math.random() + 1).toString(36).substring(7),
//                 component: (
//                     <InfoBlock_L
//                         onBlockClick={() => {}}
//                         block_data={info_block_data}
//                     ></InfoBlock_L>
//                 ),
//             })
//         }
//         block_data={info_block_data}
//     ></InfoBlock_L>,
//     <InfoBlock_L
//         onBlockClick={() =>
//             addItem({
//                 id: (Math.random() + 1).toString(36).substring(7),
//                 component: (
//                     <InfoBlock_L
//                         onBlockClick={() => {}}
//                         block_data={info_block_data}
//                     ></InfoBlock_L>
//                 ),
//             })
//         }
//         block_data={info_block_data}
//     ></InfoBlock_L>,
// ]
