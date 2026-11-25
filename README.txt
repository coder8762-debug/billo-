BILLO AI — Cloudflare Worker starter

1. Upload this folder/project to a GitHub repository or use Cloudflare Workers & Pages dashboard to deploy.
2. For Wrangler CLI deployment:
   npm install -g wrangler
   wrangler login
   wrangler deploy
3. Add your Gemini API key as a Worker secret:
   wrangler secret put GEMINI_API_KEY
   (paste the key into terminal prompt; do not place it in index.html)
4. Deploy/redeploy. Open your Worker URL.

Notes:
- Chat responses use Gemini 2.5 Flash via a Worker-side proxy.
- Voice input uses browser SpeechRecognition (Chrome recommended).
- Spoken output uses browser SpeechSynthesis voices; these are not Gemini's Live native voices.
- If voice recognition doesn't work, type in the chat.
- Local static preview won't have /api/chat unless the Worker is running.
