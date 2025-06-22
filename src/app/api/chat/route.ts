import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Add runtime config for Edge/Node compatibility
export const runtime = 'nodejs';

// Initialize OpenAI client with environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEP,
});

interface PaidTrade {
  id: string;
  name: string;
  location: string;
  phone?: string;
  website?: string;
  description: string;
  keywords: string[];
  area: string;
}

// Paid trades data
const paidTradesData: PaidTrade[] = [
  {
    "id": "1",
    "name": "QuickFix Plumbing",
    "location": "London & Surrounding Areas",
    "phone": "07123 456789",
    "website": "quickfixplumbing.co.uk",
    "description": "24/7 emergency plumbing. No call-out fee for jobs over £100. Boiler servicing, leak repairs, bathroom installations.",
    "keywords": ["plumber", "plumbing", "leak", "toilet", "boiler", "bathroom", "pipe"],
    "area": "london"
  },
  {
    "id": "2",
    "name": "Bright Spark Electrical",
    "location": "Manchester",
    "phone": "07987 654321",
    "website": "brightspark-electrical.com",
    "description": "Part P certified electricians. Rewiring, fuse box upgrades, EV charger installations. Free quotes, 2-year guarantee.",
    "keywords": ["electrician", "electrical", "wiring", "power", "fuse box", "ev charger"],
    "area": "manchester"
  },
  {
    "id": "3",
    "name": "Ace Building Services",
    "location": "Birmingham & West Midlands",
    "phone": "07456 789123",
    "website": "acebuildingservices.co.uk",
    "description": "Extensions, loft conversions, kitchen fitting. 15 years experience. Fully insured. See our work on Instagram @acebuildingbham",
    "keywords": ["builder", "building", "extension", "loft", "kitchen", "renovation", "conversion"],
    "area": "birmingham"
  },
  {
    "id": "4",
    "name": "The Handyman Hub",
    "location": "Bristol",
    "phone": "07789 123456",
    "description": "Small jobs specialist. Flat pack furniture, shelving, painting, odd jobs. Same day service available. No job too small.",
    "keywords": ["handyman", "furniture", "shelving", "painting", "odd jobs", "small jobs"],
    "area": "bristol"
  }
];

// Easter egg responses
const easterEggs: Record<string, string> = {
  'shag': `Listen, I know what you're after, but I'm a trade bot, not Tinder. 

Try:
• Carpet fitter (for something soft to lie on)
• Interior designer (to make your place more romantic)
• Cleaner (for the morning after)

But for actual shagging? Fuck off. 😘`,

  'bouncy castle': `Oh, you want chaos? Here's your disaster timeline:

1. Kids arrive hyped on sugar
2. Bouncy castle deflates mid-bounce
3. Someone's mum complains about the noise
4. It starts raining
5. Muddy kids everywhere
6. You question all your life choices

**Bouncy Castle Hire Companies:**
• Jump4Joy Inflatables - 07123 456789
• Bounce Bonkers - bouncebankers.co.uk
• "We'll ruin your garden for £150" Ltd

Good luck. You'll need it. 🏰`,

  'therapist': `Ah, looking for someone to sort your head out? Fair play.

I'd recommend:
• NHS talking therapies (free, but waiting lists longer than your problems)
• Private counsellors (expensive but available)
• Your local pub landlord (cheap, questionable advice)

But seriously, mental health matters. Check out:
• Psychology Today directory
• BACP (British Association for Counselling)
• Samaritans if you need someone now: 116 123

Take care of yourself. ❤️`,
};

// Check for easter eggs
function checkEasterEggs(query: string): string | null {
  const lowerQuery = query.toLowerCase();
  
  for (const [trigger, response] of Object.entries(easterEggs)) {
    if (lowerQuery.includes(trigger)) {
      return response;
    }
  }
  
  return null;
}

// Find matching paid trade
function findPaidTrade(query: string): PaidTrade | null {
  const lowerQuery = query.toLowerCase();
  
  return paidTradesData.find((trade: PaidTrade) => 
    trade.keywords.some((keyword: string) => 
      lowerQuery.includes(keyword.toLowerCase())
    )
  ) || null;
}

// Generate TradeBot-style response as fallback
function generateFallbackResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('plumber') || lowerQuery.includes('leak') || lowerQuery.includes('toilet') || lowerQuery.includes('pipe')) {
    return `Right, plumbing emergency. Here's what you need to know:

🔧 **Emergency steps:**
• Turn off the water (stop valve under sink/by toilet)
• Don't use chemical drain cleaners (they make it worse)
• Take photos of the problem for quotes

💰 **Typical costs:**
• Call-out fees: £80-120
• Emergency rates: 1.5-2x normal prices
• If they quote over £200 before even looking, get a second opinion

📞 **How to find someone decent:**
• Local Facebook groups (search "[your area] plumber recommendations")
• Ask neighbors - seriously, old school works
• Checkatrade/Rated People (yeah, I know, but they're useful)

**Red flags:** Knocks on your door randomly, asks for full payment upfront, can't show recent work photos.

*Note: This is a backup response due to network issues. The real TradeBot would roast you more creatively while giving the same advice.* 😄`;
  }
  
  if (lowerQuery.includes('electrician') || lowerQuery.includes('electric') || lowerQuery.includes('power') || lowerQuery.includes('wiring')) {
    return `Electrical issues? Don't fuck about with this one.

⚡ **Safety first:**
• Turn off power at the fuse box if sparking/burning smell
• Don't touch anything wet + electrical
• Get Part P certified work for anything permanent

💰 **Typical costs:**
• Call-out fees: £60-100
• Hourly rate: £40-60
• Always ask for a quote upfront

📞 **Finding someone qualified:**
• NICEIC registered electricians (check their website)
• Local recommendations from Facebook groups
• Always ask to see their qualification certificates

**Red flags:** No qualifications, won't provide certificates, quotes way under market rate.

*Backup TradeBot response - the real one would be more sarcastic but equally helpful.*`;
  }
  
  return `I'm working on finding someone for "${query}".

**General advice while my brain's offline:**

📞 **Where to look:**
• Local Facebook groups (search "[your area] [trade] recommendations")
• Ask neighbors (old school but effective)
• Checkatrade/Rated People (yeah, I know, but they work)

🔧 **General tips:**
• Get quotes from 3 different people
• Check recent reviews, not just star ratings
• Ask to see photos of recent work
• Never pay full amount upfront
• If they knock on your door randomly, tell them to fuck off

💰 **Pricing red flags:**
• Quotes way above or below market rate
• Asks for full payment before starting
• Won't provide written quotes

*This is TradeBot's backup personality due to network issues. Same advice, less creative insults.* 😅`;
}

// Call OpenAI API
async function callTradeBot(query: string): Promise<string> {
  // Check if API key is available
  if (!process.env.OPENAI_API_KEP) {
    console.log('🔑 TradeBot API: No API key found, using fallback response');
    return generateFallbackResponse(query);
  }
  
  // Debug: Log that we have an API key (without showing the key)
  console.log('🔑 TradeBot API: API key found, length:', process.env.OPENAI_API_KEP.length);

  try {
    console.log('🤖 TradeBot API: Making call to OpenAI...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are TradeBot, a sarcastic but helpful trade recommendation bot. Your personality is:
- Blunt, sweary, but ultimately helpful
- British humor and language
- Honest about trade quality and pricing
- Give real, practical advice
- Include contact details when possible (phone numbers, websites)
- Warn about common scams and red flags
- Always suggest getting multiple quotes
- Use emojis and formatting to make responses engaging

Respond to trade requests with actual recommendations, pricing guidance, and practical tips.`
        },
        {
          role: "user",
          content: query
        }
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    console.log('✅ TradeBot API: Got response from OpenAI');
    return response;
    
  } catch (error) {
    console.error('❌ TradeBot API: Error calling OpenAI:', error);
    
    // For SSL/network issues, return a helpful fallback response
    if (error instanceof Error && 
        (error.message.includes('certificate') || 
         error.message.includes('CERT') || 
         error.message.includes('fetch failed'))) {
      console.log('🔄 TradeBot API: Using fallback response due to network issues');
      return generateFallbackResponse(query);
    }
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return `🔑 **API Key Problem**: ${error.message}`;
      }
      
      if (error.message.includes('rate limit')) {
        return `⏰ **Rate Limited**: Too many requests. Please wait a moment and try again.`;
      }
    }
    
    // Default fallback
    console.log('🔄 TradeBot API: Using fallback response due to unknown error');
    return generateFallbackResponse(query);
  }
}

// Add a GET endpoint for testing
export async function GET() {
  console.log('🎯 TradeBot API: GET endpoint hit for testing');
  return NextResponse.json({ 
    status: 'API is working!',
    timestamp: new Date().toISOString(),
    message: 'TradeBot API is accessible'
  });
}

export async function POST(request: NextRequest) {
  console.log('🎯 TradeBot API: POST endpoint hit!');
  
  try {
    const body = await request.json();
    console.log('📝 TradeBot API: Request body:', body);
    
    const { query } = body;
    
    if (!query || typeof query !== 'string') {
      console.log('❌ TradeBot API: Invalid query:', query);
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('🚀 TradeBot API: Processing query:', query);
    
    // Check for easter eggs first
    const easterEggResponse = checkEasterEggs(query);
    if (easterEggResponse) {
      console.log('🥚 TradeBot API: Easter egg triggered');
      return NextResponse.json({
        aiResponse: easterEggResponse
      });
    }
    
    // Find paid trade
    const paidTrade = findPaidTrade(query);
    let paidTradeResponse: string | undefined;
    
    if (paidTrade) {
      console.log('💰 TradeBot API: Found paid trade:', paidTrade.name);
      paidTradeResponse = `💰 **${paidTrade.name}** (Paid Placement)
📍 ${paidTrade.location}
${paidTrade.phone ? `📞 ${paidTrade.phone}` : ''}
${paidTrade.website ? `🌐 ${paidTrade.website}` : ''}

${paidTrade.description}

*This trade paid to be featured. The recommendation below didn't.*`;
    }
    
    // Call OpenAI for AI response
    const aiResponse = await callTradeBot(query);
    
    return NextResponse.json({
      aiResponse,
      paidTrade: paidTradeResponse
    });
    
  } catch (error) {
    console.error('❌ TradeBot API: Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 