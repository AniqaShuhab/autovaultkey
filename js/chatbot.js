/**
 * chatbot.js — AutoVault AI Assistant
 * Direct Claude API. States: closed | minimized | open
 */
(function () {

  const btn      = document.getElementById('chatbotBtn');
  const win      = document.getElementById('chatbotWindow');
  const messages = document.getElementById('chatbotMessages');
  const input    = document.getElementById('chatbotInput');
  const sendBtn  = document.getElementById('chatbotSend');
  const minBtn   = document.getElementById('chatbotMinimize');
  const closeBtn = document.getElementById('chatbotClose');
  if (!btn || !win) return;

  const WA_URL = 'https://wa.me/60195780301';

  /* Show WA chip only when user seems ready to book/visit */
  const BOOKING_WORDS = /\b(book|price|cost|how much|appointment|come in|visit|address|location|ready|ok|okay|thanks|thank you|tq|confirm|when|open|directions|whatsapp|contact|call)\b/i;

  const SYSTEM = `You are AutoVault's friendly and knowledgeable shop assistant in Kuala Lumpur, Malaysia.

AutoVault services & pricing:
- Car Key Duplication (all brands, transponder, smart remote) — from RM80
- Access Card & RFID Duplication (condo, office, building) — from RM30
- Gate Remote Duplication (all brands, rolling code) — from RM50
- Bag Repairs (handles, zippers, straps, stitching) — from RM25
- Luggage Repairs (wheels, locks, handles, shell) — from RM35
- Shoe Repairs (sole, heel, stitching, cleaning) — from RM20
- Watch Servicing (battery, strap, movement) — from RM15

Business Info:
- Location: Kuala Lumpur, Malaysia
- Hours: Monday–Saturday, 9AM–6PM
- WhatsApp: +60195780301
- Same-day service for most jobs
- 10+ years experience, 500+ happy clients

Rules:
1. ALWAYS answer the question with real info and prices first
2. Be warm, friendly, 2–4 sentences max
3. Only suggest WhatsApp when customer seems ready to book/visit
4. Never give WhatsApp as your FIRST response — answer properly first
5. If asked something unrelated, politely redirect to AutoVault services`;

  let state = 'closed';
  let history = [];
  let busy = false;

  /* ── STATE ── */
  function setOpen()  { state='open';      win.dataset.state='open';   setTimeout(()=>input.focus(),80); }
  function setMin()   { state='minimized'; win.dataset.state='closed'; }
  function setClosed(){ state='closed';    win.dataset.state='closed'; history=[]; messages.innerHTML=''; }

  btn.addEventListener('click', () => {
    if (state==='open')      setMin();
    else if (state==='minimized') setOpen();
    else {
      setOpen();
      setTimeout(() => addBot("Hi! 👋 I'm AutoVault's assistant. Ask me about our car key duplication, access cards, gate remotes, bag/shoe/luggage repairs or watch servicing. How can I help?", false), 320);
    }
  });
  minBtn.addEventListener('click',   e => { e.stopPropagation(); setMin(); });
  closeBtn.addEventListener('click', e => { e.stopPropagation(); setClosed(); });

  /* ── SEND ── */
  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} });

  function send() {
    const t = input.value.trim();
    if (!t || busy) return;
    input.value = '';
    addUser(t);
    history.push({ role:'user', content:t });
    fetchReply(t);
  }

  /* ── RENDER ── */
  function addUser(text) {
    const el = document.createElement('div');
    el.className = 'cb-msg cb-user';
    el.textContent = text;
    messages.appendChild(el);
    scroll();
  }

  function addBot(text, showWA) {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg-wrap';
    const av = document.createElement('div');
    av.className = 'cb-bot-avatar';
    av.textContent = 'AV';
    const col = document.createElement('div');
    col.className = 'cb-bot-col';
    const bbl = document.createElement('div');
    bbl.className = 'cb-msg cb-bot';
    bbl.textContent = text;
    col.appendChild(bbl);
    if (showWA) {
      const chip = document.createElement('a');
      chip.href = WA_URL; chip.target = '_blank';
      chip.className = 'cb-wa-chip';
      chip.textContent = '💬 Chat on WhatsApp';
      col.appendChild(chip);
    }
    wrap.appendChild(av); wrap.appendChild(col);
    messages.appendChild(wrap);
    scroll();
  }

  function showTyping() {
    const w = document.createElement('div');
    w.className = 'cb-msg-wrap'; w.id = 'cbTyping';
    const av = document.createElement('div');
    av.className = 'cb-bot-avatar'; av.textContent = 'AV';
    const d = document.createElement('div');
    d.className = 'cb-typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    w.appendChild(av); w.appendChild(d);
    messages.appendChild(w); scroll();
  }
  function hideTyping() { const t=document.getElementById('cbTyping'); if(t) t.remove(); }
  function scroll() { setTimeout(()=>{ messages.scrollTop=messages.scrollHeight; },60); }

  /* ── CLAUDE API ── */
  async function fetchReply(userText) {
    busy = true;
    showTyping();
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: SYSTEM,
          messages: history
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      hideTyping();
      if (data.content?.[0]?.text) {
        const reply = data.content[0].text;
        history.push({ role:'assistant', content:reply });
        addBot(reply, BOOKING_WORDS.test(userText));
      } else {
        throw new Error('No text in response');
      }
    } catch (err) {
      hideTyping();
      addBot("Oops! Something went wrong. Please WhatsApp us at +60 19-578 0301 and we'll help you right away! 😊", true);
    }
    busy = false;
  }

})();
