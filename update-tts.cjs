const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const startIndex = code.indexOf('const ttsAudioCache = new Map<string, string>();');
const endIndex = code.indexOf('// 1. Health Check');

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `import { spawn } from "child_process";

const ttsAudioCache = new Map<string, string>();

function cleanTextForTTS(rawText: string): string {
  if (!rawText) return "";
  const clean = rawText
    .replace(/[*_~\`#]/g, "") // remove markdown
    .replace(/^.*?(Unnimaya|ഉണ്ണിമായ|Jothishyan|ജ്യോത്സ്യൻ)[:\\-]/i, "") // remove speaker prefix
    .replace(/[\\u{1F300}-\\u{1F9FF}]/gu, "") // remove emojis
    .replace(/[«»""'']/g, "")
    .replace(/\\s+/g, " ")
    .trim();
  return clean;
}

/**
 * Generates audio using local Piper TTS model (ml_IN-arjun-medium.onnx)
 */
async function generateSpeechAudio(rawText: string, voiceName?: string, timeoutMs?: number, speed: number = 1.0): Promise<string | null> {
  const spokenText = cleanTextForTTS(rawText);
  if (!spokenText) return null;

  const cacheKey = \`piper::\${speed}::\${spokenText}\`;
  if (ttsAudioCache.has(cacheKey)) {
    return ttsAudioCache.get(cacheKey)!;
  }

  const modelPath = process.env.PIPER_MODEL_PATH;
  if (!modelPath) {
    throw new Error("PIPER_MODEL_PATH environment variable is not set. Please download ml_IN-arjun-medium.onnx and ml_IN-arjun-medium.onnx.json, install piper, and configure your .env file. Example: PIPER_MODEL_PATH=/path/to/ml_IN-arjun-medium.onnx");
  }

  return new Promise((resolve, reject) => {
    const piperPath = process.env.PIPER_PATH || "piper";
    // Using --output_file - to output raw wav to stdout
    const args = ["--model", modelPath, "--output_file", "-"];
    if (speed !== 1.0) {
      args.push("--length_scale", speed.toString());
    }

    const piper = spawn(piperPath, args);

    const audioChunks: Buffer[] = [];
    let errorOutput = "";

    piper.stdout.on("data", (chunk) => audioChunks.push(chunk));
    piper.stderr.on("data", (chunk) => {
      errorOutput += chunk.toString();
    });

    piper.on("close", (code) => {
      if (code === 0) {
        const audioBuffer = Buffer.concat(audioChunks);
        const dataUrl = \`data:audio/wav;base64,\${audioBuffer.toString("base64")}\`;
        ttsAudioCache.set(cacheKey, dataUrl);
        resolve(dataUrl);
      } else {
        console.error("[Piper TTS] Error:", errorOutput);
        reject(new Error(\`Piper exited with code \${code}: \${errorOutput.slice(0, 200)}\`));
      }
    });

    piper.on("error", (err) => {
      console.error("[Piper TTS] Process Error:", err);
      reject(new Error(\`Failed to start Piper: \${err.message}\`));
    });

    piper.stdin.write(spokenText);
    piper.stdin.end();
  });
}

`;
  
  code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
  
  code = code.replace(/import \{ Client as GradioClient, handle_file \} from "@gradio\/client";\n/, "");
  code = code.replace(/import \{ EdgeTTS \} from "node-edge-tts";\n/, "");
  
  fs.writeFileSync('server.ts', code);
  console.log('Replaced TTS logic');
} else {
  console.log('Could not find bounds', startIndex, endIndex);
}
