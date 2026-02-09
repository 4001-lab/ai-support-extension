document.getElementById("generate").addEventListener("click", async () => {
  const message = document.getElementById("message").value;
  const orderId = document.getElementById("orderId").value;
  const BACKEND_URL = "https://ai-support-extension.vercel.app/api/generateReply"; // Change to your backend URL if different
  
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, orderId })
  });

  const data = await res.json();
  document.getElementById("output").textContent = data.reply;
});
