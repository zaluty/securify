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

export async function POST(request: NextRequest) {
    try {
        const { generatedKey, endpoint, ...requestData } = await request.json()
        console.log('Received request:', { generatedKey, endpoint, requestData })

        const apiKey = await prisma.apiKey.findUnique({
            where: { generatedKey },
        })

        if (!apiKey) {
            console.log('Invalid API key:', generatedKey)
            return NextResponse.json({ error: 'Invalid API key' }, { status: 401, headers: corsHeaders })
        }

        console.log('API key found:', apiKey)


        const originalApiResponse = await fetch(`${apiKey.baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.originalKey}`,
            },
            body: JSON.stringify(requestData),
        })

        const data = await originalApiResponse.json()

        return NextResponse.json(data, { headers: corsHeaders })
    } catch (error) {
        console.error('Error in proxy route:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders })
    }
}