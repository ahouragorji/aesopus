// api/ai.js
import admin from 'firebase-admin';

let adminInitError = null;

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } catch (error) {
    adminInitError = error.message;
    console.error("Firebase Init Error:", error);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // 1. Check if the server actually initialized correctly
  if (adminInitError) {
    return res.status(500).json({ error: 'Server Config Error: Check your FIREBASE_SERVICE_ACCOUNT variable.' });
  }

  const idToken = req.headers['x-firebase-token'];
  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (e) {
    console.error("Token verification failed:", e);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }

  const uid = decodedToken.uid;
  const { provider, payload, isWordlist, customKey } = req.body; 
  const isGemini = provider === 'gemini';

  // --- QUOTA CHECK ---
  const db = admin.firestore();
  const userQuotaRef = db.collection('quotas').doc(uid);
  const today = new Date().toISOString().slice(0,10);
  
  try {
    const snap = await userQuotaRef.get();
    const data = snap.data() || {};
    const dailyCalls = data.date === today ? (data.calls || 0) : 0;
    const wordlistCalls = data.date === today ? (data.wordlists || 0) : 0;

    if (dailyCalls >= 50) {
      return res.status(429).json({ error: 'Daily scenes limit reached. Try again tomorrow!' });
    }
    if (isWordlist && wordlistCalls >= 2) {
      return res.status(429).json({ error: 'Daily wordlist generation limit reached.' });
    }

    // Increment quotas — wordlist generation does NOT consume a scene slot
    await userQuotaRef.set({ 
      date: today, 
      calls: isWordlist ? dailyCalls : dailyCalls + 1,
      wordlists: isWordlist ? wordlistCalls + 1 : wordlistCalls 
    }, { merge: true });

  } catch (dbError) {
    console.error("Quota check failed:", dbError);
    return res.status(500).json({ error: 'Internal server error verifying quota.' });
  }
  // --- END QUOTA CHECK ---

  const brevityEnforcer = " CRITICAL OPERATIONAL CONSTRAINT: You must be extremely concise. Provide the absolute minimum amount of text necessary. Keep narrative paragraphs very short (1-2 sentences or 15 words maximum) and descriptions brief. Minimize token generation under all circumstances.";

  try {
    if (isGemini && payload.systemInstruction?.parts) {
      payload.systemInstruction.parts[0].text += brevityEnforcer;
    } else if (!isGemini && payload.messages) {
      const systemMessage = payload.messages.find(m => m.role === 'system');
      if (systemMessage) systemMessage.content += brevityEnforcer;
    }
  } catch (injectError) {
    console.error("Brevity injection failed.");
  }

  const targetUrl = isGemini
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${customKey || process.env.GEMINI_API_KEY}`
    : 'https://api.openai.com/v1/chat/completions';

  const headers = { 'Content-Type': 'application/json' };
  
  if (!isGemini) headers['Authorization'] = `Bearer ${customKey || process.env.OPENAI_API_KEY}`;

  const upstream = await fetch(targetUrl, { method: 'POST', headers, body: JSON.stringify(payload) });
  const data = await upstream.json();
  res.status(upstream.status).json(data);
}