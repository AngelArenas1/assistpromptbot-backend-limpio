require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api/openai', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Eres un asistente útil para responder a prompts médicos generados por profesionales de salud." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return res.json({ response: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: 'No valid response from OpenAI' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));