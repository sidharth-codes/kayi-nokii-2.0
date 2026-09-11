const fs = require('fs');
let code = fs.readFileSync('js/result.js', 'utf8');

const replaceBlock = `
  async playJothishyanAudio() {
    if (!this.currentData) return;
    this.isPlaying = true;
    if (this.waveformEl) this.waveformEl.style.display = "flex";
    if (this.playVoiceBtn) this.playVoiceBtn.textContent = "🔊 LOADING TTS...";

    const selectedVoice = "Arjun";
    let audioUrl = this.currentData.audio_url || null;
    const speechText = this.currentData.summary || "";

    try {
      if (!audioUrl && speechText) {
         const ttsRes = await window.apiClient.generateTTS(speechText);
         if (ttsRes && ttsRes.audio_url) {
            audioUrl = ttsRes.audio_url;
            this.currentData.audio_url = audioUrl;
         }
      }

      if (this.playVoiceBtn) this.playVoiceBtn.textContent = "⏹ STOP VOICE";
      await window.audioController.playResultAudio(audioUrl, speechText, selectedVoice);
    } catch (e) {
      console.warn("Playback error:", e);
    } finally {
      this.isPlaying = false;
      if (this.waveformEl) this.waveformEl.style.display = "none";
      if (this.playVoiceBtn) this.playVoiceBtn.textContent = "🔊 PLAY PIPER ARJUN";
    }
  }
`;

code = code.replace(/async playJothishyanAudio\(\) \{[\s\S]*?\}\n\s*\}/, replaceBlock.trim());
code = code.replace(/INDIC-F5 VOICE/g, "PIPER ARJUN");
code = code.replace(/FEMALE VOICE/g, "PIPER ARJUN");

fs.writeFileSync('js/result.js', code);
