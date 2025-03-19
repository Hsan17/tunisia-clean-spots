
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Bonjour ! Je suis Essence, votre assistant virtuel pour découvrir les meilleurs lieux en Tunisie. Comment puis-je vous aider aujourd'hui ?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const generateBotResponse = (userMessage: string): Message => {
    const userMsg = userMessage.toLowerCase();
    let responseText = '';
    
    if (userMsg.includes('bonjour') || userMsg.includes('salut') || userMsg.includes('hello')) {
      responseText = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    } else if (userMsg.includes('restaurant') || userMsg.includes('manger')) {
      responseText = "Je peux vous recommander plusieurs restaurants de qualité. Préférez-vous une cuisine traditionnelle tunisienne ou internationale ?";
    } else if (userMsg.includes('plage') || userMsg.includes('mer') || userMsg.includes('baignade')) {
      responseText = "La Tunisie dispose de magnifiques plages ! Les plages de Hammamet, Sousse et Djerba sont particulièrement propres et bien entretenues.";
    } else if (userMsg.includes('hôtel') || userMsg.includes('logement') || userMsg.includes('dormir')) {
      responseText = "Je peux vous aider à trouver un hébergement. Quel est votre budget approximatif par nuit ?";
    } else if (userMsg.includes('activité') || userMsg.includes('faire') || userMsg.includes('visite')) {
      responseText = "Parmi les activités populaires en Tunisie, je vous recommande la visite des médinas, les excursions dans le désert, ou la découverte des sites archéologiques comme Carthage.";
    } else if (userMsg.includes('merci')) {
      responseText = "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    } else {
      responseText = "Je ne suis pas sûr de comprendre votre demande. Pouvez-vous me donner plus de détails sur ce que vous recherchez en Tunisie ?";
    }
    
    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
    };
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const closeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-burgundy-600 hover:bg-burgundy-700 z-50"
          size="icon"
        >
          <Bot size={24} />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`
            fixed right-6 shadow-xl rounded-xl border border-gray-200 bg-white z-50 transition-all duration-300 ease-in-out
            ${isMinimized 
              ? 'bottom-6 w-72 h-16' 
              : 'bottom-6 w-80 sm:w-96 h-[500px]'
            }
          `}
        >
          {/* Chat header */}
          <div 
            className="flex items-center justify-between p-4 border-b cursor-pointer"
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 flex items-center justify-center">
                <Bot className="text-white" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-sm">Assistant TunisiaEssence</h3>
                {!isMinimized && <p className="text-xs text-muted-foreground">Posez vos questions</p>}
              </div>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={minimizeChat}
              >
                {isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 ml-1" 
                onClick={closeChat}
              >
                <X size={14} />
              </Button>
            </div>
          </div>

          {/* Chat messages */}
          {!isMinimized && (
            <div className="flex flex-col h-[calc(100%-120px)] overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[80%] rounded-lg p-3 
                        ${msg.sender === 'user' 
                          ? 'bg-burgundy-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                        }
                      `}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t">
                <div className="relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre message..."
                    className="pr-10"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    disabled={!message.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
