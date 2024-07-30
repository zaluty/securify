'use client'

import { useState } from 'react'
import { secure } from '@/secureEnv'

export default function Home() {
  const [originalKey, setOriginalKey] = useState('')
  const [apiProvider, setApiProvider] = useState('')
  const [apiKeyName, setApiKeyName] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/generateKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalKey, apiProvider, baseUrl, apiKeyName }),
    })
    const data = await response.json()
    setGeneratedKey(data.generatedKey)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg   shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">SecureKey Vault</h1>
        <p className="text-center text-gray-600 mb-8">Secure your API keys with our advanced hashing technology</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="password"
            value={originalKey}
            onChange={(e) => setOriginalKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={apiKeyName}
            onChange={(e) => setApiKeyName(e.target.value)}
            placeholder="API key name (e.g., 'Production API Key')"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={apiProvider}
            onChange={(e) => setApiProvider(e.target.value)}
            placeholder="API provider (e.g., 'AWS', 'Google Cloud')"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="API base URL (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Secure My API Key
          </button>
        </form>

        {generatedKey && (
          <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Your Secured API Key:</h2>
            <p className="text-green-700 break-all">{generatedKey}</p>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-white">
        <p>&copy; 2023 SecureKey Vault. All rights reserved.</p>
      </footer>
    </div>
  )
}