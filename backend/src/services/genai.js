import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({
  path: ".././.env"
});

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

/* ---------- EMBEDDINGS ---------- */
export async function createEmbedding(text) {
  const response = await client.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    config: {
      outputDimensionality: 1536
    }
  });

  return response.embeddings[0].values; 
}

/* ---------- TEXT GENERATION STREAM (GROQ) ---------- */
export async function* generateTextStream(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      stream: true
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim().startsWith('data:'));

    for (const line of lines) {
      const data = line.replace('data: ', '').trim();
      if (data === '[DONE]') continue;
      
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices[0]?.delta?.content;
        if (content) yield content;
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }
}

// /* ---------- TEXT GENERATION STREAM (GEMINI) ---------- */
// export async function* generateTextStream(prompt) {
//   const response = await client.models.generateContentStream({
//     model: "gemini-3-flash-preview",
//     contents: prompt
//   });
//
//   for await (const chunk of response) {
//     yield chunk.text;
//   }
// }