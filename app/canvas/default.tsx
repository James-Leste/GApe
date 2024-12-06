/** @format */
import { ProfileCard } from '@/components/blocks/v2/profile/ProfileCard'
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
import { EducationCardProps, ItemType, ProfileCardProps } from '@/types/dbtypes'
import { User } from '@supabase/supabase-js'
import { ReactNode } from 'react'
import { Button } from 'react-day-picker'

export const info_block_data: ProfileCardProps = {
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
    title: 'Software Developer',
    imageUrl: 'https://s3.is-ali.tech/3ce276f382ff8edb74a24d8a2c872fa8.png',
    tags: ['Python', 'Java', 'JavaScript', 'Node.js'],
}

export const educationData: EducationCardProps = {
    institution: 'University of Example',
    location: 'Example City, EX',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    gpa: '3.8',
    minor: 'Mathematics',
    dateRange: 'August 2015 - May 2019',
    description:
        'Studied various aspects of computer science including algorithms, data structures, and software engineering. Participated in multiple projects and internships.',
    logoUrl: 'no',
}

export const initial: ItemType[] = [
    {
        id: '1',
        component: (
            <ProfileCard
                onClick={() => {}}
                blockData={info_block_data}
            ></ProfileCard>
        ),
    },
    {
        id: '2',
        component: (
            <ProfileCard
                onClick={() => {}}
                blockData={info_block_data}
            ></ProfileCard>
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
