import ReactMarkdown from 'react-markdown';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isPaid?: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

export default function ChatBubble({ 
  message, 
  isUser, 
  isPaid = false, 
  timestamp, 
  isLoading = false 
}: ChatBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs md:max-w-md">
          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3">
            <div className="prose prose-sm max-w-none prose-invert">
              <ReactMarkdown
                components={{
                  p: ({children}) => <p className="mb-1 last:mb-0">{children}</p>,
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {formatTime(timestamp)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-xs md:max-w-md">
        <div className={`rounded-2xl rounded-bl-md px-4 py-3 ${
          isPaid 
            ? 'bg-yellow-100 border-2 border-yellow-300' 
            : 'bg-gray-100'
        }`}>
          {isPaid && (
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-yellow-800">
              <span className="bg-yellow-300 px-2 py-1 rounded-full">💰 PAID PLACEMENT</span>
            </div>
          )}
          
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-gray-500">Thinking...</span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  // Custom styling for markdown elements
                  h1: ({children}) => <h1 className="text-lg font-bold text-gray-800 mb-2">{children}</h1>,
                  h2: ({children}) => <h2 className="text-base font-bold text-gray-800 mb-2 mt-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-sm font-bold text-gray-700 mb-1 mt-2">{children}</h3>,
                  strong: ({children}) => <strong className="font-bold text-gray-800">{children}</strong>,
                  em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                  ul: ({children}) => <ul className="list-none space-y-1 my-2">{children}</ul>,
                  li: ({children}) => <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>{children}</span></li>,
                  p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                  code: ({children}) => <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {!isLoading && (
          <p className="text-xs text-gray-500 mt-1">
            {isPaid && <span className="text-yellow-600 font-medium">Paid • </span>}
            {formatTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
} 