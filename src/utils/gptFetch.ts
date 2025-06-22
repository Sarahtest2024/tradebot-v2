interface GPTResponse {
  aiResponse: string;
  paidTrade?: string;
}

export async function gptFetch(query: string): Promise<GPTResponse> {
  console.log('🚀 TradeBot Client: Sending query to API:', query);
  
  try {
    console.log('📡 TradeBot Client: Making fetch request to /api/chat');
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    console.log('📥 TradeBot Client: Response status:', response.status);
    console.log('📥 TradeBot Client: Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ TradeBot Client: Error response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    console.log('✅ TradeBot Client: Got response from API');
    
    return {
      aiResponse: data.aiResponse,
      paidTrade: data.paidTrade,
    };
    
  } catch (error) {
    console.error('❌ TradeBot Client: Error calling API:', error);
    
    return {
      aiResponse: `🤖 **Connection Error**

I'm having trouble connecting to my brain right now. This could be:
• Network issues
• Server problems
• API issues

Try again in a moment, or check local trade directories while I sort myself out.

Error details: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
} 