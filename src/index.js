
const BUSINESS_INFO = `
You are the official customer assistant for FEMILAROJAH1, a business offering Logistics and Digital Services.

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

APPROVED PACKAGES:

STARTER PACKAGE — ₦35,000
Includes custom logo, one promotional flyer, WhatsApp Business setup, digital catalogue setup and professional business bio.

PROFESSIONAL PACKAGE — ₦75,000
Includes custom logo, basic brand identity, three promotional designs, digital catalogue, WhatsApp Business setup, social-media branding and professional business bio.

WEBSITE DESIGN — FROM ₦150,000
Includes responsive website, Home, About, Services, Gallery/Portfolio and Contact sections, WhatsApp integration, basic SEO and deployment.

IMPORTANT RULES:
1. Never invent prices, discounts, services or guarantees.
2. Starter and Professional packages do not include website design.
3. Website design is a separate service starting from ₦150,000.
4. Individual prices for other services have not been approved. Refer customers to WhatsApp for quotations.
5. For logistics enquiries, ask for the customer's location and request details.
6. Never promise delivery times or availability without confirmation.
7. Never claim an order or payment is confirmed unless verified.
8. Do not invent addresses or payment details.
9. Be friendly, professional and concise.
10. For quotations and orders, direct customers to WhatsApp 0907 803 4877.
11. You assist with FEMILAROJAH1 enquiries only.
`;

const WORKER_ORIGIN = "https://femilarojah1-ai-chat.ayomideadejumola8.workers.dev";

const ALLOWED_ORIGINS = [
  "https://ayomideadejumola8-service.github.io",
  WORKER_ORIGIN
];

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin":
      ALLOWED_ORIGINS.includes(origin) ? origin : WORKER_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function json(data, status = 200, request) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(request)
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
body{margin:0;background:#101010;color:white;font-family:Arial,sans-serif;min-height:100vh;display:flex;justify-content:center;align-items:center;padding:14px}
.app{width:100%;max-width:600px;background:#1b1b1b;border:1px solid #b99748;border-radius:18px;overflow:hidden}
header{background:#111;padding:22px;text-align:center;border-bottom:1px solid #b99748}
h1{color:#e4c16c;margin:0 0 8px;font-size:24px}
header p{margin:0;color:#ddd;font-size:14px}
.menu{display:flex;flex-wrap:wrap;gap:8px;padding:14px}
.menu button{background:#30291b;color:#e4c16c;border:1px solid #8e7134;padding:10px;border-radius:20px;font-size:12px}
#chat{height:48vh;min-height:300px;max-height:500px;overflow-y:auto;padding:16px}
.msg{padding:12px 14px;border-radius:12px;margin-bottom:12px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.5;font-size:14px}
.bot{background:#2a2a2a;border:1px solid #444}
.user{background:#66501f;margin-left:25px}
form{display:flex;gap:8px;padding:14px;border-top:1px solid #444}
input{min-width:0;flex:1;background:#292929;color:white;border:1px solid #555;border-radius:10px;padding:14px;font-size:16px}
#send{background:#d5b45c;color:#111;border:0;border-radius:10px;padding:0 18px;font-weight:bold}
#send:disabled{opacity:.5}
footer{text-align:center;color:#aaa;font-size:12px;padding:0 12px 16px}
footer a{color:#e4c16c}
</style>
</head>
<body>
<div class="app">
<header>
<h1>FEMILAROJAH1</h1>
<p>Logistics • Errands • Digital Services</p>
<p>AI Customer Assistant</p>
</header>

<div class="menu">
<button type="button" data-message="Tell me about your Logistics and Errand services.">Logistics & Errands</button>
<button type="button" data-message="Tell me about Website Design.">Website Design</button>
<button type="button" data-message="Tell me about Branding and Graphics services.">Branding & Graphics</button>
<button type="button" data-message="Tell me about your business setup services.">Business Setup</button>
<button type="button" data-message="I would like to speak to FEMILAROJAH1.">Speak to FEMILAROJAH1</button>
</div>

<div id="chat" aria-live="polite">
<div class="msg bot">Welcome to FEMILAROJAH1!

I can assist with logistics, errands, website design, branding and other digital services.

Choose a service above or type your enquiry below.</div>
</div>

<form id="form">
<input id="message" placeholder="Type your enquiry..." autocomplete="off" required>
<button id="send" type="submit">Send</button>
</form>

<footer>
Direct assistance:
<a href="https://wa.me/2349078034877">WhatsApp 0907 803 4877</a>
</footer>
</div>

<script>
const API = "${WORKER_ORIGIN}/api/chat";
const chat = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("message");
const send = document.getElementById("send");

let sessionId = localStorage.getItem("femilarojah1_session");

if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("femilarojah1_session", sessionId);
}

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(message) {
  if (!message.trim()) return;

  addMessage(message, "user");
  input.value = "";
  send.disabled = true;
  send.textContent = "...";

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        sessionId,
        message
      })
    });

    const data = await response.json();

    if (!response.ok || !data.reply) {
      throw new Error(data.error || "Assistant unavailable.");
    }

    addMessage(data.reply, "bot");

  } catch (error) {
    console.error("Chat error:", error);
    addMessage(
      "Sorry, our assistant is temporarily unavailable. Please contact us on WhatsApp: 0907 803 4877.",
      "bot"
    );
  } finally {
    send.disabled = false;
    send.textContent = "Send";
    input.focus();
  }
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  sendMessage(input.value.trim());
});

document.querySelectorAll("[data-message]").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.message);
  });
});
</script>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request)
      });
    }

    // WhatsApp webhook verification
    if (url.pathname === "/webhook" && request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (
        mode === "subscribe" &&
        token &&
        token === env.WHATSAPP_VERIFY_TOKEN &&
        challenge
      ) {
        return new Response(challenge, {status: 200});
      }

      return new Response("Verification failed", {status: 403});
    }

    // Receive WhatsApp webhook events
    if (url.pathname === "/webhook" && request.method === "POST") {
      try {
        const body = await request.json();
        console.log("WhatsApp webhook event:", JSON.stringify(body));
        return new Response("EVENT_RECEIVED", {status: 200});
      } catch (error) {
        console.error("WhatsApp webhook error:", error);
        return new Response("Invalid request", {status: 400});
      }
    }

    if (request.method === "GET" && url.pathname === "/") {
      return new Response(html(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...corsHeaders(request)
        }
      });
    }

    if (url.pathname === "/favicon.ico") {
      return new Response(null, {status:204});
    }

    // AI customer chat with D1 conversation storage
    if (request.method === "POST" && url.pathname === "/api/chat") {
      if (!env.AI) {
        return json({error:"AI binding is missing."}, 503, request);
      }

      if (!env.DB) {
        return json({error:"Database binding is missing."}, 503, request);
      }

      try {
        const body = await request.json();
        const sessionId = body.sessionId;
        const message = body.message;

        if (
          typeof sessionId !== "string" ||
          !/^[a-zA-Z0-9-]{10,80}$/.test(sessionId)
        ) {
          return json({error:"Invalid conversation session."}, 400, request);
        }

        if (
          typeof message !== "string" ||
          !message.trim() ||
          message.length > 2000
        ) {
          return json({error:"Please enter a message under 2,000 characters."}, 400, request);
        }

        await env.DB.prepare(
          "INSERT INTO conversations (session_id) VALUES (?) ON CONFLICT(session_id) DO UPDATE SET updated_at = datetime('now')"
        ).bind(sessionId).run();

        await env.DB.prepare(
          "INSERT INTO messages (session_id, role, content) VALUES (?, 'user', ?)"
        ).bind(sessionId, message.trim()).run();

        const saved = await env.DB.prepare(
          "SELECT role, content FROM messages WHERE session_id = ? ORDER BY id DESC LIMIT 12"
        ).bind(sessionId).all();

        const conversation = (saved.results || [])
          .reverse()
          .map(item => ({
            role: item.role,
            content: item.content
          }));

        const result = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct-fp8",
          {
            messages: [
              {role:"system", content:BUSINESS_INFO},
              ...conversation
            ],
            max_tokens:400
          }
        );

        const reply = result && result.response;

        if (typeof reply !== "string" || !reply.trim()) {
          console.error("Unexpected AI response:", JSON.stringify(result));
          return json({error:"The AI returned an empty response."}, 502, request);
        }

        await env.DB.prepare(
          "INSERT INTO messages (session_id, role, content) VALUES (?, 'assistant', ?)"
        ).bind(sessionId, reply.trim()).run();

        await env.DB.prepare(
          "UPDATE conversations SET updated_at = datetime('now') WHERE session_id = ?"
        ).bind(sessionId).run();

        return json({reply:reply.trim()}, 200, request);

      } catch (error) {
        console.error("FEMILAROJAH1 AI or database error:", error);
        return json({
          error:"The assistant could not complete your request. Please try again."
        }, 500, request);
      }
    }

    return json({error:"Not found."}, 404, request);
  }
};
