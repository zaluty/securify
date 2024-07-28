import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export default async function GeneratedApiKey() {
    const apiKey = await prisma.apiKey.findMany()
    return <div className="flex flex-col bg-white text-black items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Generated API Keys</h1>
        <div className="flex flex-col bg-white text-black items-center justify-center h-screen">
            {apiKey.map((key) => (
                <div key={key.id}>{key.generatedKey}</div>
            ))}
        </div>
    </div>
}