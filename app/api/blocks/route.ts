/** @format */

import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { EduBlockData, InfoBlockData } from '@/components/blocks/blockType'
type blockType = EduBlockData | InfoBlockData

const dataFilePath = path.join(process.cwd(), 'data', 'blocks.json')

interface BlocksData {
    blocks: blockType[]
}

async function readBlocksData(): Promise<BlocksData> {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        return JSON.parse(fileContents) as BlocksData
    } catch (error) {
        console.error('Error reading blocks data:', error)
        return { blocks: [] }
    }
}

async function writeBlocksData(data: BlocksData): Promise<void> {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('Error writing blocks data:', error)
        throw new Error('Failed to write blocks data')
    }
}

export async function GET() {
    try {
        const data = await readBlocksData()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error in GET:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const things = await request.json()
        const { block, componentName } = things
        if (!block) {
            throw new Error('Block data is missing')
        }
        block.id = Date.now().toString(36)
        block.type = componentName
        const data = await readBlocksData()
        data.blocks.push(block)
        await writeBlocksData(data)
        return NextResponse.json({
            message: 'Block added successfully',
            block: block,
        })
    } catch (error) {
        console.error('Error in POST:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const body: blockType = await request.json()
        const data = await readBlocksData()
        const index = data.blocks.findIndex((block) => block.id === body.id)
        if (index !== -1) {
            data.blocks[index] = body
            await writeBlocksData(data)
            return NextResponse.json({
                message: 'Block updated successfully',
                block: body,
            })
        }
        return NextResponse.json({ error: 'Block not found' }, { status: 404 })
    } catch (error) {
        console.error('Error in PUT:', error)
        return NextResponse.json(
            { error: 'Failed to update block' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json(
                { error: 'Block ID is required' },
                { status: 400 }
            )
        }
        const data = await readBlocksData()
        const index = data.blocks.findIndex((block) => block.id === id)
        if (index !== -1) {
            const deletedBlock = data.blocks.splice(index, 1)[0]
            await writeBlocksData(data)
            return NextResponse.json({
                message: 'Block deleted successfully',
                block: deletedBlock,
            })
        }
        return NextResponse.json({ error: 'Block not found' }, { status: 404 })
    } catch (error) {
        console.error('Error in DELETE:', error)
        return NextResponse.json(
            { error: 'Failed to delete block' },
            { status: 500 }
        )
    }
}
