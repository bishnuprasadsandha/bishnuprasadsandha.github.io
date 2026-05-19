(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     CONFIG
     Get a FREE key → https://aistudio.google.com/apikey
     Restrict it to your domain in Google Cloud Console
     ══════════════════════════════════════════════ */
  var GEMINI_KEY = 'AIzaSyBANHYOv3BhoN9R_Moy0YLDSqXDNP0pRGw';
  var GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=' + GEMINI_KEY;

  var SYSTEM_PROMPT = [
    'You are an AI assistant on Bishnu Prasad Sandha\'s developer portfolio website.',
    'Answer questions from recruiters, developers, and visitors about Bishnu.',
    'Be friendly, professional, and concise (2-4 sentences unless more detail is requested).',
    'Do not invent information not listed below.',
    '',
    'ABOUT BISHNU:',
    'Full name: Bishnu Prasad Sandha',
    'Role: Android & iOS Developer at Fibermax (Nov 2025 – Present)',
    'Education: MCA – SUIIT Sambalpur University (CGPA 9.0) | BCA – Berhampur University (CGPA 8.6)',
    'Location: Berhampur, Odisha, India',
    'Open to roles in: Bhubaneswar, Bangalore, Hyderabad, Remote (full-time / contract / freelance)',
    'Email: asishkumar95889@gmail.com | Phone: +91 7735797841',
    'LinkedIn: linkedin.com/in/bishnu-prasad-sandha | GitHub: github.com/bishnuprasadsandha',
    '',
    'SKILLS:',
    'Android: Kotlin, Jetpack Compose, MVVM, Clean Architecture, Hilt DI, Coroutines & Flow, StateFlow, LiveData, Navigation Component, Room DB, DataStore, WorkManager, RecyclerView, ViewBinding, ViewModel, XML Layouts, Modular Architecture',
    'iOS: Swift, Xcode, UIKit, SwiftUI, CocoaPods, APNs, App Store Connect, Razorpay iOS SDK',
    'Firebase: Auth, Cloud Firestore, Realtime Database, Storage, FCM, Analytics, Crashlytics, Security Rules',
    'Networking: Retrofit, OkHttp, REST API, JSON, Gson, Moshi, Razorpay Payment Gateway, WebSocket',
    'Database: Room DB, SQLite, MySQL, Firestore',
    'Tools: Android Studio, Xcode, Git/GitHub, Figma, Postman, Firebase Console, Google Play Console, App Store Connect, Node.js, Express, Sequelize',
    '',
    'PROFESSIONAL PROJECTS (Fibermax):',
    '1. CashBook – Multi-tenant bookkeeping Android app. Owner/Admin/Operator roles, Firestore sync, real-time ledger, team invitations, offline-first, PDF reports. Live on Google Play Store.',
    '2. WeighBridgeMax – Industrial weighbridge Android app. Vehicle entry, weight capture, PDF slip generation, cloud sync, offline-first. Live on Google Play Store.',
    '3. Cineworld – Cinema booking app (Android + iOS). Seat map, seat locking, Razorpay payment, QR ticket generation, food ordering (seat/counter), FCM, admin panel with multiple roles. Live on Google Play Store & App Store.',
    '4. Mr Care – Crusher service management app. Complaint management, warranty/AMC auto-check, engineer GPS tracking on every update, Google Maps live dashboard, AMC tracking, spare parts ordering, PDF job sheets, FCM. Active development.',
    '',
    'PERSONAL PROJECTS:',
    'Bond – Couple relationship app (in development). Private invite-only pairing, shared timeline, mood sync, FCM.',
    'The Food Hub – Food ordering Android app. Firebase, MVVM, cart management.',
    'WhatsApp Clone – Real-time messaging Android app. Firebase Realtime Database, FCM.',
    'Daily Notes – Offline-first notes app. Room DB, FTS search, CRUD, StateFlow.',
    'Quotify – Quotes app with Retrofit REST API. Room DB bookmarks, pagination.',
    'Hotel Management System – Web app. HTML/CSS/JS/PHP/MySQL, admin dashboard.',
    'Vehicle Inventory Management – Kotlin + Firebase Android app.',
    '',
    'YOUTUBE:',
    'Super Gamer Ashish (@SuperGamerAshish): 13,000+ subscribers, gaming/tech content, fully monetised, 500+ videos.',
    'Ashi Life Vibes (@AshiLifeVibes): 7,000+ subscribers, lifestyle vlogs.',
    '',
    'AVAILABILITY: Bishnu is actively looking for Android/iOS Developer opportunities.',
    '',
    'RULES: Keep answers concise. For salary questions, say to discuss directly with Bishnu. If asked who you are, say you are Bishnu\'s portfolio AI assistant.'
  ].join('\n');

  /* ══════════════════════════════════════════════
     STATE
     ══════════════════════════════════════════════ */
  var chatHistory = [];
  var isChatOpen  = false;
  var isLoading   = false;

  /* ══════════════════════════════════════════════
     DOM REFS
     ══════════════════════════════════════════════ */
  var chatWrapper = document.getElementById('aiChatWrapper');
  var messagesEl  = document.getElementById('aiMessages');
  var inputEl     = document.getElementById('aiInput');
  var sendBtn     = document.getElementById('aiSendBtn');

  if (!chatWrapper) return; // guard if widget HTML not present

  /* ══════════════════════════════════════════════
     OPEN / CLOSE
     ══════════════════════════════════════════════ */
  function toggleAiChat() {
    isChatOpen = !isChatOpen;
    chatWrapper.classList.toggle('open', isChatOpen);
    if (isChatOpen) setTimeout(function () { inputEl && inputEl.focus(); }, 320);
  }

  /* ══════════════════════════════════════════════
     SEND MESSAGE
     ══════════════════════════════════════════════ */
  function sendQuickMsg(text) {
    var quickBtns = messagesEl.querySelector('.ai-quick-btns');
    if (quickBtns) quickBtns.remove();
    sendMsg(text);
  }

  function sendAiMsg() {
    if (!inputEl) return;
    var text = inputEl.value.trim();
    if (!text || isLoading) return;
    inputEl.value = '';
    sendMsg(text);
  }

  function sendMsg(text) {
    if (!text.trim() || isLoading) return;

    appendMsg('user', text);
    chatHistory.push({ role: 'user', parts: [{ text: text }] });

    var typingEl = appendTyping();
    isLoading = true;
    if (inputEl)  inputEl.disabled = true;
    if (sendBtn)  sendBtn.disabled = true;

    var payload = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: chatHistory,
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 }
    };

    fetch(GEMINI_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      typingEl.remove();
      isLoading = false;
      if (inputEl) { inputEl.disabled = false; inputEl.focus(); }
      if (sendBtn)   sendBtn.disabled = false;

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        var reply = data.candidates[0].content.parts[0].text;
        appendMsg('bot', reply);
        chatHistory.push({ role: 'model', parts: [{ text: reply }] });
      } else if (data.error) {
        console.error('Gemini API error:', data.error);
        appendMsg('bot', 'API error: ' + (data.error.message || 'Unknown error') + '. Contact Bishnu at asishkumar95889@gmail.com');
      } else {
        console.error('Unexpected response:', data);
        appendMsg('bot', 'Something went wrong. You can reach Bishnu directly at asishkumar95889@gmail.com');
      }
    })
    .catch(function () {
      typingEl.remove();
      isLoading = false;
      if (inputEl) { inputEl.disabled = false; }
      if (sendBtn)   sendBtn.disabled = false;
      appendMsg('bot', 'Connection error. Please try again or contact Bishnu at asishkumar95889@gmail.com');
    });
  }

  /* ══════════════════════════════════════════════
     RENDER HELPERS
     ══════════════════════════════════════════════ */
  function appendMsg(role, text) {
    var wrap   = document.createElement('div');
    wrap.className = 'ai-msg ai-msg-' + (role === 'user' ? 'user' : 'bot');

    var bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';

    if (role === 'bot') {
      bubble.innerHTML = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
    } else {
      bubble.textContent = text;
    }

    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  function appendTyping() {
    var wrap = document.createElement('div');
    wrap.className = 'ai-msg ai-msg-bot';
    wrap.innerHTML = '<div class="ai-msg-bubble ai-typing"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  /* ══════════════════════════════════════════════
     EVENT WIRING
     ══════════════════════════════════════════════ */
  var triggerBtn = document.getElementById('aiChatTrigger');
  if (triggerBtn) triggerBtn.addEventListener('click', toggleAiChat);

  if (inputEl) {
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAiMsg(); }
    });
  }

  // Close on outside click (guard against removed-from-DOM targets)
  document.addEventListener('click', function (e) {
    if (isChatOpen && chatWrapper && !chatWrapper.contains(e.target) && document.body.contains(e.target)) {
      toggleAiChat();
    }
  });

  /* ══════════════════════════════════════════════
     GLOBAL EXPOSE (for inline onclick)
     ══════════════════════════════════════════════ */
  window.toggleAiChat  = toggleAiChat;
  window.sendAiMsg     = sendAiMsg;
  window.sendQuickMsg  = sendQuickMsg;

})();
