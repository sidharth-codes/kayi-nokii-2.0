const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const replaceBlock = `
// 4. TTS Endpoint (Explicit on-demand Malayalam AI Voice synthesis)
app.post("/api/tts", async (req, res) => {
  try {
    const { text, speed } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const audioDataUrl = await generateSpeechAudio(text, "piper-arjun", 25000, speed || 1.0);
    if (audioDataUrl) {
      return res.json({
        audio_url: audioDataUrl,
        format: "base64_wav",
        text,
        voice: "piper-arjun",
        tts_available: true
      });
    }
    res.status(500).json({ error: "TTS generation returned no audio." });
  } catch (err: any) {
    res.status(500).json({ 
       error: err.message || "TTS error",
       instructions: "To run Piper locally:\\n1. Download ml_IN-arjun-medium.onnx and .json from huggingface\\n2. Install piper-tts binary\\n3. Set PIPER_MODEL_PATH=/path/to/ml_IN-arjun-medium.onnx in .env"
    });
  }
});
`;

code = code.replace(/\/\/ 4\. TTS Endpoint \(Explicit on-demand Malayalam AI Voice synthesis\)[\s\S]*?app\.use\("\/css"/, replaceBlock.trim() + '\n\n// Serve Static Frontend\nconst resolveDir = (dirName: string) => {\n  const cwdDir = path.join(process.cwd(), dirName);\n  if (fs.existsSync(cwdDir)) return cwdDir;\n  const distDir = path.join(__dirname, dirName);\n  if (fs.existsSync(distDir)) return distDir;\n  return cwdDir;\n};\n\napp.use("/css"');

fs.writeFileSync('server.ts', code);
