import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, systemContext } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API key is not configured' }, { status: 500 });
    }

    const payload = {
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemContext },
        { role: 'user', content: prompt }
      ],
      stream: false
    };

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
      return NextResponse.json({ error: 'Failed to communicate with Groq AI' }, { status: 502 });
    }

    const data = await groqResponse.json();
    const responseText = data.choices?.[0]?.message?.content || "I couldn't generate a response.";
    
    return NextResponse.json({ response: responseText });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
