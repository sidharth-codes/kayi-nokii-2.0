const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/audio_url: audioUrl,/g, 'audio_url: null,');
code = code.replace(/audio_format: audioFormat,/g, 'audio_format: "none",');
code = code.replace(/tts_available: ttsAvailable,/g, 'tts_available: false,');
fs.writeFileSync('server.ts', code);
