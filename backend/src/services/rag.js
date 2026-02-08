import embeddings from "../../data/kb_embeddings.json" with { type: "json" };
import { createEmbedding } from "./genai.js";

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function getRelevantDocs(
  query,
  topK = 3,
  minScore = 0.25   // ⭐ similarity threshold
) {
  const queryEmbedding = await createEmbedding(query);

  return embeddings
    .map(doc => ({
      text: doc.text,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    }))
    .filter(d => d.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(d => d.text);
}
