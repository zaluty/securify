import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { originalKey, apiProvider, baseUrl, apiKeyName } = await req.json()

    const generatedKey = generateApiKey()

    const newApiKey = await prisma.userInput.create({
      data: {
        originalKey,
        apiKeyName,
        generatedKey,
        apiProvider,
        baseUrl,
      },
    })

    console.log(newApiKey)

    return NextResponse.json({ generatedKey })
  } catch (error) {
    console.error('Error creating API key:', error)
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

function generateApiKey(): string {
  return `sk_${crypto.randomBytes(24).toString('base64').replace(/[+/=]/g, '')}`;
}