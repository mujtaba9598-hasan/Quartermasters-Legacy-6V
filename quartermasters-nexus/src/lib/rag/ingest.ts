import fs from 'fs'
import path from 'path'
import { supabase } from '@/lib/supabase'

/**
 * Pure function to split text into overlapping chunks
 * Approximates tokens using words.
 */
export function chunkText(text: string, chunkSize: number = 500, overlap: number = 50): string[] {
    if (!text) return []

    const words = text.split(/\s+/)
    const chunks: string[] = []

    if (words.length === 0) return chunks

    for (let i = 0; i < words.length; i += Math.max(1, chunkSize - overlap)) {
        const chunk = words.slice(i, i + chunkSize).join(' ')
        if (chunk.trim()) {
            chunks.push(chunk)
        }
    }

    return chunks
}

/**
 * Reads all .md files from knowledge-base, chunks them, and stores in Supabase.
 */
export async function ingestDocuments() {
    const kbPath = path.join(process.cwd(), 'src', 'content', 'knowledge-base')

    if (!fs.existsSync(kbPath)) {
        console.warn(`Knowledge base directory not found at ${kbPath}`)
        return
    }

    const files = fs.readdirSync(kbPath).filter(file => file.endsWith('.md'))

    for (const file of files) {
        const filePath = path.join(kbPath, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const title = file.replace(/\.md$/, '').replace(/-/g, ' ')

        // Determine service based on filename if possible
        let service: string | null = null
        if (file.includes('banking')) service = 'financial-advisory'
        else if (file.includes('human')) service = 'human-capital'
        else if (file.includes('management-consultancy')) service = 'management'
        else if (file.includes('tech')) service = 'tech-rnd'
        else if (file.includes('event') || file.includes('organization')) service = 'event-logistics'

        // 1. Insert Document
        const { data: doc, error: docError } = await supabase
            .from('documents')
            .insert({
                title,
                content,
                service,
                doc_type: 'knowledge'
            })
            .select('id')
            .single()

        if (docError || !doc) {
            console.error(`Failed to insert document ${title}:`, docError)
            continue
        }

        const documentId = doc.id

        // 2. Chunk Text
        const chunks = chunkText(content, 500, 50)

        // 3. Generate Embeddings (Dummy for now) & Store
        for (let i = 0; i < chunks.length; i++) {
            const chunkTextContent = chunks[i]
            if (!chunkTextContent) continue

            // Dummy 1024-dimension zero array
            const dummyEmbedding = new Array(1024).fill(0)

            const { error: chunkError } = await supabase
                .from('document_embeddings')
                .insert({
                    document_id: documentId,
                    chunk_index: i,
                    chunk_text: chunkTextContent,
                    embedding: dummyEmbedding
                })

            if (chunkError) {
                console.error(`Failed to insert chunk ${i} for doc ${documentId}:`, chunkError)
            }
        }

        console.log(`Ingested ${title} successfully with ${chunks.length} chunks.`)
    }
}
