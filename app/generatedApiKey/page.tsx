'use client'
//@ts-ignore
import { useState, useEffect } from "react"
import { toast } from "sonner"
type apiKey = {
    createdAt: string,
    generatedKey: string,
    id: string
    apiKey: string
}

export default function GeneratedApiKey() {
    const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({})
    const [apiKeys, setApiKeys] = useState<apiKey>([])
    const [error, setError] = useState(false)


    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard')

        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }


    useEffect(() => {
        fetchApiKeys()
    }, [])

    const fetchApiKeys = async () => {
        try {
            const response = await fetch('/api/getApiKeys') // You'll need to create this API route
            const data = await response.json()
            setApiKeys(data)


        } catch (err) {
            toast.error('err niggaeqdqmsdfùfyqs')
        }
    }

    const toggleKeyVisibility = (id: string) => {
        setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const maskKey = (key: string) => '•'.repeat(key.length)

    return (
        <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono">
            <h1 className="text-2xl mb-4">Generated API Keys</h1>
            <ul className="space-y-2">
                {apiKeys.map((apiKey) => (
                    //@ts-ignore
                    <li key={apiKey.id} className="border rounded-md border-green-500 p-2">
                        <div>ID: {apiKey.id}</div>
                        <div>Created At: {apiKey.createdAt.toLocaleString()}</div>
                        <div>
                            Key: {visibleKeys[apiKey.id.toString()] ? apiKey.generatedKey : maskKey(apiKey.generatedKey)}
                            <button onClick={() => toggleKeyVisibility(apiKey.id.toString())} className="ml-2 text-xs bg-green-700 px-2 py-1   rounded">
                                {visibleKeys[apiKey.id.toString()] ? 'Hide' : 'Show'}
                            </button>
                            <button onClick={() => copyToClipboard(apiKey.generatedKey)} className="ml-2 text-xs bg-green-700 px-2 py-1 cursor-copy rounded">
                                copy
                            </button>
                        </div>

                        <div>Base URL: {apiKey.baseUrl}</div>

                        <div>
                            {/* @ts-ignore */}
                            Original Key: {visibleKeys[apiKey.id.toString()] ? apiKey.originalKey : maskKey(apiKey.originalKey)}

                        </div>
                    </li>
                ))}


            </ul>
        </div>
    )
}