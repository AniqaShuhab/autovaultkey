/**
 * chatbot.js — AutoVault AI Assistant
 * States: closed (hidden, history cleared) | minimized (hidden, history kept) | open (visible)
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

  /* Keywords that suggest conversation end / booking intent */
  const BOOKING_WORDS = /\b(book|price|cost|how much|appointment|come in|visit|address|location|ready|ok|okay|thanks|thank you|tq|confirm|when|open|directions)\b/i;

  const SYSTEM_PROMPT = `You are AutoVault's friendly and knowledgeable customer assistant for a car key duplication shop in Kuala Lumpur, Malaysia.

Your job is to have a real, helpful conversation. Answer questions fully and clearly first. Only suggest WhatsApp contact AFTER you have properly helped the customer — not as a first response.

Services & Pricing:
- Car key duplication (all brands, transponder, smart remote keys) — from RM80
- Access card & RFID card duplication (condo, office, building) — from RM30
- Gate remote duplication (all major brands, rolling code supported) — from RM50
- Same-day service available for most jobs
- All car brands supported (Proton, Perodua, Toyota, Honda, BMW, Mercedes, etc.)

Business Info:
- Location: Kuala Lumpur, Malaysia
- Hours: Monday to Saturday, 9AM–6PM
- WhatsApp: +60195780301
- 10+ years experience, 500+ happy clients
- Licensed and certified technicians

Conversation rules:
1. ALWAYS answer the question properly first — give real information, prices, explain the service
2. Be warm, friendly, and conversational — like a helpful shop assistant
3. Keep replies concise — 2 to 4 sentences max
4. Only mention WhatsApp at the natural END of a conversation when the customer seems ready to book or visit — say something like "Whenever you're ready, just WhatsApp us at +60 19-578 0301 to confirm your visit! 😊"
5. Never say sorry or refer to WhatsApp as your first response to any question
6. If asked something outside AutoVault services, politely say you can only help with AutoVault's services`;

  let state               = 'closed';
  let conversationHistory = [];
  let waitingReply        = false;

  /* ══════════════════════════════
     STATE MANAGEMENT
  ══════════════════════════════ */
  function setOpen() {
    state = 'open';
    win.dataset.state = 'open';
    setTimeout(() => input.focus(), 80);
  }
  function setMinimized() {
    state = 'minimized';
    win.dataset.state = 'closed';
  }
  function setClosed() {
    state = 'closed';
    win.dataset.state = 'closed';
    conversationHistory = [];
    messages.innerHTML  = '';
  }

  btn.addEventListener('click', () => {
    if (state === 'open') {
      setMinimized();
    } else if (state === 'minimized') {
      setOpen();
    } else {
      setOpen();
      setTimeout(() => addBotMessage(
        "Hi! 👋 I'm AutoVault's assistant. Ask me about our car key duplication, access cards, or gate remotes. How can I help you today?",
        false
      ), 300);
    }
  });

  minBtn.addEventListener('click', e => { e.stopPropagation(); setMinimized(); });
  closeBtn.addEventListener('click', e => { e.stopPropagation(); setClosed(); });

  /* ══════════════════════════════
     MESSAGING
  ══════════════════════════════ */
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text || waitingReply) return;
    input.value = '';
    addUserMessage(text);
    conversationHistory.push({ role: 'user', content: text });
    fetchReply(text);
  }

  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'cb-msg cb-user';
    el.textContent = text;
    messages.appendChild(el);
    scrollBottom();
  }

  /* showWA: only show the WhatsApp chip when booking intent detected */
  function addBotMessage(text, showWA) {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg-wrap';

    const avatar = document.createElement('div');
    avatar.className = 'cb-bot-avatar';
    avatar.textContent = 'AV';

    const col = document.createElement('div');
    col.className = 'cb-bot-col';

    const bubble = document.createElement('div');
    bubble.className = 'cb-msg cb-bot';
    bubble.textContent = text;
    col.appendChild(bubble);

    if (showWA) {
      const chip = document.createElement('a');
      chip.href = WA_URL;
      chip.target = '_blank';
      chip.className = 'cb-wa-chip';
      chip.textContent = '💬 Chat on WhatsApp';
      col.appendChild(chip);
    }

    wrap.appendChild(avatar);
    wrap.appendChild(col);
    messages.appendChild(wrap);
    scrollBottom();
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg-wrap';
    wrap.id = 'cbTyping';
    const avatar = document.createElement('div');
    avatar.className = 'cb-bot-avatar';
    avatar.textContent = 'AV';
    const dots = document.createElement('div');
    dots.className = 'cb-typing';
    dots.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(avatar);
    wrap.appendChild(dots);
    messages.appendChild(wrap);
    scrollBottom();
  }

  function removeTyping() {
    const t = document.getElementById('cbTyping');
    if (t) t.remove();
  }

  function scrollBottom() {
    setTimeout(() => { messages.scrollTop = messages.scrollHeight; }, 60);
  }

  /* ══════════════════════════════
     CLAUDE API
  ══════════════════════════════ */
  async function fetchReply(userText) {
    waitingReply = true;
    showTyping();
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model     : 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system    : SYSTEM_PROMPT,
          messages  : conversationHistory
        })
      });
      const data = await res.json();
      removeTyping();

      if (data.content?.[0]?.text) {
        const reply = data.content[0].text;
        conversationHistory.push({ role: 'assistant', content: reply });
        /* Show WA chip only if user message contains booking-intent keywords */
        const showWA = BOOKING_WORDS.test(userText);
        addBotMessage(reply, showWA);
      } else {
        throw new Error('unexpected response shape');
      }
    } catch (err) {
      removeTyping();
      addBotMessage(
        "Oops! Something went wrong on my end. Please WhatsApp us directly at +60 19-578 0301 and we'll help you right away! 😊",
        true
      );
    }
    waitingReply = false;
  }

})();
