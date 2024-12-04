/** @format */

import { createClient } from '@/utils/supabase/client'

import { BlockMap, InfoBlockData } from '@/types/dbtypes'

const supabase = createClient()

export const getCanvasByUserId = async (userId: string) => {
    const { data: canvas } = await supabase
        .from('canvas')
        .select('*')
        .eq('userId', userId)
    return canvas
}

export const getBlock = async (canvas_id: string, blockMap: BlockMap) => {
    const { data: infoBlock, error } = await supabase
        .from('blocks')
        .select('*')
        .eq('canvas_id', canvas_id)
    if (error) {
        console.error('Error fetching blocks:', error)
        return
    }
    const newBlockMap: BlockMap = new Map(blockMap)
    newBlockMap.set(canvas_id, infoBlock)
    //console.log(newBlockMap)
    return newBlockMap
}

export const addBlock = async (
    canvas_id: string,
    user_id: string,
    templateId: string,
    content: object,
    column: number
) => {
    const { data, error } = await supabase
        .from('blocks')
        .insert({
            canvas_id: canvas_id,
            template_id: templateId,
            content: content,
            column: 0,
            user_id: user_id,
        })
        .select()
    // return the added block's id
    if (data && data.length === 1) {
        //console.log('id: ' + data[0].id)
        //console.log('column: ' + data[0].column)
        await insertBlockLocation(canvas_id, data[0].id, 1)
    } else {
        console.error('No data returned from insert operation')
    }
}

export const insertBlockLocation = async (
    canvas_id: string,
    block_id: string,
    column: number
) => {
    const { data: data, error } = await supabase
        .from('blockColumn')
        .select('blocks')
        .eq('canvas_id', canvas_id)
        .eq('column', column)
    if (error) {
        console.error('Error fetching blockMap:', error)
        return
    }

    if (data && data.length > 0) {
        //await supabase.from('blockMap').update({})

        const current_list: string[] = data[0].blocks
        //console.log(current_list)
        current_list.push(block_id)
        await supabase
            .from('blockColumn')
            .update({
                blocks: current_list,
            })
            .eq('canvas_id', canvas_id)
            .eq('column', column)
    } else {
        const list: string[] = []
        list.push(block_id)
        //console.log('I am inserting' + block_id + 'into column' + column)
        await supabase.from('blockColumn').insert({
            column: column,
            blocks: list,
            canvas_id: canvas_id,
        })
    }
}

export const updateBlockColumn = async (
    canvas_id: string,
    column: number,
    list: string[]
) => {
    const { data, error } = await supabase
        .from('blockColumn')
        .update({
            blocks: list,
        })
        .eq('canvas_id', canvas_id)
        .eq('column', column)
    if (error) {
        console.error('Error updating blockColumn:', error)
    }
}

// export const updateBlockLocation = async (

// )

// export const getBlockColumn = async (canvas_id: string, column: number) => {
//     const { data: blockMap, error } = await supabase
//         .from('blocks')
//         .select('*')
//         .eq('canvas_id', canvas_id)
//         .eq('column', column)
//     if (error) {
//         console.error('Error fetching blocks:', error)
//         return
//     }
//     //console.log(blockMap)
// }

export const getBlockMap = async (canvas_id: string) => {
    const { data: columns, error } = await supabase
        .from('blockColumn')
        .select('*')
        .eq('canvas_id', canvas_id)
    if (error) {
        console.error('Error fetching blocks:', error)
        return
    }
    return columns
}

export const deleteBlock = async (blockId: string) => {
    const response = await supabase
        .from('blocks')
        .delete()
        .eq('id', blockId)
        .select('canvas_id')

    console.log(response.data)
    // const response2 = await supabase
    //     .from('blockColumn')
    //     .select('blocks')
    //     .eq('blocks', blockId)
}

//export const getBlockListBy

export const updateBlock = async (blockId: string, data: object) => {
    const { error } = await supabase
        .from('blocks')
        .update({
            content: data,
        })
        .eq('id', blockId)
    if (error) {
        console.error('Error updating block:', error)
    }
}
