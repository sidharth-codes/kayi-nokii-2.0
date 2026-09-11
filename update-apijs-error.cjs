const fs = require('fs');
let code = fs.readFileSync('js/api.js', 'utf8');

const replaceBlock = `
  async generateTTS(text) {
    try {
      const res = await this.fetchWithTimeout(\`\${this.baseUrl}/api/tts\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      throw new Error(data.instructions ? \`\${data.error}\\n\\n\${data.instructions}\` : data.error || \`Server returned \${res.status}\`);
    } catch (err) {
      console.error("Piper TTS Error:", err.message);
      alert("TTS Engine Error:\\n\\n" + err.message);
      return { audio_url: null, format: "none", text };
    }
  }
`;

code = code.replace(/async generateTTS\(text\) \{[\s\S]*?catch \(err\) \{[\s\S]*?\}\n\s*\}/, replaceBlock.trim());

fs.writeFileSync('js/api.js', code);
