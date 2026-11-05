const STORAGE_KEY = "kodie-chat-messages";
const REPLY_DELAY = 1500;

const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const messageList = document.querySelector("#message-list");
const messagesRegion = document.querySelector("#messages");
const welcome = document.querySelector("#welcome");
const clearButton = document.querySelector("#clear-chat");
const notice = document.querySelector("#notice");

let messages = loadMessages();
let pendingReplies = 0;
const replyTimers = new Set();
const typingIndicator = document.createElement("div");
typingIndicator.className = "typing";
typingIndicator.setAttribute("role", "status");
typingIndicator.setAttribute("aria-label", "Kodie está digitando");
typingIndicator.hidden = true;
typingIndicator.innerHTML = "<span></span><span></span><span></span>";

function isMessage(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    (value.sender === "user" || value.sender === "bot") &&
    typeof value.text === "string" &&
    typeof value.timestamp === "string"
  );
}

function loadMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isMessage)) {
      throw new Error("O histórico salvo possui um formato inválido.");
    }

    return parsed;
  } catch (error) {
    console.error("Não foi possível carregar o histórico da conversa.", error);
    notice.textContent = "Não foi possível carregar o histórico salvo.";
    return [];
  }
}

function saveMessages() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    notice.textContent = "";
  } catch (error) {
    console.error("Não foi possível salvar o histórico da conversa.", error);
    notice.textContent = "Não foi possível salvar o histórico neste navegador.";
  }
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function getTimestamp() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function scrollToBottom() {
  messagesRegion.scrollTop = messagesRegion.scrollHeight;
}

function renderMessage(message) {
  const article = document.createElement("article");
  article.className = `message message--${message.sender}`;

  const bubble = document.createElement("div");
  bubble.className = "message__bubble";
  bubble.textContent = message.text;

  const timestamp = document.createElement("time");
  timestamp.className = "message__time";
  timestamp.textContent = message.timestamp;
  timestamp.setAttribute("aria-label", `Enviada às ${message.timestamp}`);

  article.append(bubble, timestamp);
  messageList.append(article);
}

function renderConversation() {
  messageList.replaceChildren();
  messages.forEach(renderMessage);
  welcome.hidden = messages.length > 0;
  messageList.append(typingIndicator);
  typingIndicator.hidden = pendingReplies === 0;
  scrollToBottom();
}

function addMessage(sender, text) {
  const message = {
    id: createId(),
    sender,
    text,
    timestamp: getTimestamp(),
  };
  messages.push(message);
  renderMessage(message);
  messageList.append(typingIndicator);
  welcome.hidden = true;
  saveMessages();
  scrollToBottom();
}

function updateTypingIndicator() {
  typingIndicator.hidden = pendingReplies === 0;
  scrollToBottom();
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  messageInput.value = "";
  messageInput.style.height = "";
  messageInput.focus();

  pendingReplies += 1;
  updateTypingIndicator();

  const timer = window.setTimeout(() => {
    replyTimers.delete(timer);
    pendingReplies -= 1;
    addMessage("bot", `Recebi sua mensagem: "${text}"`);
    updateTypingIndicator();
  }, REPLY_DELAY);
  replyTimers.add(timer);
}

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
});

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

messageInput.addEventListener("input", () => {
  messageInput.style.height = "";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 120)}px`;
});

clearButton.addEventListener("click", () => {
  replyTimers.forEach((timer) => window.clearTimeout(timer));
  replyTimers.clear();
  pendingReplies = 0;
  messages = [];
  messageList.replaceChildren();
  typingIndicator.hidden = true;
  welcome.hidden = false;
  messageInput.value = "";
  messageInput.style.height = "";

  try {
    localStorage.removeItem(STORAGE_KEY);
    notice.textContent = "";
  } catch (error) {
    console.error("Não foi possível limpar o histórico salvo.", error);
    notice.textContent = "Não foi possível limpar o histórico salvo neste navegador.";
  }

  messageInput.focus();
});

renderConversation();
