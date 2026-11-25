export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname === '/api/chat' && request.method === 'POST') {
   if (!env.GEMINI_API_KEY) return json({error:'Cloudflare secret GEMINI_API_KEY is missing. Add it in Worker Settings → Variables and Secrets.'},500);
   try {
    const body=await request.json();
    const message=body?.message;
    if(!message || typeof message!=='string') return json({error:'Please provide a message.'},400);
    const systemInstruction='You are Billo, a friendly, intelligent feminine personal AI assistant. Understand Urdu, English, Punjabi, and Roman Urdu. Reply in the same language the user uses, naturally. Keep spoken answers conversational, warm, concise unless detail is requested. Be helpful, truthful, and clear. You are a voice-first companion.';
    const r=await fetch('https://generativelanguage.googleapis.com/v1beta/interactions',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({model:'gemini-3.8-flash',input:message,system_instruction:systemInstruction,store:false,generation_config:{temperature:0.75,max_output_tokens:900}})});
    const data=await r.json();
    if(!r.ok) return json({error:data?.error?.message||data?.message||'Gemini request failed',details:data},r.status);
    let reply=data?.output_text;
    if(!reply && Array.isArray(data?.output)) reply=data.output.map(item=>item?.text||item?.content?.map?.(part=>part.text||'').join('')||'').join('\n').trim();
    if(!reply && Array.isArray(data?.steps)) reply=data.steps.map(item=>item?.text||item?.content?.map?.(part=>part.text||'').join('')||'').join('\n').trim();
    return json({reply:reply||'I did not receive a text response. Please try again.'});
   } catch(e){return json({error:e.message||'Unexpected server error'},500)}
  }
  if (env.ASSETS) return env.ASSETS.fetch(request);
  return new Response('Billo AI is online. Configure static assets to serve the UI.',{headers:{'content-type':'text/plain'}});
 }
};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json;charset=utf-8','Access-Control-Allow-Origin':'*'}})}
