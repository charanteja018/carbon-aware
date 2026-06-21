import fs from 'fs';

async function test() {
  const req = {
    json: async () => ({
      prompt: "Hello",
      systemContext: "You are a helpful assistant."
    })
  };
  
  // Simulate what route.ts does
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("No API key");
    return;
  }
  const payload = {
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: "You are a helpful assistant." },
      { role: 'user', content: "Hello" }
    ],
    stream: false
  };

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error('Groq Error:', errText);
    } else {
      const data = await groqResponse.json();
      console.log("Success:", data);
    }
  } catch(e) {
    console.error("Fetch failed", e);
  }
}
test();
