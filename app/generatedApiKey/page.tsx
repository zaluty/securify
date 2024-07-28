'use client'

import React, { useState } from 'react'

interface DogBreed {
    id: number
    name: string
    temperament: string
    life_span: string
}

const DogBreedList: React.FC = () => {
    const [breeds, setBreeds] = useState<DogBreed[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchDogBreeds = async () => {
        setLoading(true)
        setError(null)

        try {
            const proxyRequest = {
                generatedKey: 'abc123generatedkey456', // Replace with the actual generated key
                endpoint: '/breeds',
                limit: 10,
                page: 0
            }

            const response = await fetch('https://securify-gamma.vercel.app/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(proxyRequest)
            })
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to fetch dog breeds')
            }

            const data: DogBreed[] = await response.json()
            setBreeds(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dog Breed List</h1>
            <button
                onClick={fetchDogBreeds}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Fetch Dog Breeds'}
            </button>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {breeds.length > 0 && (
                <ul className="list-disc pl-5">
                    {breeds.map((breed) => (
                        <li key={breed.id} className="mb-2">
                            <h2 className="font-semibold">{breed.name}</h2>
                            <p>Temperament: {breed.temperament}</p>
                            <p>Life Span: {breed.life_span}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DogBreedList