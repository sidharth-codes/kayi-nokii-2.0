import { Client, handle_file } from "@gradio/client";
import { EdgeTTS } from "node-edge-tts";
import fs from "fs";

async function test() {
  try {
    const tts = new EdgeTTS({
      voice: "ml-IN-SobhanaNeural",
      lang: "ml-IN",
      outputFormat: "audio-24khz-48kbitrate-mono-mp3"
    });
    await tts.ttsPromise("നമസ്കാരം.", "/tmp/ref.mp3");
    
    console.log("Connecting to Gradio...");
    const client = await Client.connect("ai4bharat/IndicF5");
    console.log("Connected.");
    
    const result = await client.predict("/predict", {
        text_input: "എന്തൊക്കെയുണ്ട് വിശേഷങ്ങൾ?",
        ref_audio_input: handle_file("/tmp/ref.mp3"),
        ref_text_input: "നമസ്കാരം."
    });
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
test();
