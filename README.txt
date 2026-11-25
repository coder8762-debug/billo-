BILLO AI — Cloudflare Worker + static interface

UPDATED MODEL: gemini-3.8-flash through Google's Interactions API.

Deploy without Linux (browser-only):
1. Upload these project files to a GitHub repository, at its root.
2. In Cloudflare dashboard, Workers & Pages > Create > Connect to Git.
3. Choose this repository. For Wrangler projects, use the Cloudflare Git integration/build settings to deploy with Wrangler; this project has wrangler.toml.
4. Once the Worker is deployed, open Worker > Settings > Variables and Secrets.
5. Add a secret named GEMINI_API_KEY and paste your Google AI Studio key.
6. Redeploy and open the Worker URL (not the local index.html preview).

The chat backend calls POST https://generativelanguage.googleapis.com/v1beta/interactions
using model gemini-3.8-flash and store=false. API key remains in Cloudflare secret.

Voice recognition and speech output use browser APIs (Chrome recommended). This is not Gemini Live speech-to-speech; the avatar mouth animation is approximate.
