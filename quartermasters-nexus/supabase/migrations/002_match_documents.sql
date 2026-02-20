-- Create the match_documents function for vector similarity search
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1024),
  match_count int DEFAULT 5,
  filter_service text DEFAULT null
) RETURNS TABLE (
  id uuid,
  document_id uuid,
  chunk_index int,
  chunk_text text,
  similarity float,
  document_title text,
  document_service text
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    de.id,
    de.document_id,
    de.chunk_index,
    de.chunk_text,
    1 - (de.embedding <=> query_embedding) AS similarity,
    d.title AS document_title,
    d.service AS document_service
  FROM document_embeddings de
  JOIN documents d ON de.document_id = d.id
  WHERE (filter_service IS NULL OR d.service = filter_service)
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
