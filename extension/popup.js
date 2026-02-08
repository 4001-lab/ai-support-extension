document.getElementById("generate").addEventListener("click", async () => {
  const message = document.getElementById("message").value;
  const orderId = document.getElementById("orderId").value;

  const res = await fetch("http://localhost:3000/generate-reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, orderId })
  });

  const data = await res.json();
  document.getElementById("output").textContent = data.reply;
});
