/*
   CHATBOT.JS - Moteur logique
   Gère l'analyse du texte et l'affichage.
*/

document.addEventListener("DOMContentLoaded", () => {
  const chatHistory = document.getElementById("chat-history");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const suggestionsBox = document.getElementById("chat-suggestions");

  let chatStarted = false;

  // Suggestions au démarrage
  const suggestions = [
    "T'es qui ?",
    "Tes études ?",
    "Tu fais du sport ?",
    "Pourquoi la Cyber ?",
  ];

  function renderSuggestions() {
    if (!suggestionsBox) return;
    suggestionsBox.innerHTML = "";
    suggestions.forEach((text) => {
      const btn = document.createElement("button");
      btn.className = "suggestion-btn";
      btn.innerText = text;
      btn.onclick = () => sendMessage(text);
      suggestionsBox.appendChild(btn);
    });
  }

  function getBotResponse(input) {
    // Nettoyage : minuscule, sans accents
    const cleanInput = input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (typeof ericBrain !== "undefined") {
      for (let topic of ericBrain) {
        for (let trigger of topic.triggers) {
          // Recherche large (inclut le mot clé n'importe où)
          if (cleanInput.includes(trigger)) {
            return topic.answers[
              Math.floor(Math.random() * topic.answers.length)
            ];
          }
        }
      }
    }

    if (typeof ericFallbacks !== "undefined") {
      return ericFallbacks[Math.floor(Math.random() * ericFallbacks.length)];
    }
    return "Erreur système.";
  }

  function appendMessage(sender, text) {
    if (!chatHistory) return;
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-msg" : "bot-msg";

    if (sender === "bot") {
      div.innerHTML = `<span class='bot-name'>ERIC-BOT ></span>`;
      chatHistory.appendChild(div);

      // Effet écriture
      let i = 0;
      function type() {
        if (i < text.length) {
          div.innerHTML += text.charAt(i);
          i++;
          chatHistory.scrollTop = chatHistory.scrollHeight;
          setTimeout(type, 10);
        }
      }
      type();
    } else {
      div.innerText = text;
      chatHistory.appendChild(div);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    appendMessage("user", text);
    if (userInput) userInput.value = "";
    if (suggestionsBox) suggestionsBox.style.display = "none";

    setTimeout(() => {
      const response = getBotResponse(text);
      appendMessage("bot", response);
    }, 500);
  }

  if (sendBtn)
    sendBtn.addEventListener("click", () => sendMessage(userInput.value));
  if (userInput)
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage(userInput.value);
    });

  // Fonction globale pour démarrer depuis app.js
  window.initChatbot = function () {
    if (!chatStarted) {
      chatStarted = true;
      renderSuggestions();
      appendMessage(
        "bot",
        "Terminal connecté. Je suis l'IA d'Eric. Pose-moi une question !"
      );
    }
  };
});
