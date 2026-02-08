export function generatePrompt(userMessage, kbDocs, orderData) {
  // 1. Format Knowledge Base Context safely
  const contextSection = kbDocs.length > 0 
    ? kbDocs.join("\n\n") 
    : "No relevant documentation available.";

  // 2. Format Order Data safely
  const orderSection = orderData 
    ? JSON.stringify(orderData, null, 2) 
    : "No order data provided.";

  // 3. Return a single formatted string
  // We use Markdown headers (#) to help the model separate instructions from data
  return `
    # ROLE & INSTRUCTIONS
    You are a helpful customer support assistant for our store.
    1. Answer the customer's question using ONLY the content in the "CONTEXT" and "ORDER DATA" sections below.
    2. If the answer is not found in the context, politely say you don't know. Do not invent information.
    3. Keep your tone friendly and concise.

    # CONTEXT (Knowledge Base)
    ${contextSection}

    # ORDER DATA
    ${orderSection}

    # CUSTOMER MESSAGE
    ${userMessage}
    `;
}
