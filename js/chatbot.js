// ===== js/chatbot.js =====
/* ───────────────────────────────────────────────
   CHATBOT JAVASCRIPT
   ─────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ─── DOM REFERENCES ──────────────────────────
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');

  // ─── CHATBOT CONFIG ──────────────────────────
  const botName = "Ranganath's AI";
  const botAvatar = "🤖";

  // ─── CHATBOT RESPONSES ──────────────────────
  const responses = {
    // Greetings
    'hello': "Hello! 👋 How can I help you today? Feel free to ask about my services, process, or pricing.",
    'hi': "Hi there! 👋 What would you like to know about my digital solutions?",
    'hey': "Hey! 👋 I'm here to answer your questions about Ranganath's services.",
    'good morning': "Good morning! ☀️ How can I assist you with your digital needs?",
    'good afternoon': "Good afternoon! 🌤️ Ready to help with your project questions.",
    'good evening': "Good evening! 🌙 Let me know what you're looking for.",

    // Services
    'services': "I offer: Business Websites, Landing Pages, Portfolio Websites, Restaurant/Menu Websites, Local Business Websites, Social-Media Creatives, Resume & Portfolio Creation, Simple AI Chatbots/FAQ Assistants, and Simple Business Automations. Which one interests you?",
    'what services': "I offer: Business Websites, Landing Pages, Portfolio Websites, Restaurant/Menu Websites, Local Business Websites, Social-Media Creatives, Resume & Portfolio Creation, Simple AI Chatbots/FAQ Assistants, and Simple Business Automations. Which one interests you?",
    'websites': "I build modern, responsive websites for businesses, portfolios, restaurants, and local businesses. All are mobile-first and conversion-focused.",
    'website': "I build modern, responsive websites for businesses, portfolios, restaurants, and local businesses. All are mobile-first and conversion-focused.",
    'landing page': "Landing pages are my specialty! High-converting, fast-loading pages designed for campaigns, product launches, and lead capture.",
    'landing pages': "Landing pages are my specialty! High-converting, fast-loading pages designed for campaigns, product launches, and lead capture.",
    'portfolio': "I create clean, modern portfolio websites that showcase your work effectively. Perfect for creatives, freelancers, and professionals.",
    'restaurant': "Restaurant websites with online menus, ordering systems, and reservation flows. I make them look delicious! 🍽️",
    'local business': "Local business websites optimized for SEO with maps, hours, reviews, and clear calls to action. Great for service-based businesses.",
    'social media': "Scroll-stopping social media creatives and visuals designed to engage your audience and build brand awareness.",
    'resume': "Modern, ATS-friendly resume designs and personal portfolio websites to help you stand out in job applications.",
    'chatbot': "Simple AI chatbots and FAQ assistants that handle customer questions 24/7. They qualify leads and save you time.",
    'automation': "Business automations for repetitive tasks, follow-ups, and workflows. No complex code required!",
    'automations': "Business automations for repetitive tasks, follow-ups, and workflows. No complex code required!",

    // Pricing
    'price': "Pricing depends on the project scope. A simple landing page starts around $500, while a full website with AI features ranges from $1,500-$4,000. I'll give you a custom quote based on your needs!",
    'pricing': "Pricing depends on the project scope. A simple landing page starts around $500, while a full website with AI features ranges from $1,500-$4,000. I'll give you a custom quote based on your needs!",
    'cost': "Pricing depends on the project scope. A simple landing page starts around $500, while a full website with AI features ranges from $1,500-$4,000. I'll give you a custom quote based on your needs!",
    'budget': "I work with various budgets! A simple project starts around $500. Let's discuss your specific needs and I'll provide a fair quote.",

    // Process
    'process': "My process: 1️⃣ Understand – I dig into your goals and audience. 2️⃣ Plan – Map out structure and flows. 3️⃣ Build – Develop with modern code. 4️⃣ Test – Validate on all devices. 5️⃣ Improve – Iterate based on feedback.",
    'how work': "My process: 1️⃣ Understand – I dig into your goals and audience. 2️⃣ Plan – Map out structure and flows. 3️⃣ Build – Develop with modern code. 4️⃣ Test – Validate on all devices. 5️⃣ Improve – Iterate based on feedback.",
    'timeline': "Timelines vary by project. A landing page typically takes 1-2 weeks. Full websites with AI features take 3-6 weeks. I'll provide a clear timeline before we start.",
    'time': "Timelines vary by project. A landing page typically takes 1-2 weeks. Full websites with AI features take 3-6 weeks. I'll provide a clear timeline before we start.",

    // About
    'who': "I'm Ranganath Gowda, a Computer Science Engineering student building practical digital solutions using AI and modern tools. I help businesses look professional, save time, and connect with customers.",
    'about': "I'm Ranganath Gowda, a Computer Science Engineering student building practical digital solutions using AI and modern tools. I help businesses look professional, save time, and connect with customers.",
    'ranganath': "That's me! 👋 I'm a CS engineering student interested in AI, cloud, and cybersecurity. I build practical digital solutions for businesses.",

    // Contact
    'contact': "You can reach me through the contact form on this page, or use the 'Start a Project' button. I'll get back to you within 24 hours!",
    'email': "Use the contact form on this page to get in touch. I respond within 24 hours.",
    'reach': "Use the contact form or the 'Start a Project' button. I'm always happy to chat about your project!",

    // Help
    'help': "I can help with: Websites (business, portfolio, restaurant, local), Landing Pages, Social Media Creatives, Resume/Portfolio Creation, AI Chatbots/FAQs, and Business Automations. What are you looking for?",
    'support': "I can help with: Websites (business, portfolio, restaurant, local), Landing Pages, Social Media Creatives, Resume/Portfolio Creation, AI Chatbots/FAQs, and Business Automations. What are you looking for?",
    'what do you do': "I build digital solutions: websites, landing pages, AI chatbots, and business automations. I help businesses look professional and save time.",

    // Default fallback
    'default': "That's a great question! I'd recommend reaching out through the contact form for a detailed answer. In the meantime, tell me more about what you're looking for - websites, AI assistants, or automations?"
  };

  // ─── RESPONSE MATCHING ──────────────────────
  function getResponse(userMessage) {
    const clean = userMessage.toLowerCase().replace(/[.,!?;:]/g, '').trim();
    const words = clean.split(' ');

    if (responses[clean]) {
      return responses[clean];
    }

    for (const [key, response] of Object.entries(responses)) {
      if (key === 'default') continue;
      const keyWords = key.split(' ');
      const matchCount = keyWords.filter(word => words.includes(word)).length;
      if (matchCount >= keyWords.length * 0.7) {
        return response;
      }
    }

    const keywords = {
      'website': 'websites',
      'web': 'websites',
      'site': 'websites',
      'landing': 'landing page',
      'portfolio': 'portfolio',
      'restaurant': 'restaurant',
      'menu': 'restaurant',
      'local': 'local business',
      'social': 'social media',
      'creative': 'social media',
      'resume': 'resume',
      'cv': 'resume',
      'chatbot': 'chatbot',
      'bot': 'chatbot',
      'ai': 'chatbot',
      'automation': 'automation',
      'automate': 'automation',
      'price': 'price',
      'cost': 'pricing',
      'budget': 'budget',
      'time': 'timeline',
      'duration': 'timeline',
      'process': 'process',
      'steps': 'process',
      'about': 'about',
      'who': 'who',
      'contact': 'contact',
      'email': 'contact',
      'reach': 'contact',
      'help': 'help',
      'support': 'help',
      'do': 'what do you do',
      'offer': 'services',
      'provide': 'services'
    };

    for (const [word, mapped] of Object.entries(keywords)) {
      if (words.includes(word)) {
        return responses[mapped] || responses['default'];
      }
    }

    return responses['default'];
  }

  // ─── ADD MESSAGE TO CHAT ────────────────────
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender + '-message';
    messageDiv.textContent = text;

    if (sender === 'user') {
      messageDiv.setAttribute('aria-label', 'You said: ' + text);
    } else {
      messageDiv.setAttribute('aria-label', 'Bot said: ' + text);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ─── SHOW TYPING INDICATOR ──────────────────
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.textContent = '...';
    typingDiv.setAttribute('aria-label', 'Bot is typing');
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  // ─── SEND MESSAGE ────────────────────────────
  function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    chatInput.value = '';
    chatInput.focus();

    showTyping();

    const delay = Math.floor(Math.random() * 800) + 400;

    setTimeout(function() {
      removeTyping();
      const botResponse = getResponse(userMessage);
      addMessage(botResponse, 'bot');
    }, delay);
  }

  // ─── EVENT LISTENERS ─────────────────────────
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendMessage);
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // ─── WELCOME MESSAGE WITH DELAY ─────────────
  setTimeout(function() {
    const welcomeMessages = [
      "I can help you with websites, AI assistants, or automations. What brings you here today?",
      "Feel free to ask about my services, pricing, or process. I'm here to help!",
      "Not sure what you need? Just tell me about your business and I'll suggest some solutions."
    ];

    const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

    const initialMessage = chatMessages.querySelector('.bot-message');
    if (initialMessage) {
      addMessage(randomWelcome, 'bot');
    }
  }, 1500);

  // ─── SUGGESTED QUICK ACTIONS ─────────────────
  const quickActions = document.createElement('div');
  quickActions.className = 'quick-actions';
  quickActions.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.5rem 1.5rem 0.8rem; border-top: 1px solid rgba(212, 168, 55, 0.1);';

  var suggestions = [
    'What services do you offer?',
    'How much does it cost?',
    'What is your process?',
    'Tell me about yourself'
  ];

  suggestions.forEach(function(text) {
    var btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = 'background: rgba(212, 168, 55, 0.05); border: 1px solid rgba(212, 168, 55, 0.15); border-radius: 40px; color: #b8b0a8; padding: 0.3rem 1rem; font-size: 0.75rem; cursor: pointer; transition: all 0.2s ease; font-family: inherit;';
    btn.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(212, 168, 55, 0.15)';
      this.style.borderColor = 'rgba(212, 168, 55, 0.3)';
      this.style.color = '#d4a837';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.background = 'rgba(212, 168, 55, 0.05)';
      this.style.borderColor = 'rgba(212, 168, 55, 0.15)';
      this.style.color = '#b8b0a8';
    });
    btn.addEventListener('click', function() {
      chatInput.value = text;
      sendMessage();
    });
    quickActions.appendChild(btn);
  });

  var chatInputArea = document.querySelector('.chatbot-input-area');
  if (chatInputArea) {
    chatInputArea.parentNode.insertBefore(quickActions, chatInputArea.nextSibling);
  }

  console.log('🤖 Chatbot initialized with ' + Object.keys(responses).length + ' response patterns');
});