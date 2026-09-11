const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace TTS part in /api/analyze-palm
code = code.replace(/\/\/ Generate Malayalam AI model sound directly for the summary[\s\S]*?ttsAvailable = true;\n\s*\}\n\s*\} catch \(ttsErr\) \{\n\s*console\.warn\("Speech generation during palm analysis caught:", ttsErr\);\n\s*\}/, `// TTS generation is now done via /api/tts endpoint to reduce latency`);

// Replace TTS part in /api/chat
code = code.replace(/\/\/ Generate Malayalam AI model sound for the chat reply[\s\S]*?ttsAvailable = true;\n\s*\}\n\s*\} catch \(ttsErr\) \{\n\s*console\.warn\("Speech generation during chat caught:", ttsErr\);\n\s*\}/, `// TTS generation is now done via /api/tts endpoint to reduce latency`);

fs.writeFileSync('server.ts', code);
