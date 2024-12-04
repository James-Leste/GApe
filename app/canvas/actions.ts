/** @format */

import { createClient } from '@/utils/supabase/client'

import { BlockMap, InfoBlockData, Template } from '@/types/dbtypes'

const supabase = createClient()

//done
export const getCanvasByUserId = async (userId: string) => {
    const { data: canvas } = await supabase
        .from('canvas')
        .select('*')
        .eq('userId', userId)
    return canvas
}

//done
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

//done
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
        await insertBlockLocation(canvas_id, data[0].id, 0)
    } else {
        console.error('No data returned from insert operation')
    }
}

//done
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
        console.log(current_list)
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

//done
//update the whole column
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

//done
//delete block and its location info
export const deleteBlock = async (
    canvas_id: string,
    block_id: string,
    column: number
) => {
    const response = await supabase
        .from('blocks')
        .delete()
        .eq('id', block_id)
        .select('canvas_id')

    // console.log(response.data)
    const { data, error } = await supabase
        .from('blockColumn')
        .select('blocks')
        .eq('canvas_id', canvas_id)
        .eq('column', column)
    if (error) {
        console.error('Error fetching blockColumn:', error)
    }
    if (data && data.length > 0) {
        const current_list: string[] = data[0].blocks
        console.log(current_list)
        const updated_list = current_list.filter((id) => id !== block_id)
        console.log(updated_list)
        updateBlockColumn(canvas_id, column, updated_list)
    }
}

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

//done
export const getTemplates = async () => {
    const { data, error } = await supabase.from('templates').select('*')
    if (error || !data) {
        console.error('Error fetching templates:', error)
        return
    }
    const templateList: Template[] = data
    return data
}

export const addCanvas = async (user_id: string, name: string) => {
    const { data, error } = await supabase
        .from('canvas')
        .insert([{ userId: user_id, name: name }])
        .select()
    if (error) {
        console.error(error)
        //toast.error('Error creating canvas')
        return
    }
    await addDefaultColumns(data[0].id)
    return data
}

export const addDefaultColumns = async (canvas_id: string) => {
    const { data, error } = await supabase
        .from('blockColumn')
        .insert([
            { column: 0, blocks: [], canvas_id: canvas_id },
            { column: 1, blocks: [], canvas_id: canvas_id },
        ])
        .select()
    if (error) {
        console.error(error)
        //toast.error('Error creating canvas')
        return
    }
    console.log('added two columns for canvas: ' + canvas_id)
    return data
}
