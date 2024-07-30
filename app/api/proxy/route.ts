import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}
export async function OPTIONS(request: NextRequest) {
    return NextResponse.json({}, { headers: corsHeaders })
}
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const generatedKey = searchParams.get('generatedKey')
        const endpoint = searchParams.get('endpoint')
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')

        console.log('Received request:', { generatedKey, endpoint, limit, page })


        if (!generatedKey) {
            return NextResponse.json({ error: 'Missing API key' }, { status: 400, headers: corsHeaders })
        }

        const apiKey = await prisma.userInput.findUnique({
            where: { generatedKey },
        })

        if (!apiKey) {
            console.log('Invalid API key:', generatedKey)
            return NextResponse.json({ error: 'Invalid API key' }, { status: 401, headers: corsHeaders })
        }

        console.log('API key found:', apiKey)

        const originalApiResponse = await fetch(`${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.originalKey}`,
            },
        })

        const data = await originalApiResponse.json()

        return NextResponse.json(data, { headers: corsHeaders })
    } catch (error) {
        console.error('Error in proxy route:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders })
    }
}