
function toggleChat() {
  const body = document.getElementById("chat-body");
  body.style.display = body.style.display === "none" ? "block" : "none";
}
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.innerText = "👤 " + message;
  chatBox.appendChild(userMsg);
  input.value = "";

  const botMsg = document.createElement("div");
  botMsg.className = "bot";
  botMsg.innerText = "🤖 yanıtlanıyor...";
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({message})
  });
  const data = await res.json();
  botMsg.innerText = "🤖 " + data.reply;
  chatBox.scrollTop = chatBox.scrollHeight;
}
