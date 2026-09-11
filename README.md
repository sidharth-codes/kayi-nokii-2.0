<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# KAI NOKKI (കൈ നോക്കി)
*"Ninte kai onnu kaanikkeda..."* 🔮🖐️

An AI-powered humorous Kerala-style palm-reading and **jothishyan entertainment experience**.

KAI NOKKI combines palm/hand detection, generative AI, and Malayalam text-to-speech to create **Unnimaya Kai Nokki** — an overconfident virtual Kerala jothishyan who looks at your palm and confidently tells you things that absolutely nobody asked to know.

The website intentionally looks like a serious, minimalist, high-end AI product. The humor comes from the **authentic conversational Malayalam/Manglish personality, chaotic delivery, teasing, comedic timing, and absurd predictions**.

> ⚠️ **Entertainment only:** KAI NOKKI does not actually predict the future. Your palm is probably innocent.

---

## 1. Project Overview & Architecture

KAI NOKKI uses a **computer + optional phone-camera architecture**.

### Computer Browser

The computer runs the main application:

- Displays the KAI NOKKI interface
- Handles the camera feed
- Performs browser-side hand/palm detection
- Checks palm alignment and stability
- Captures the palm frame
- Sends the palm data to the backend
- Displays the AI reading
- Handles the interactive jothishyan chat
- Plays Malayalam voice responses

### Phone Camera

The phone can optionally act as a **wireless camera peer**.

The phone:

- Captures camera video
- Streams the video through WebRTC
- Does not run the AI analysis
- Does not contain API keys
- Does not generate the jothishyan response
- Does not handle the main TTS system

### Architecture

```text
                 PHONE
            Camera Peer
                 │
                 │ Camera Stream
                 ▼
       WebRTC PeerConnection
                 │
                 │ Signaling
                 │ WebSocket
                 ▼
        COMPUTER BROWSER
        HTML + CSS + JS
                 │
        ┌────────┴─────────┐
        │                  │
        ▼                  ▼
 Camera / WebRTC      Hand Detection
        │                  │
        └────────┬─────────┘
                 ▼
       Palm Frame Capture
                 │
                 │ POST /api/analyze-palm
                 ▼
          NODE.JS SERVER
                 │
       ┌─────────┼──────────┐
       │         │          │
       ▼         ▼          ▼
 Palm Analysis  Gemini    Piper TTS
       │         │          │
       │         │          │
       └─────────┼──────────┘
                 ▼
          AI Palm Reading
                 │
                 ▼
        Malayalam Response
                 │
                 ▼
          Piper Arjun Voice
                 │
                 ▼
        COMPUTER SPEAKERSpauses without copying lines verbatim.

### Reference Vocabulary
Edit `reference_vocabulary.json` to expand nicknames, addresses, and humorous Malayalam phrases (e.g., `ഉണ്ടം പാണ്ടി`, `മൺചട്ടി മലരേ`, `പുളകിതൻ പാവയ്ക്ക`).

---

## 7. Configuring Real AI Services

### LLM (Gemini / OpenAI)
In `backend/.env`:
```env
MOCK_MODE=false
LLM_API_KEY=your_gemini_api_key_here
LLM_MODEL=gemini-3.8-flash
```

### TTS (Text-To-Speech)
```env
TTS_PROVIDER=gemini
TTS_API_KEY=your_gemini_api_key_here
TTS_VOICE=Kore
```

### Optional Voice Conversion (RVC / Applio)
```env
ENABLE_RVC=true
RVC_MODEL_PATH=path/to/kerala_jothishyan.pth
RVC_SERVER_URL=http://localhost:5000
```
*(By default, `ENABLE_RVC=false`. The application runs with crystal clarity without RVC).*

---

## 8. Disclaimer
KAI NOKKI is strictly an AI-generated entertainment application. Palm readings and predictions are humorous fictions and should not be used as actual astrology, medical, legal, or financial advice.
