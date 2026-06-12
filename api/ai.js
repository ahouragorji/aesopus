// api/ai.js
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
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