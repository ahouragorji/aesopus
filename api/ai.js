// api/ai.js
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // 1. Parse the environment variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    
    // 2. Force Vercel to read the literal newlines correctly
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    
    // 3. Initialize
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error("Firebase Init Error: Check your FIREBASE_SERVICE_ACCOUNT JSON formatting.");
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const idToken = req.headers['x-firebase-token'];
  try {
    await admin.auth().verifyIdToken(idToken);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
const { provider, payload } = req.body;
  const isGemini = provider === 'gemini';

  // ── INJECT USAGE LIMITING INSTRUCTIONS ───────────────────────────
  // This forces the model to be incredibly concise, minimizing token usage.
  const brevityEnforcer = " CRITICAL OPERATIONAL CONSTRAINT: You must be extremely concise. Provide the absolute minimum amount of text necessary. Keep narrative paragraphs very short (1-2 sentences or 15 words maximum) and descriptions brief. Minimize token generation under all circumstances.";

  try {
    if (isGemini) {
      // For Gemini, inject into systemInstruction
      if (payload.systemInstruction && payload.systemInstruction.parts) {
        payload.systemInstruction.parts[0].text += brevityEnforcer;
      }
    } else {
      // For OpenAI, inject into the system message content
      if (payload.messages && payload.messages.length > 0) {
        const systemMessage = payload.messages.find(m => m.role === 'system');
        if (systemMessage) {
          systemMessage.content += brevityEnforcer;
        }
      }
    }
  } catch (injectError) {
    console.error("Brevity injection failed, proceeding with original payload", injectError);
  }
  // ─────────────────────────────────────────────────────────────────

  const targetUrl = isGemini
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
    : 'https://api.openai.com/v1/chat/completions';

  const headers = { 'Content-Type': 'application/json' };
  if (!isGemini) headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY}`;

  const upstream = await fetch(targetUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  const data = await upstream.json();
  res.status(upstream.status).json(data);
}