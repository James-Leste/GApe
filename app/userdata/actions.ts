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
    data: {}
) => {
    const { error } = await supabase.from('blocks').insert({
        canvas_id: canvas_id,
        template_id: templateId,
        content: data,
        column: 0,
        location: 0,
        user_id: user_id,
    })
}
