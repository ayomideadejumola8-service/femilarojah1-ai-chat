
const BUSINESS_INFO = `
You are the official AI customer-service assistant for FEMILAROJAH1.

BUSINESS IDENTITY
Business: FEMILAROJAH1
Services: Logistics, Errands and Digital Services
Location: Ibadan, Nigeria
WhatsApp: 0907 803 4877
WhatsApp link: https://wa.me/2349078034877

YOUR ROLE
Help customers understand services, collect project requirements,
answer questions using approved business information and direct
customers to the owner when human confirmation is required.

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

APPROVED PACKAGES AND PRICES

STARTER — ₦35,000
- Custom logo
- One promotional flyer
- WhatsApp Business setup
- Digital catalogue setup
- Professional business bio

PROFESSIONAL — ₦75,000
- Custom logo
- Basic brand identity
- Three promotional designs
- Digital catalogue
- WhatsApp Business setup
- Social-media branding
- Professional business bio

WEBSITE DESIGN — FROM ₦150,000
- Responsive website
- Home page
- About page
- Services page
- Gallery or Portfolio page
- Contact page
- WhatsApp integration
- Basic SEO
- Deployment

STRICT PRICING RULES
1. Only quote the approved package prices listed above.
2. Website Design starts from ₦150,000. This is not a fixed price
   for every website.
3. E-commerce websites, online payment integration, booking systems,
   membership systems and other custom features require a separate
   quotation approved by the owner.
4. Never invent a price, estimated total, discount or additional fee.
5. Never present an unapproved price as an official quotation.
6. If a customer requests a custom quotation, collect the project
   requirements and explain that the owner must confirm the price.
7. Do not confuse the Starter and Professional packages with
   the separate Website Design package.

PAYMENT RULES
1. Never invent a deposit amount or payment schedule.
2. Never invent bank details or payment instructions.
3. Never promise instalments, refunds or payment deadlines.
4. Never ask customers to pay a deposit based on an AI-generated
   conversation or proposal.
5. Explain that official payment terms will be provided by the owner
   after the quotation is approved.

DELIVERY AND SUPPORT RULES
1. Never invent delivery timelines.
2. Never promise a particular completion date.
3. Never promise warranties, maintenance periods or support periods
   unless the owner has explicitly approved them.
4. Explain that delivery and support arrangements depend on the
   confirmed project scope and official agreement.

PROPOSAL RULES
When a customer requests a proposal:
- Prepare a professional draft based on the requirements supplied.
- Include project scope and requested features.
- Clearly identify any features requiring confirmation.
- Mark price as pending owner approval when not officially confirmed.
- Mark delivery timeline as pending confirmation.
- Mark payment terms as pending confirmation.
- Never request a deposit or claim that a project is officially booked.

CUSTOMER SERVICE RULES
- Be polite, professional, helpful and concise.
- Do not invent services or business policies.
- Do not claim an order or payment is confirmed without owner approval.
- Ask relevant questions when project requirements are incomplete.
- Never pretend that a human employee has reviewed a quotation.
- If uncertain, say the FEMILAROJAH1 team will confirm.
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
.message{padding:11px 13px;margin:10px 0;border-radius:12px;max-width:88%;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}
.bot{background:#292929;border:1px solid #9b7936}
.user{background:#8b6b2c;margin-left:auto}
.menu{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
.menu button{background:#292929;color:#e6c46e;border:1px solid #b89445;border-radius:20px;padding:9px 12px;cursor:pointer}
form{display:flex;gap:8px;margin-top:12px}
input{flex:1;min-width:0;padding:13px;border-radius:8px;border:1px solid #b89445;background:#222;color:white}
form button{padding:12px 17px;background:#b89445;color:#111;border:0;border-radius:8px;font-weight:bold}
button:disabled{opacity:.6;cursor:not-allowed}
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

<div id="chat" aria-live="polite"></div>

<div class="menu">
<button type="button" data-message="I need Logistics and Errands assistance.">Logistics & Errands</button>
<button type="button" data-message="I am interested in Website Design.">Website Design</button>
<button type="button" data-message="I need Branding and Graphics services.">Branding & Graphics</button>
<button type="button" data-message="I need Business Setup assistance.">Business Setup</button>
<button type="button" data-message="I would like to speak to FEMILAROJAH1.">Speak to FEMILAROJAH1</button>
</div>

<form id="form">
<input id="message" placeholder="Type your message..." autocomplete="off" maxlength="3000" required>
<button id="send" type="submit">Send</button>
</form>

<p class="small">FEMILAROJAH1 — Your Satisfaction, Our Priority</p>
</div>

<script>
const chat = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("message");
const sendButton = document.getElementById("send");
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

async function loadHistory() {
  try {
    const response = await fetch(
      "/api/history?sessionId=" + encodeURIComponent(sessionId)
    );

    if (!response.ok) {
      throw new Error("History request failed");
    }

    const data = await response.json();
    chat.innerHTML = "";

    if (Array.isArray(data.messages) && data.messages.length > 0) {
      data.messages.forEach(item => {
        addMessage(
          item.content,
          item.role === "user" ? "user" : "bot"
        );
      });
    } else {
      addMessage(
        "Welcome to FEMILAROJAH1! How can we assist you today?",
        "bot"
      );
    }
  } catch (error) {
    console.error("History loading error:", error);
    chat.innerHTML = "";
    addMessage(
      "We could not load your previous conversation. Please refresh or contact our team on WhatsApp: https://wa.me/2349078034877",
      "bot"
    );
  }
}

async function sendMessage(message) {
  const cleanMessage = message.trim();
  if (!cleanMessage) return;

  addMessage(cleanMessage, "user");
  input.value = "";
  sendButton.disabled = true;

  const waiting = document.createElement("div");
  waiting.className = "message bot";
  waiting.textContent = "Please wait...";
  chat.appendChild(waiting);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        sessionId,
        message: cleanMessage
      })
    });

    const data = await response.json();
    waiting.remove();

    if (!response.ok) {
      addMessage(
        data.error || "Sorry, we could not process that message. Please try again.",
        "bot"
      );
      return;
    }

    addMessage(
      data.reply || "Please contact our team for assistance.",
      "bot"
    );
  } catch (error) {
    waiting.remove();
    addMessage(
      "Connection problem. Please try again or contact us on WhatsApp: https://wa.me/2349078034877",
      "bot"
    );
  } finally {
    sendButton.disabled = false;
    input.focus();
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(input.value);
});

document.querySelectorAll("[data-message]").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.message);
  });
});

loadHistory();
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
      try {
        const event = await request.json();
        console.log("WhatsApp webhook event received:", JSON.stringify(event));
        return json({ received: true });
      } catch (error) {
        return json({ error: "Invalid webhook payload." }, 400);
      }
    }

    // Restore saved chat history
    if (url.pathname === "/api/history" && request.method === "GET") {
      try {
        if (!env.DB) {
          return json({ error: "Chat database is not configured." }, 503);
        }

        const sessionId = String(
          url.searchParams.get("sessionId") || ""
        ).trim();

        if (!sessionId || sessionId.length > 100) {
          return json({ error: "A valid session ID is required." }, 400);
        }

        const result = await env.DB.prepare(
          "SELECT role, content, created_at FROM messages WHERE session_id = ? ORDER BY id ASC LIMIT 100"
        ).bind(sessionId).all();

        return json({
          messages: result.results || []
        });
      } catch (error) {
        console.error("History error:", error);
        return json({ error: "Could not load chat history." }, 500);
      }
    }

    // AI customer chat
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
          return json({
            error: "Please provide a message and session ID."
          }, 400);
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
            max_tokens: 900
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
        return json({
          error: "The assistant could not respond. Please try again shortly."
        }, 500);
      }
    }

    return json({ error: "Not found" }, 404);
  }
};
VALUES (?)"
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

        return json({
          error: "The assistant could not respond. Please try again shortly."
        }, 500);
      }
    }

    return json({ error: "Not found" }, 404);
  }
};
