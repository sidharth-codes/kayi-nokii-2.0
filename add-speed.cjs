const fs = require('fs');
let code = fs.readFileSync('js/api.js', 'utf8');

code = code.replace(/body: JSON\.stringify\(\{ text \}\)/, 'body: JSON.stringify({ text, speed: window.piperSpeed || 1.0 })');
fs.writeFileSync('js/api.js', code);

let html = fs.readFileSync('index.html', 'utf8');
const sliderHTML = `
        <div class="voice-controls-bar" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 10px;">
          <label style="font-size: 11px; color: var(--gold);">SPEED:</label>
          <input type="range" id="piper-speed-slider" min="0.5" max="2.0" step="0.1" value="1.0" style="width: 100px;">
          <span id="piper-speed-val" style="font-size: 11px; color: var(--gold);">1.0x</span>
        </div>`;
html = html.replace(/<div class="voice-controls-bar" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">/, sliderHTML + '\n        <div class="voice-controls-bar" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">');
fs.writeFileSync('index.html', html);
