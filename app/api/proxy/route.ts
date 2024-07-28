import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

import cors from 'cors'
const prisma = new PrismaClient()
// Helper function to run middleware
function runMiddleware(req: Request, res: NextResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

// Configure CORS
const corsMiddleware = cors({
    origin: ['http://localhost:3000', 'https://your-production-frontend-url.com'],
    methods: ['GET', 'POST', 'OPTIONS'],
})

export async function OPTIONS(req: Request) {
    const res = new NextResponse()
    await runMiddleware(req, res, corsMiddleware)
    return res
}

export async function POST(req: Request) {
    const res = new NextResponse()
    await runMiddleware(req, res, corsMiddleware)

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