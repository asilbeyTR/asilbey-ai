async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const message = input.value.trim();
  if (!message) return;

  // Kullanıcı mesajını göster
  chatBox.innerHTML += '<div class="message user">' + message + "</div>";
  chatBox.innerHTML += '<div class="message bot">🤖 yanıtlanıyor...</div>';
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";

  // Yanıtı al
  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    const messages = document.querySelectorAll(".message.bot");
    messages[messages.length - 1].innerText = "🤖 " + data.reply;

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    const messages = document.querySelectorAll(".message.bot");
    messages[messages.length - 1].innerText = "🤖 Hata oluştu!";
  }
}