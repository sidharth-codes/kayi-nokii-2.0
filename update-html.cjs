const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/🎙️ AI4BHARAT INDIC-F5 VOICE/g, "🎙️ PIPER ARJUN TTS");
code = code.replace(/Authentic Female Malayalam Voice \(IndicF5 \/ AI4Bharat\)/g, "Local Piper Malayalam TTS (Arjun)");
code = code.replace(/🎙️ INDIC-F5 MALAYALAM \(AI4BHARAT\)/g, "🎙️ PIPER ARJUN TTS");
code = code.replace(/🔊 PLAY INDIC-F5 VOICE/g, "🔊 PLAY PIPER ARJUN");

fs.writeFileSync('index.html', code);
