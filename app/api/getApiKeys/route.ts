import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    const apiKeys = await prisma.userInput.findMany()
    return NextResponse.json(apiKeys)
}