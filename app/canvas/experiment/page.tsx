/** @format */
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

interface Block {
    id: number
    title: string
    content: string
}

const blocks: Block[] = [
    {
        id: 1,
        title: 'first',
        content: 'random',
    },
    {
        id: 2,
        title: 'second',
        content: 'random',
    },
    {
        id: 3,
        title: 'third',
        content: 'random',
    },
    {
        id: 4,
        title: 'forth',
        content: 'random',
    },
    {
        id: 5,
        title: 'last',
        content: 'random',
    },
]

export default function ExperimentCanvas() {
    return (
        <div className='pt-16 h-[calc(100vh-1rem)] bg-slate-400 flex flex-col'>
            <div className='bg-slate-200 h-full'>hi</div>

            <div className='text-center'>
                <Drawer modal={false}>
                    <DrawerTrigger asChild>
                        <Button>Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent className='bg-white'>
                        <div className='bg-white mx-auto w-full  m-0'>
                            <DrawerHeader>
                                <DrawerTitle>Blocks</DrawerTitle>
                                <DrawerDescription>
                                    Drag a block to the Canvas
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className='p-4 pb-0 h-[120px]'>
                                <div className='grid grid-cols-10 gap-4'>
                                    {/* <div className='flex-1 text-center'>
                                        <div className='text-[0.70rem] uppercase text-muted-foreground'>
                                            Calories/day
                                        </div>
                                    </div> */}

                                    {/* <span className='sr-only'>Increase</span> */}
                                    <div className='bg-slate-100 w-1/3 h-[60px] '>
                                        1
                                    </div>
                                    <div className='bg-slate-100 w-1/3 h-[60px]'>
                                        2
                                    </div>
                                    <div className='bg-slate-100 w-1/3 h-[60px]'>
                                        3
                                    </div>
                                    <div className='bg-slate-100 w-1/3 h-[60px]'>
                                        4
                                    </div>
                                </div>
                            </div>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant='outline'>Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
}
