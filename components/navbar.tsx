'use client'

import { useState } from 'react'
export type ApiAttributes = {
    OriginalApiKey: string
    ApiProvidername: string
    ApiBaseUrl: string
}
export default function Demo() {
    const [originalKey, setOriginalKey] = useState('')
    const [apiProvider, setApiProvider] = useState('')
    const [baseUrl, setBaseUrl] = useState('')
    const [error, setError] = useState('')
    const [generatedKey, setGeneratedKey] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/generateKey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ originalKey, apiProvider, baseUrl }),

            })
            const data = await response.json()
            console.log(data)
            setGeneratedKey(data.generatedKey)
        } catch (error) {
            console.error(error)

        }
    }

    return (
        <div>
            <h1>API Key Generator</h1>
            <form onSubmit={handleSubmit} className='inline-block  justify-center items-center gap-2'>
                <input
                    type="text"
                    value={originalKey}
                    onChange={(e) => setOriginalKey(e.target.value)}
                    placeholder="Enter original API key"
                    className='text-black p-2 rounded-md '
                />
                <input
                    type="text"
                    value={apiProvider}
                    onChange={(e) => setApiProvider(e.target.value)}
                    placeholder="Enter API provider name"
                    className='text-black p-2 rounded-md'
                />
                <input
                    type="text"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="Enter API base URL"
                    className='text-black p-2 rounded-md'
                />


                <button type="submit" className='p-4 bg-blue-400 rounded-lg m-3'>Generate New Key</button>
            </form>
            {generatedKey && (
                <div>
                    <h2>Your Generated API Key:</h2>
                    <p className='p-3 mt-4 bg-white text-black'>{generatedKey || 'dd'}</p>
                </div>
            )}
            {error && (
                <div className='text-red-500 m-4'>{error.valueOf.length}</div>
            )}
        </div>
    )
}