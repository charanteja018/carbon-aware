import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, systemContext } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Combine system context and user prompt for Ollama
    const fullPrompt = `${systemContext}\n\nUser: ${prompt}\nAssistant:`;

    const ollamaPayload = {
      model: 'llama3',
      prompt: fullPrompt,
      stream: false // Using non-streaming for simpler frontend handling in Hackathon
    };

    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ollamaPayload),
    });

    if (!ollamaResponse.ok) {
      const errText = await ollamaResponse.text();
      console.error('Ollama Error:', errText);
      return NextResponse.json({ error: 'Failed to communicate with Ollama' }, { status: 502 });
    }

    const data = await ollamaResponse.json();
    
    return NextResponse.json({ response: data.response });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
