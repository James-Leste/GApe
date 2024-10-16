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
import DraggableList from './draggableList'

interface Block {
    id: number
    title: string
    content: string
}

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
                                <DraggableList></DraggableList>
                            </div>
                            <DrawerFooter>
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
