import { getRelevantDocs } from "../services/rag.js";
import { getOrderById } from "../services/orders.js";
import { generatePrompt } from "../utils/prompt.js";
import { generateText } from "../services/genai.js";

export default async function generateReply(req, res) {
  try {
    const { message, orderId } = req.body;

    const kbDocs = await getRelevantDocs(message);
    const orderData = orderId ? await getOrderById(orderId) : null;

    const prompt = generatePrompt(message, kbDocs, orderData);
    const reply = await generateText(prompt);

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate reply" });
  }
}
