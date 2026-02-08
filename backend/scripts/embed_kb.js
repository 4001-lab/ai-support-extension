import fs from "fs";
import kb from "../data/kb.json" with { type: "json" };
import { createEmbedding } from "../src/services/genai.js";

async function run() {
  const embedded = [];

  for (const doc of kb) {
    console.log(`Embedding: ${doc.id}`);

    const embedding = await createEmbedding(doc.text);
    embedded.push({
      id: doc.id,
      text: doc.text,
      embedding
    });
  }

  fs.writeFileSync(
    "../data/kb_embeddings.json",
    JSON.stringify(embedded, null, 2)
  );

  console.log("✅ KB embedded using @google/genai");
}

run();
