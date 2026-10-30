// FEMILAROJAH1 chatbot deployment
const BUSINESS_INFO = `
You are the official AI customer assistant for FEMILAROJAH1.

BUSINESS: FEMILAROJAH1
BUSINESS TYPE: Logistics and Digital Services
WHATSAPP: 0907 803 4877

LOGISTICS AND ERRAND SERVICES:
- Errand Assistance
- Find It For Me
- Shopping and Sourcing
- Pickup and Delivery Assistance
- Ordering Assistance
- Custom Requests

DIGITAL AND CREATIVE SERVICES:
- Website Design
- Logo Design
- Branding
- Flyer and Advert Design
- Digital Catalogue Design
- WhatsApp Business Setup
- Google Business Profile Setup

PACKAGES:
- Starter Package: ₦35,000
- Professional Package: ₦75,000
- Website Design: Starting from ₦150,000

INSTRUCTIONS:
1. Be friendly, professional, helpful, and concise.
2. Explain the business services clearly.
3. Ask questions when a customer's request is unclear.
4. Do not invent prices or promise services you cannot confirm.
5. Direct customers to WhatsApp 0907 803 4877 for enquiries and orders.
6. If asked something unrelated to the business, politely explain your role.
7. Never claim an order has been placed or paid for unless confirmed.
`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://ayomideadejumola8-service.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Vary": "Origin"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS_HEADERS
    }
  });
}

function html() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FEMILAROJAH1 AI Assistant</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#101010;color:#fff;min-height:100vh;display:flex;justify-content:center;align-items:center;padding:16px}
.app{width:100%;max-width:600px;background:#1b1b1b;border:1px solid #b99748;border-radius:18px;overflow:hidden;box-shadow:0 10px 40px #0008}
header{background:#111;padding:22px;text-align:center;border-bottom:1px solid #b99748}
h1{color:#e4c16c;font-size:23px;margin:0 0 8px}
header p{margin:0;color:#ddd;font-size:14px}
#chat{height:55vh;min-height:300px;max-height:520px;overflow-y:auto;padding:18px}
.msg{padding:12px 14px;border-radius:12px;margin-bottom:12px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.5;font-size:15px}
.bot{background:#2a2a2a;border:1px solid #444}
.user{background:#66501f;margin-left:25px}
form{display:flex;gap:8px;padding:14px;border-top:1px solid #444}
input{min-width:0;flex:1;background:#292929;color:#fff;border:1px solid #555;border-radius:10px;padding:14px;font-size:16px}
button{background:#d5b45c;color:#111;border:0;border-radius:10px;padding:0 18px;font-weight:bold;font-size:15px}
button:disabled{opacity:.5}
footer{text-align:center;color:#aaa;font-size:12px;padding:0 12px 16px}
a{color:#e4c16c}
</style>
</head>
<body>
<div class="app">
<header>
<h1>FEMILAROJAH1</h1>
<p>Logistics & Digital Services · AI Customer Assistant</p>
</header>
<div id="chat" aria-live="polite">
<div class="msg bot">Welcome to FEMILAROJAH1! 👋

I can help you learn about our logistics, errand, website design, branding, and other digital services.

How can I help you today?</div>
</div>
<form id="form">
<input id="message" placeholder="Type your message..." autocomplete="off" required>
<button id="send" type="submit">Send</button>
</form>
<footer>Need direct assistance? WhatsApp: 0907 803 4877</footer>
</div>
<script>
const chat = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("message");
const send = document.getElementById("send");
const history = [];

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  history.push({role:"user", content:message});
  input.value = "";
  send.disabled = true;
  send.textContent = "...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({messages:history})
    });

    const data = await response.json();

    if (!response.ok || !data.reply) {
      throw new Error(data.error || "The assistant is temporarily unavailable.");
    }

    addMessage(data.reply, "bot");
    history.push({role:"assistant", content:data.reply});

    if (history.length > 12) history.splice(0, 2);
  } catch (error) {
    addMessage("Sorry, I couldn't respond just now. Please contact us on WhatsApp: 0907 803 4877.", "bot");
    console.error(error);
  } finally {
    send.disabled = false;
    send.textContent = "Send";
    input.focus();
  }
});
</script>
</body>
</html>`;
}

export default {
async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS
      });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(html(), {
        headers: {"Content-Type":"text/html; charset=utf-8"}
      });
    }

    if (url.pathname === "/favicon.ico") {
      return new Response(null, {status:204});
    }

    if (request.method === "POST" && url.pathname === "/api/chat") {
      if (!env.AI) {
        console.error("Workers AI binding is missing.");
        return json({error:"AI binding is missing."}, 503);
      }

      try {
        const body = await request.json();
        const messages = Array.isArray(body.messages) ? body.messages : [];

        const conversation = messages
          .filter(m =>
            m &&
            ["user", "assistant"].includes(m.role) &&
            typeof m.content === "string"
          )
          .slice(-12)
          .map(m => ({role:m.role, content:m.content.slice(0, 2000)}));

        if (!conversation.length) {
          return json({error:"Please enter a message."}, 400);
        }

        const result = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct-fp8",
          {
            messages: [
              {role:"system", content:BUSINESS_INFO},
              ...conversation
            ],
            max_tokens: 400
          }
        );

        const reply = result && result.response;

        if (typeof reply !== "string" || !reply.trim()) {
          console.error("Unexpected Workers AI response:", JSON.stringify(result));
          return json({error:"The AI returned an empty response."}, 502);
        }

        return json({reply:reply.trim()});
      } catch (error) {
        console.error("FEMILAROJAH1 AI failure:", error);
        return json({
          error: String(error?.message || error || "Unknown AI error")
        }, 500);
      }
    }

    return json({error:"Not found."}, 404);
  }
};
