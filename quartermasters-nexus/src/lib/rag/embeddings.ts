interface CohereEmbedResponse {
    id: string
    texts: string[]
    embeddings: {
        float?: number[][]
    }
    meta?: Record<string, unknown>
}

// Helper to pause execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Calls the Cohere API via raw fetch to generate embeddings.
 * Includes a 1-retry mechanism with a 1-second delay.
 * 
 * @param texts Array of strings to embed
 * @param inputType 'search_document' for corpus items, 'search_query' for search queries
 */
async function callCohereApi(texts: string[], inputType: 'search_document' | 'search_query'): Promise<number[][]> {
    const apiKey = process.env.COHERE_API_KEY
    if (!apiKey) {
        throw new Error('Missing COHERE_API_KEY environment variable.')
    }

    const url = 'https://api.cohere.com/v2/embed'
    const body = {
        model: 'embed-english-v3.0',
        texts,
        input_type: inputType,
        embedding_types: ['float']
    }

    const performFetch = async (): Promise<Response> => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    let response: Response
    try {
        response = await performFetch()
        if (!response.ok) {
            throw new Error(`Cohere API error: ${response.status} ${response.statusText}`)
        }
    } catch (error) {
        // 1 Retry after 1 second
        console.warn(`Cohere API failed: ${(error as Error).message}. Retrying in 1s...`)
        await delay(1000)

        response = await performFetch()
        if (!response.ok) {
            const errorText = await response.text().catch(() => 'No response body')
            throw new Error(`Cohere API error after retry: ${response.status} ${response.statusText} - ${errorText}`)
        }
    }

    const data = (await response.json()) as CohereEmbedResponse

    if (!data.embeddings || !data.embeddings.float || data.embeddings.float.length !== texts.length) {
        throw new Error('Cohere API returned an invalid or incomplete embedding payload.')
    }

    return data.embeddings.float
}

/**
 * Embed a single text string (used for search queries).
 * Uses Cohere's input_type = search_query.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    const embeddings = await callCohereApi([text], 'search_query')
    return embeddings[0]
}

/**
 * Embed an array of text strings (used for documents/chunks).
 * Uses Cohere's input_type = search_document.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return []
    return callCohereApi(texts, 'search_document')
}
