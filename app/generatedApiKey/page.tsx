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
            const generatedKey = '$2b$10$E.HuWp/Tn.0Iyp0ulb.steh1atlguXS1PI0koWAUkP9YThp9c.4lW'
            const endpoint = 'https://dog.ceo/api/breeds/list/all'
            const limit = 10
            const page = 0

            const url = new URL('https://securify-gamma.vercel.app/api/proxy')
            url.searchParams.append('generatedKey', generatedKey)
            url.searchParams.append('endpoint', endpoint)
            url.searchParams.append('limit', limit.toString())
            url.searchParams.append('page', page.toString())

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
            }


            const data = await response.json()
            console.log('Received data:', JSON.stringify(data))

            if (Array.isArray(data)) {
                setBreeds(data.slice(0, 10).map(breed => ({
                    id: breed.id,
                    name: breed.name,
                    temperament: breed.temperament || 'Not available',
                    life_span: breed.life_span
                })))
            } else {
                console.error('Unexpected data format:', JSON.stringify(data))
                setError('Received unexpected data format')
            }
        } catch (err) {
            console.error('Error fetching dog breeds:', err)
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