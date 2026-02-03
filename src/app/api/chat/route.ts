import { NextRequest, NextResponse } from 'next/server';
import { getChatbotResponse } from '@/lib/chatbot';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Call the native TypeScript chatbot logic
    const chatResponse = getChatbotResponse(message);

    return NextResponse.json({ response: chatResponse });
  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      { error: 'Failed to process message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
