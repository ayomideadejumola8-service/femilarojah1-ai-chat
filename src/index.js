const BUSINESS_INFO = `
You are the official AI customer-service assistant for FEMILAROJAH1.
Business: FEMILAROJAH1 — Logistics, Errands and Digital Services.
Location: Ibadan, Nigeria.
WhatsApp: 0907 803 4877.

SERVICES

LOGISTICS & ERRANDS
- Errand assistance
- Find It For Me
- Shopping and sourcing
- Pickup and delivery assistance
- Ordering assistance
- Custom requests

DIGITAL & CREATIVE SERVICES
- Website design
- Logo design
- Branding
- Flyer and advert design
- Digital catalogue design
- WhatsApp Business setup
- Google Business Profile setup

PACKAGES
Starter — ₦35,000:
Custom logo, one promotional flyer, WhatsApp Business setup,
digital catalogue setup and professional business bio.

Professional — ₦75,000:
Custom logo, basic brand identity, three promotional designs,
digital catalogue, WhatsApp Business setup, social-media branding
and professional business bio.

Website Design — from ₦150,000:
Responsive website, Home, About, Services, Gallery or Portfolio,
Contact, WhatsApp integration, basic SEO and deployment.

IMPORTANT
- Website design is separate from the Starter and Professional packages.
- Do not invent prices for individual services.
- Ask customers for details needed to prepare a quotation.
- Be polite, clear, professional and concise.
- Never claim an order or payment is confirmed unless the owner confirms it.
- For human assistance, direct customers to:
  https://wa.me/2349078034877
`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://ayomideadejumola8-service.github.io",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function page() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FEMILAROJAH1 AI Assistant</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#101010;color:#fff}
.container{max-width:650px;margin:25px auto;padding:16px}
header{text-align:center;padding:20px;background:#1b1b1b;border:1px solid #b89445;border-radius:14px}
h1{color:#d9b45c;margin:0 0 8px}
header p{color:#ddd;font-size:13px}
#chat{height:390px;overflow-y:auto;background:#191919;padding:15px;border-radius:12px;margin-top:15px}
.message{padding:11px 13px;margin:10px 0;border-radius:12px;max-width:88%;line-height:1.5;white-space:pre-wrap}
.bot{background:#292929;border:1px solid #9b7936}
.user{background:#8b6b2c;margin-left:auto}
.menu{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
.menu button{background:#292929;color:#e6c46e;border:1px solid #b89445;border-radius:20px;padding:9px 12px;cursor:pointer}
form{display:flex;gap:8px;margin-top:12px}
input{flex:1;min-width:0;padding:13px;border-radius:8px;border:1px solid #b89445;background:#222;color:white}
form button{padding:12px 17px;background:#b89445;color:#111;border:0;border-radius:8px;font-weight:bold}
a{color:#e6c46e}
.small{text-align:center;color:#aaa;font-size:12px;margin-top:15px}
</style>
</head>
<body>
<div class="container">
<header>
<h1>FEMILAROJAH1</h1>
<strong>AI CUSTOMER SERVICE</strong>
<p>LOGISTICS • ERRANDS • DIGITAL SERVICES</p>
</header>

<div id="chat">
<div class="message bot">Welcome to FEMILAROJAH1! How can we assist you today?</div>
</div>

<div class="menu">
<button type="button" data-message="I need Logistics and Errands assistance.">Logistics & Errands</button>
<button type="button" data-message="I am interested in Website Design.">Website Design</button>
<button type="button" data-message="I need Branding and Graphics services.">Branding & Graphics</button>
<button type="button" data-message="I need Business Setup assistance.">Business Setup</button>
<button type="button" data-message="I would like to speak to FEMILAROJAH1.">Speak to FEMILAROJAH1</button>
</div>

<form id="form">
<input id="message" placeholder="Type your message..." autocomplete="off" required>
<button type="submit">Send</button>
</form>

<p class="small">FEMILAROJAH1 — Your Satisfaction, Our Priority</p>
</div>

<script>
const chat = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("message");
const sessionKey = "femilarojah1_chat_session";
let sessionId = localStorage.getItem(sessionKey);

if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem(sessionKey, sessionId);
}

function addMessage(text, type) {
  const item = document.createElement("div");
  item.className = "message " + type;
  item.textContent = text;
  chat.appendChild(item);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(message) {
  if (!message.trim()) return;

  addMessage(message, "user");
  input.value = "";

  const waiting = document.createElement("div");
  waiting.className = "message bot";
  waiting.textContent = "Please wait...";
  chat.appendChild(waiting);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({sessionId, message})
    });

    const data = await response.json();
    waiting.remove();

    if (!response.ok) {
      addMessage(data.error || "Sorry, we could not process that message. Please try again.", "bot");
      return;
    }

    addMessage(data.reply || "Please contact our team for assistance.", "bot");
  } catch (error) {
    waiting.remove();
    addMessage("Connection problem. Please try again or contact us on WhatsApp: https://wa.me/2349078034877", "bot");
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll("[data-message]").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.message));
});
</script>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/" && request.method === "GET") {
      return new Response(page(), {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }

    // WhatsApp webhook verification
    if (url.pathname === "/webhook" && request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (
        mode === "subscribe" &&
        token === env.WHATSAPP_VERIFY_TOKEN &&
        challenge
      ) {
        return new Response(challenge, { status: 200 });
      }

      return new Response("Verification failed", { status: 403 });
    }

    // Receive WhatsApp webhook events
    if (url.pathname === "/webhook" && request.method === "POST") {
      const event = await request.json();
      console.log("WhatsApp webhook event received:", JSON.stringify(event));
      return json({ received: true });
    }

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        if (!env.AI) {
          return json({ error: "AI service is not configured." }, 503);
        }

        if (!env.DB) {
          return json({ error: "Chat database is not configured." }, 503);
        }

        const body = await request.json();
        const sessionId = String(body.sessionId || "").trim();
        const message = String(body.message || "").trim();

        if (!sessionId || !message) {
          return json({ error: "Please provide a message and session ID." }, 400);
        }

        if (sessionId.length > 100 || message.length > 3000) {
          return json({ error: "Your message is too long." }, 400);
        }

        await env.DB.prepare(
          "INSERT OR IGNORE INTO conversations (session_id) VALUES (?)"
        ).bind(sessionId).run();

        await env.DB.prepare(
          "INSERT INTO messages (session_id, role, content) VALUES (?, 'user', ?)"
        ).bind(sessionId, message).run();

        const historyResult = await env.DB.prepare(
          "SELECT role, content FROM messages WHERE session_id = ? ORDER BY id DESC LIMIT 12"
        ).bind(sessionId).all();

        const history = (historyResult.results || [])
          .reverse()
          .map(item => ({
            role: item.role,
            content: item.content
          }));

        const result = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct-fp8",
          {
            messages: [
              {
                role: "system",
                content: BUSINESS_INFO
              },
              ...history
            ],
            max_tokens: 700
          }
        );

        const reply =
          result.response ||
          result.result?.response ||
          "Please contact FEMILAROJAH1 for assistance.";

        await env.DB.prepare(
          "INSERT INTO messages (session_id, role, content) VALUES (?, 'assistant', ?)"
        ).bind(sessionId, reply).run();

        await env.DB.prepare(
          "UPDATE conversations SET updated_at = datetime('now') WHERE session_id = ?"
        ).bind(sessionId).run();

        return json({ reply });
      } catch (error) {
        console.error("Chat error:", error);
        return json({ error: "The assistant could not respond. Please try again shortly." }, 500);
      }
    }

    return json({ error: "Not found" }, 404);
  }
};
