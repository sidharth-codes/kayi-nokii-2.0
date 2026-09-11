const fs = require('fs');
let code = fs.readFileSync('js/chat.js', 'utf8');

// Replace the chat handling
const replaceBlock = `
      const res = await window.apiClient.sendChatMessage({
        message: text,
        palm_context: palmContext,
        chat_history: this.chatHistory,
        voice: "Arjun"
      });

      this.removeTypingIndicator(typingIndicatorId);

      const replyText = res.text || "എടാ... കണക്ഷൻ ചെറിയൊരു പ്രശ്നത്തിലായി!";
      const msgObj = {
        role: "jothishyan",
        text: replyText,
        audio_url: null,
        voice: "Arjun"
      };
      
      const msgEl = this.appendMessage(msgObj);
      this.chatHistory.push({ role: "jothishyan", text: replyText });

      // Step 5: Fetch TTS
      const speakingIndicatorId = this.showSpeakingIndicator();
      try {
        const ttsRes = await window.apiClient.generateTTS(replyText);
        this.removeSpeakingIndicator(speakingIndicatorId);
        if (ttsRes && ttsRes.audio_url) {
          window.audioController.playResultAudio(ttsRes.audio_url, replyText, "Arjun");
        }
      } catch (err) {
        this.removeSpeakingIndicator(speakingIndicatorId);
        console.warn("TTS generation failed:", err);
      }
`;

code = code.replace(/const res = await window\.apiClient\.sendChatMessage\(\{[\s\S]*?window\.audioController\.playResultAudio\(res\.audio_url, replyText, "Fenrir"\);/, replaceBlock.trim());

// Add showSpeakingIndicator
if (!code.includes("showSpeakingIndicator()")) {
  code = code.replace(/removeTypingIndicator\(id\) \{[\s\S]*?\}\n/, `removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  showSpeakingIndicator() {
    const id = \`speaking-\${Date.now()}\`;
    const el = document.createElement("div");
    el.id = id;
    el.className = "chat-message jothishyan";
    el.innerHTML = \`
      <span class="message-sender">KAI NOKKI</span>
      <div class="message-bubble" style="font-style: italic; color: var(--accent-gold);">
        🔊 സംസാരിക്കുന്നു...
      </div>
    \`;
    this.messagesFeedEl.appendChild(el);
    this.scrollToBottom();
    return id;
  }

  removeSpeakingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }
`);
}

// Modify appendMessage to return the element and update voice labels
code = code.replace(/UNNIMAYA KAI NOKKI/g, "KAI NOKKI");
code = code.replace(/appendMessage\(msg\) \{[\s\S]*?if \(!this\.messagesFeedEl\) return;/g, `appendMessage(msg) {
    if (!this.messagesFeedEl) return null;`);
    
code = code.replace(/this\.messagesFeedEl\.appendChild\(msgEl\);\n\s*this\.scrollToBottom\(\);/g, `this.messagesFeedEl.appendChild(msgEl);
    this.scrollToBottom();
    return msgEl;`);
    
code = code.replace(/FEMALE VOICE/g, "PIPER ARJUN");
code = code.replace(/Fenrir/g, "Arjun");

fs.writeFileSync('js/chat.js', code);
