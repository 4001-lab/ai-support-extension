import { getRelevantDocs } from "../src/services/rag.js";
import { getOrderById } from "../src/services/orders.js";
import { generatePrompt } from "../src/utils/prompt.js";
import { generateText } from "../src/services/genai.js";

export default async function handler(req, res) {
    // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, orderId } = req.body;

    const kbDocs = await getRelevantDocs(message);
    const orderData = orderId ? await getOrderById(orderId) : null;

    const prompt = generatePrompt(message, kbDocs, orderData);
    const reply = await generateText(prompt);

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate reply" });
  }
}
