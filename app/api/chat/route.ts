import { NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Chat service is not configured.' }, { status: 503 });

  const body: unknown = await request.json();
  if (
    typeof body !== 'object' ||
    body === null ||
    !('messages' in body) ||
    !Array.isArray(body.messages) ||
    body.messages.length === 0 ||
    body.messages.length > 30
  ) {
    return NextResponse.json({ error: 'Provide between 1 and 30 messages.' }, { status: 400 });
  }

  const messages: ChatMessage[] = [];
  for (const item of body.messages) {
    if (
      typeof item !== 'object' ||
      item === null ||
      !('role' in item) ||
      !('content' in item) ||
      (item.role !== 'user' && item.role !== 'assistant') ||
      typeof item.content !== 'string' ||
      item.content.length > 4000
    ) {
      return NextResponse.json({ error: 'A chat message is invalid.' }, { status: 400 });
    }
    messages.push({ role: item.role, content: item.content });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              "You are TePC Assistant, chatbot for Tanganyika Epistemological Promotion (TePC – Tanzania), registered NGO in Kasulu, Kigoma, Tanzania. Vision: fostering healthier communities through entrepreneurship... Answer in user's language. Be concise.",
          },
          ...messages,
        ],
      }),
    });
    const result = (await response.json()) as GroqResponse;
    if (!response.ok) throw new Error(result.error?.message ?? response.statusText);

    const content = result.choices?.[0]?.message?.content;
    if (!content) throw new Error('Groq returned an empty response.');
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Groq chat request failed:', error);
    return NextResponse.json(
      { reply: 'Samahani, msaidaji wa AI hapatikani kwa sasa. Tafadhali jaribu tena baadaye.' },
      { status: 500 }
    );
  }
}
