const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/Female Malayalam Voice \(Sobhana Neural \/ Unnimaya\)/g, "Local Piper Malayalam TTS (Arjun)");
code = code.replace(/Female Astrologer \(Unnimaya \/ Sobhana\)/g, "Piper Arjun");

fs.writeFileSync('server.ts', code);
