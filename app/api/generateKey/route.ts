import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function POST(req: Request) {
  const { originalKey, apiProvider, baseUrl } = await req.json()

  const generatedKey = await bcrypt.hash(originalKey + Date.now(), 10)

  await prisma.apiKey.create({
    data: {
      originalKey,
      generatedKey,
      apiProvider,
      baseUrl,
    },
  })

  return NextResponse.json({ generatedKey })
}