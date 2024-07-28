'use client'

import { useState } from 'react'

export default function Home() {
  const [originalKey, setOriginalKey] = useState('')
  const [apiProvider, setApiProvider] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/generateKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalKey, apiProvider, baseUrl }),
    })
    const data = await response.json()
    setGeneratedKey(data.generatedKey)
  }

  return (
    <div>
      <h1>API Key Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalKey}
          onChange={(e) => setOriginalKey(e.target.value)}
          placeholder="Enter original API key"
        />
        <input
          type="text"
          value={apiProvider}
          onChange={(e) => setApiProvider(e.target.value)}
          placeholder="Enter API provider name"
        />
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="Enter API base URL"
        />
        <button type="submit">Generate New Key</button>
      </form>
      {generatedKey && (
        <div>
          <h2>Your Generated API Key:</h2>
          <p>{generatedKey}</p>
        </div>
      )}
    </div>
  )
}