// api/ai.js
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } catch (error) {
    console.error("Firebase Init Error: Check your FIREBASE_SERVICE_ACCOUNT JSON formatting.");
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const idToken = req.headers['x-firebase-token'];
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const uid = decodedToken.uid;
  const { provider, payload, isWordlist } = req.body; // Add a flag to detect wordlist generations
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

    if (dailyCalls >= 20) {
      return res.status(429).json({ error: 'Daily story limit reached. Try again tomorrow!' });
    }
    if (isWordlist && wordlistCalls >= 2) {
      return res.status(429).json({ error: 'Daily wordlist generation limit reached.' });
    }

    // Increment quotas
    await userQuotaRef.set({ 
      date: today, 
      calls: dailyCalls + 1,
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
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
    : 'https://api.openai.com/v1/chat/completions';

  const headers = { 'Content-Type': 'application/json' };
  if (!isGemini) headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY}`;

  const upstream = await fetch(targetUrl, { method: 'POST', headers, body: JSON.stringify(payload) });
  const data = await upstream.json();
  res.status(upstream.status).json(data);
}