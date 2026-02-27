// ============================================================
//  🤖 RIXO.IN TELEGRAM SALESBOT — CLOUD VERSION
//  Deploy on Koyeb (100% Free Forever — No credit card)
//  No ngrok needed — Koyeb gives a permanent HTTPS URL
// ============================================================

const express = require("express");
const axios   = require("axios");
const fs      = require("fs");

const app = express();
app.use(express.json());

// ============================================================
//  ✅ CONFIG — Set these as Environment Variables on Koyeb
//  (Never hardcode tokens — paste them in Koyeb dashboard)
// ============================================================
const CONFIG = {
  BOT_TOKEN : process.env.BOT_TOKEN  || "YOUR_TELEGRAM_BOT_TOKEN",
  WEBSITE   : "https://rixo.in",
  PREVIEW   : "https://rixo.in/build.html",
  PORT      : process.env.PORT || 3000,
  LEADS_FILE: "/tmp/leads.json",   // /tmp works on cloud (writable)
};

const API = `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}`;

// ============================================================
//  🧠 SALES MESSAGES
// ============================================================
const MSG = {
  greeting: (name) =>
    `👋 नमस्ते *${name}*!\n\n` +
    `मैं *Rixo.in* का Sales Assistant हूँ 🤖\n\n` +
    `क्या आप एक Professional हैं जिनके पास अभी तक website नहीं है?\n\n` +
    `📢 हम देते हैं *Beautiful Professional Website* सिर्फ *₹499/साल* में!\n\n` +
    `✅ 24 घंटे में Live\n` +
    `✅ Google पर आपका नाम\n` +
    `✅ WhatsApp connect button\n` +
    `✅ Zero technical knowledge\n\n` +
    `नीचे buttons से शुरू करें 👇`,

  price: () =>
    `💰 *₹499/साल (₹41/महीना)* में मिलता है:\n\n` +
    `🌐 yourname.rixo.in — personal link\n` +
    `📱 Mobile-first beautiful design\n` +
    `💬 WhatsApp direct connect button\n` +
    `🔍 Google indexing\n` +
    `🔒 SSL Security (HTTPS)\n` +
    `⚡ 24 घंटे में Live — guaranteed\n` +
    `✏️ Free content updates\n` +
    `💯 7-day money back guarantee\n\n` +
    `🆚 Agency website: ₹10,000–50,000\n` +
    `✅ Rixo.in: *सिर्फ ₹499!* 🎉`,

  preview: () =>
    `🎨 *2 मिनट में Free Preview बनाएं!*\n\n` +
    `👉 ${CONFIG.PREVIEW}\n\n` +
    `1️⃣ Link खोलें\n` +
    `2️⃣ नाम, photo, services भरें\n` +
    `3️⃣ Real mockup में देखें\n` +
    `4️⃣ ₹499 में Go Live! 🚀\n\n` +
    `✅ No payment | ✅ No credit card`,

  demo: () =>
    `👀 *Real Rixo Profiles:*\n\n` +
    `🩺 Dr. Anjali Sharma — Dehradun\n` +
    `⚖️ Adv. Mehta — Lucknow\n` +
    `🎨 Priya Rawat — UI Designer\n` +
    `📸 Rohit Verma — Photographer\n\n` +
    `सभी *₹499/साल* में! 😮\n\n` +
    `👉 ${CONFIG.PREVIEW}`,

  doctor: (name) =>
    `🩺 *Doctor Sahab के लिए!*\n\n` +
    `70% नए मरीज़ पहले *Google पर search* करते हैं।\n` +
    `Website नहीं = मरीज़ कहीं और जाते हैं! 😟\n\n` +
    `✅ drYOURNAME.rixo.in\n` +
    `✅ Services, Timing, WhatsApp appointment\n` +
    `✅ Google Indexed\n` +
    `✅ सिर्फ *₹499/साल*\n\n` +
    `👉 ${CONFIG.PREVIEW}`,

  lawyer: (name) =>
    `⚖️ *Advocates के लिए!*\n\n` +
    `आज का client *Google पर credibility देखता है।*\n\n` +
    `✅ advYOURNAME.rixo.in\n` +
    `✅ Practice areas, Experience, WhatsApp inquiry\n` +
    `✅ सिर्फ *₹499/साल*\n\n` +
    `👉 ${CONFIG.PREVIEW}`,

  freelancer: () =>
    `🎨 *Freelancers के लिए!*\n\n` +
    `Clients portfolio link माँगते हैं — क्या आपके पास है?\n\n` +
    `✅ YOURNAME.rixo.in — Portfolio + Contact\n` +
    `✅ LinkedIn sharing perfect\n` +
    `✅ सिर्फ *₹499/साल*\n\n` +
    `👉 ${CONFIG.PREVIEW}`,

  student: () =>
    `🎓 *Students के लिए!*\n\n` +
    `Interviewer को भेजो professional profile link!\n` +
    `Resume से ज़्यादा powerful! 💪\n\n` +
    `✅ YOURNAME.rixo.in\n` +
    `✅ सिर्फ *₹499/साल*\n\n` +
    `👉 ${CONFIG.PREVIEW}`,

  expensive: () =>
    `💡 *₹499 महंगा?*\n\n` +
    `₹499 = *₹1.36/दिन* — एक chai से सस्ता ☕\n\n` +
    `Agency website: ₹10,000–50,000\n` +
    `Rixo.in: *सिर्फ ₹499* + 7-day refund guarantee\n` +
    `कोई risk नहीं! 😊\n\n` +
    `👉 ${CONFIG.PREVIEW}`,

  trust: () =>
    `🤝 *हम पर भरोसा क्यों?*\n\n` +
    `✅ 500+ professionals already online\n` +
    `✅ Razorpay secure payment\n` +
    `✅ 7-day full refund guarantee\n` +
    `✅ WhatsApp support — minutes में reply\n` +
    `✅ Made with ❤️ in India\n\n` +
    `पहले free preview बनाएं, पसंद आए तभी pay करें!\n` +
    `👉 ${CONFIG.PREVIEW}`,

  fallback: () =>
    `😊 *Rixo.in — ₹499/साल में Professional Website!*\n\n` +
    `24 घंटे में Live | Google Indexed | WhatsApp Button\n\n` +
    `नीचे buttons use करें 👇`,
};

// ============================================================
//  🎛️ KEYBOARD BUTTONS
// ============================================================
function mainMenu() {
  return {
    inline_keyboard: [
      [
        { text: "💰 ₹499 में क्या मिलता है?", callback_data: "price" },
        { text: "🎨 Free Preview", url: CONFIG.PREVIEW },
      ],
      [
        { text: "👀 Demo देखें",    callback_data: "demo" },
        { text: "🤝 Trust क्यों?", callback_data: "trust" },
      ],
      [
        { text: "🩺 Doctor",    callback_data: "doctor" },
        { text: "⚖️ Lawyer",   callback_data: "lawyer" },
      ],
      [
        { text: "🎨 Freelancer", callback_data: "freelancer" },
        { text: "🎓 Student",    callback_data: "student" },
      ],
      [
        { text: "💸 ₹499 महंगा है", callback_data: "expensive" },
        { text: "🌐 rixo.in",        url: CONFIG.WEBSITE },
      ],
    ],
  };
}

// ============================================================
//  📨 SEND MESSAGE
// ============================================================
async function sendMessage(chatId, text, keyboard = null) {
  try {
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      ...(keyboard && { reply_markup: keyboard }),
    });
  } catch (e) {
    console.error("❌ Send error:", e.response?.data?.description || e.message);
  }
}

async function answerCallback(id) {
  await axios.post(`${API}/answerCallbackQuery`, { callback_query_id: id }).catch(() => {});
}

// ============================================================
//  🧠 SMART REPLY
// ============================================================
function getReplyKey(text) {
  const m = (text || "").toLowerCase();
  if (m.includes("doctor") || m.includes("physician") || m.includes("mbbs")) return "doctor";
  if (m.includes("lawyer") || m.includes("advocate"))                         return "lawyer";
  if (m.includes("freelancer") || m.includes("designer"))                     return "freelancer";
  if (m.includes("student") || m.includes("fresher"))                         return "student";
  if (m.includes("499") || m.includes("price") || m.includes("cost"))        return "price";
  if (m.includes("preview") || m.includes("try") || m.includes("free"))      return "preview";
  if (m.includes("trust") || m.includes("genuine") || m.includes("real"))    return "trust";
  if (m.includes("mahanga") || m.includes("expensive") || m.includes("discount")) return "expensive";
  if (m.includes("demo") || m.includes("example"))                            return "demo";
  if (m.includes("hi") || m.includes("hello") || m.includes("namaste"))      return "greeting";
  return null;
}

function getMsg(key, name = "there") {
  const map = {
    price: MSG.price(), preview: MSG.preview(), demo: MSG.demo(),
    trust: MSG.trust(), doctor: MSG.doctor(name), lawyer: MSG.lawyer(name),
    freelancer: MSG.freelancer(), student: MSG.student(),
    expensive: MSG.expensive(), greeting: MSG.greeting(name),
  };
  return map[key] || MSG.fallback();
}

// ============================================================
//  💾 LEADS  (saved to /tmp — resets on redeploy, export often)
// ============================================================
function saveLead(user) {
  try {
    let leads = [];
    if (fs.existsSync(CONFIG.LEADS_FILE))
      leads = JSON.parse(fs.readFileSync(CONFIG.LEADS_FILE, "utf-8"));
    if (!leads.find((l) => l.id === user.id)) {
      leads.push({ ...user, date: new Date().toISOString() });
      fs.writeFileSync(CONFIG.LEADS_FILE, JSON.stringify(leads, null, 2));
      console.log(`✅ New lead: ${user.first_name} (@${user.username || "—"})`);
    }
  } catch (e) { console.error("Lead save error:", e.message); }
}

// ============================================================
//  📥 WEBHOOK ENDPOINT
// ============================================================
app.post("/webhook", async (req, res) => {
  res.sendStatus(200);
  const body = req.body;

  // Button presses
  if (body.callback_query) {
    const cb = body.callback_query;
    await answerCallback(cb.id);
    const name = cb.from.first_name || "there";
    await sendMessage(cb.message.chat.id, getMsg(cb.data, name), mainMenu());
    return;
  }

  // Text messages
  if (body.message) {
    const { chat, from, text } = body.message;
    const name = from.first_name || "there";
    console.log(`📩 [${name}]: "${text}"`);
    saveLead(from);
    if (text === "/start" || text === "/help") {
      await sendMessage(chat.id, MSG.greeting(name), mainMenu());
      return;
    }
    const key = getReplyKey(text);
    await sendMessage(chat.id, key ? getMsg(key, name) : MSG.fallback(), mainMenu());
  }
});

// ============================================================
//  🏥 HEALTH CHECK — Koyeb pings this to keep bot alive
// ============================================================
app.get("/", (req, res) => {
  res.json({
    status: "✅ Rixo.in Salesbot is running!",
    time: new Date().toISOString(),
    platform: "Koyeb",
  });
});

// ============================================================
//  📊 LEADS DASHBOARD
// ============================================================
app.get("/leads", (req, res) => {
  let leads = [];
  try {
    if (fs.existsSync(CONFIG.LEADS_FILE))
      leads = JSON.parse(fs.readFileSync(CONFIG.LEADS_FILE, "utf-8"));
  } catch (e) {}
  const today = leads.filter((l) => Date.now() - new Date(l.date) < 86400000).length;

  res.send(`<!DOCTYPE html>
<html><head>
  <title>Rixo Salesbot — Leads</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',sans-serif;background:#f0f4ff}
    header{background:linear-gradient(135deg,#6c3fff,#a855f7);color:#fff;padding:22px 28px}
    h1{font-size:20px}header p{opacity:.8;font-size:12px;margin-top:3px}
    .c{max-width:900px;margin:0 auto;padding:20px 14px}
    .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
    .stat{background:#fff;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.06)}
    .num{font-size:32px;font-weight:700;color:#6c3fff}.lbl{font-size:12px;color:#888;margin-top:2px}
    table{width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);border-collapse:collapse}
    th{background:#6c3fff;color:#fff;padding:11px 14px;text-align:left;font-size:12px}
    td{padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:13px}
    tr:last-child td{border:none}tr:hover td{background:#f5f0ff}
    .empty{text-align:center;padding:50px;color:#aaa}
    a.dl{display:inline-block;margin-top:12px;padding:7px 16px;background:#6c3fff;color:#fff;border-radius:8px;text-decoration:none;font-size:12px}
    .note{margin-top:12px;font-size:12px;color:#f59e0b;background:#fffbeb;padding:8px 12px;border-radius:8px;border-left:3px solid #f59e0b}
  </style>
</head><body>
  <header><h1>🤖 Rixo.in Telegram Salesbot</h1><p>Live on Koyeb • Free Forever</p></header>
  <div class="c">
    <div class="stats">
      <div class="stat"><div class="num">${leads.length}</div><div class="lbl">Total Leads</div></div>
      <div class="stat"><div class="num">${today}</div><div class="lbl">Today</div></div>
      <div class="stat"><div class="num">${leads.filter(l=>l.username).length}</div><div class="lbl">With @Username</div></div>
    </div>
    <table>
      <thead><tr><th>#</th><th>Name</th><th>@Username</th><th>Telegram ID</th><th>Language</th><th>Date</th></tr></thead>
      <tbody>
        ${leads.length === 0
          ? '<tr><td colspan="6"><div class="empty">📭 No leads yet!<br>Share your bot link to get started.</div></td></tr>'
          : [...leads].reverse().map((l,i) => `
            <tr>
              <td>${leads.length-i}</td>
              <td><strong>${l.first_name||''} ${l.last_name||''}</strong></td>
              <td>${l.username ? '@'+l.username : '—'}</td>
              <td><code>${l.id}</code></td>
              <td>${l.language_code||'—'}</td>
              <td>${new Date(l.date).toLocaleString('en-IN')}</td>
            </tr>`).join('')}
      </tbody>
    </table>
    <a class="dl" href="/export">⬇ Export leads.json</a>
    <div class="note">⚠️ Leads are stored in /tmp — export regularly! They reset on redeploy.</div>
  </div>
</body></html>`);
});

app.get("/export", (req, res) => {
  if (!fs.existsSync(CONFIG.LEADS_FILE)) return res.json([]);
  res.download(CONFIG.LEADS_FILE, "rixo_leads.json");
});

// ============================================================
//  🔗 REGISTER WEBHOOK WITH TELEGRAM
//  Visit /setup ONCE after deployment to activate
// ============================================================
app.get("/setup", async (req, res) => {
  const host = req.headers.host;
  const webhookUrl = `https://${host}/webhook`;
  try {
    const r = await axios.post(`${API}/setWebhook`, { url: webhookUrl });
    if (r.data.ok) {
      res.send(`
        <h2>✅ Bot is LIVE!</h2>
        <p>Webhook set to: <code>${webhookUrl}</code></p>
        <p>Your bot: <a href="https://t.me/${r.data.result || 'your_bot'}">t.me/YOUR_BOT</a></p>
        <p><a href="/leads">📊 View Leads Dashboard</a></p>
      `);
    } else {
      throw new Error(r.data.description);
    }
  } catch (e) {
    res.status(500).send(`<h2>❌ Setup Failed</h2><p>${e.message}</p><p>Check your BOT_TOKEN environment variable.</p>`);
  }
});

// ============================================================
//  ▶️  START
// ============================================================
app.listen(CONFIG.PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   🚀 RIXO SALESBOT — KOYEB EDITION      ║
  ╠══════════════════════════════════════════╣
  ║   Port    : ${CONFIG.PORT}                       ║
  ║   Status  : https://YOUR-APP.koyeb.app/ ║
  ║   Setup   : Visit /setup ONCE to go live║
  ║   Leads   : /leads                      ║
  ╚══════════════════════════════════════════╝`);
});
