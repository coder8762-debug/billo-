export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname === '/api/chat' && request.method === 'POST') {
   if (!env.GEMINI_API_KEY) return json({error:'Worker secret GEMINI_API_KEY is missing.'},500);
   try {
    const {message}=await request.json();
    if(!message || typeof message!=='string') return json({error:'Please provide a message.'},400);
    const prompt=`You are Billo, a friendly, intelligent feminine personal AI assistant. Understand and answer in Urdu, English, Punjabi, or Roman Urdu. Respond in the same language as the user, automatically. Keep spoken answers conversational, warm, concise unless detail is requested. You can answer general questions.\n\nUser: ${message}`;
    const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.75,maxOutputTokens:900}})});
    const data=await r.json(); if(!r.ok)return json({error:data?.error?.message||'Gemini request failed'},r.status);
    const reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim()||'I did not receive a response. Please try again.';
    return json({reply});
   } catch(e){return json({error:e.message||'Unexpected server error'},500)}
  }
  if (env.ASSETS) return env.ASSETS.fetch(request);
  return new Response('Billo AI is online. Configure static assets to serve the UI.',{headers:{'content-type':'text/plain'}});
 }
};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json;charset=utf-8','Access-Control-Allow-Origin':'*'}})}
