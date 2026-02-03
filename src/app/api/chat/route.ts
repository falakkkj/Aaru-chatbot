import { NextRequest, NextResponse } from 'next/server';

const CHATBOT_SERVER_URL = 'http://127.0.0.1:5000/chat';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Call the Flask chatbot server
    const response = await fetch(CHATBOT_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Chatbot server responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error('Chat API error:', error);

    // Check if it's a connection error
    if (error instanceof Error && error.message.includes('fetch')) {
      return NextResponse.json(
        {
          error: 'Chatbot server is not running. Please start the Python server first.',
          details: 'Run: python chatbot/server.py'
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
