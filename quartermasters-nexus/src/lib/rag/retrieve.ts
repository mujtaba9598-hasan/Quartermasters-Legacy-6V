import { supabase } from '@/lib/supabase'
import { generateEmbedding } from '@/lib/rag/embeddings'

export type RetrievedChunk = {
    chunkText: string
    documentTitle: string
    service: string | null
    similarity: number
}

/**
 * Retrieves the most relevant document chunks for a given query using cosine similarity.
 *
 * @param query The search query string
 * @param options Optional parameters (limit, service)
 * @returns Array of most relevant document chunks
 */
export async function retrieveContext(
    query: string,
    options?: { limit?: number; service?: string }
): Promise<RetrievedChunk[]> {
    const limit = options?.limit ?? 5

    // 1. Generate an embedding for the search query
    const queryEmbedding = await generateEmbedding(query)

    // Convert number[] to string for the Postgres vector function
    // The pgvector extension expects the format [0.1, 0.2, ...]
    const embeddingString = `[${queryEmbedding.join(',')}]`

    // 2. Perform vector similarity search via Supabase RPC
    const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: embeddingString,
        match_count: limit,
        filter_service: options?.service ?? null
    })

    if (error) {
        console.error('Error retrieving context:', error)
        throw new Error(`Failed to retrieve context: ${error.message}`)
    }

    // 3. Map the raw SQL result to the RetrievedChunk type
    if (!data || data.length === 0) {
        return []
    }

    return data.map((item: { chunk_text: string, document_title: string, document_service: string | null, similarity: number }) => ({
        chunkText: item.chunk_text,
        documentTitle: item.document_title,
        service: item.document_service,
        similarity: item.similarity
    }))
}
