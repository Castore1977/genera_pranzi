import { GoogleGenerativeAI } from '@google/generative-ai';

// La chiave API viene letta in modo sicuro dalle variabili d'ambiente di Vercel
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured.' });
  }

  try {
    const { prompt, schema } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        maxOutputTokens: 8192,
      }
    });

    const responseText = result.response.text();
    const parsedResponse = JSON.parse(responseText);
    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error('API call failed:', error);
    res.status(500).json({ error: 'Failed to generate content', details: error.message });
  }
}