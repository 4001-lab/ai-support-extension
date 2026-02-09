import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

/* ---------- EMBEDDINGS ---------- */
export async function createEmbedding(text) {
  const response = await client.models.embedContent({
    model: "gemini-embedding-001", // Updated to latest stable embedding model
    contents: text,
    config: {
      outputDimensionality: 1536
    } // Specify dimensionality if needed, default is 3072
  });

  // The new SDK returns an array of embeddings
  return response.embeddings[0].values; 
}

/* ---------- TEXT GENERATION ---------- */
export async function generateText(prompt) {
  const response = await client.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }]
  });

  // Use the new simplified helper
  return response.text; 
}