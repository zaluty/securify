import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { generatedKey, endpoint, ...requestData } = await req.json()

    const apiKey = await prisma.apiKey.findUnique({
        where: { generatedKey },
    })

    if (!apiKey) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const originalApiResponse = await fetch(`${apiKey.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey.originalKey}`,
        },
        body: JSON.stringify(requestData),
    })

    const data = await originalApiResponse.json()

    return NextResponse.json(data)
}