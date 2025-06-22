'use client';

import { useState, useRef, useEffect } from 'react';
import ChatInput from '@/components/ChatInput';
import ChatBubble from '@/components/ChatBubble';
import Footer from '@/components/Footer';
import GrumpyTradesman from '@/components/GrumpyTradesman';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isPaid?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Import gptFetch dynamically to avoid SSR issues
      const { gptFetch } = await import('@/utils/gptFetch');
      const response = await gptFetch(text);
      
      // Add bot response(s)
      if (response.paidTrade) {
        const paidMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.paidTrade,
          isUser: false,
          timestamp: new Date(),
          isPaid: true,
        };
        setMessages(prev => [...prev, paidMessage]);
      }

      const botMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: response.aiResponse,
        isUser: false,
        timestamp: new Date(),
        isPaid: false,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 3).toString(),
        text: "Fuck, something went wrong. Try again, yeah?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-400 rounded-full blur-2xl"></div>
      </div>
      {/* Header */}
      <div className="text-center py-8 px-2 sm:px-4 relative overflow-hidden">
        {/* Grumpy Tradesman Character */}
        <div className="absolute top-4 right-4 md:right-8 hidden sm:block">
          <GrumpyTradesman className="transform hover:scale-110 transition-transform duration-200" />
        </div>
        
        <div className="flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap overflow-hidden">
            Fuck it. I need a...
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-4 px-2">
            Tell me what&apos;s broken and I&apos;ll find someone who can fix it. No bullsh*t, just real trades.
          </p>
          
          {/* Mobile Grumpy Tradesman */}
          <div className="sm:hidden mb-4">
            <GrumpyTradesman className="transform scale-75" />
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 pb-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                  <div className="text-4xl mb-4">🔧</div>
                  <p className="text-lg mb-4 font-semibold text-gray-700">Right then, what&apos;s fucked?</p>
                  <p className="text-sm mb-2">Try asking for:</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">&quot;plumber for blocked toilet&quot;</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">&quot;electrician ASAP&quot;</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">&quot;builder for extension&quot;</span>
                  </div>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                isPaid={message.isPaid}
                timestamp={message.timestamp}
              />
            ))}
            
            {isLoading && (
              <ChatBubble
                message="Thinking..."
                isUser={false}
                timestamp={new Date()}
                isLoading={true}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
