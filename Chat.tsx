import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/types';
import egyptianBg from '@/assets/egyptian-bg.png';

const quickSuggestions = [
  'رومانسي 😍',
  'مغامرة ⛰️',
  'عائلي 👨‍👩‍👧‍👦',
  'ميزانية منخفضة 💰',
  'طقس حلو اليوم ☀️',
  'قريب مني 📍'
];

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'أهلاً! أنا مساعدك الذكي في خرجوني 🎯\n\nقولي عايز تروح فين أو إيه المود بتاعك النهاردة، وأنا هساعدك تلاقي أحسن مكان! ✨',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'رومانسي': 'طقس رومانسي اليوم! 😍\n\nأرشحلك:\n\n🌅 كافيه على النيل في المعادي\n⛵ رحلة مركب نيلي وقت الغروب\n🌃 مطعم على السطح في الزمالك\n\nكلهم أماكن رومانسية جداً ومناسبة للأجواء! ✨',
        'مغامرة': 'حابب أدرينالين؟ 🎢\n\nجرب:\n\n⛰️ دريم بارك - ألعاب مثيرة\n🏃 كارتينج في 6 أكتوبر\n🧗 تسلق الجبال في سيناء\n\nمغامرات لا تنسى في انتظارك!',
        'عائلي': 'وقت عائلي ممتع! 👨‍👩‍👧‍👦\n\nروح:\n\n🌳 حديقة الأزهر - للنزهات\n🏊 أكوا بارك - مدينة ألعاب مائية\n🎪 كيدزانيا - للأطفال\n\nكلها أماكن آمنة ومسلية للعيلة كلها!',
        'default': `فهمت! ${messageText}\n\nبناءً على طلبك، أرشحلك:\n\n📍 المتحف المصري - ثقافي ومميز\n🛍️ خان الخليلي - تسوق وأكل\n🌳 حديقة الأزهر - طبيعة وهدوء\n\nعايز تفاصيل أكتر عن أي مكان؟ 😊`
      };

      const responseKey = Object.keys(responses).find(key => 
        messageText.toLowerCase().includes(key.toLowerCase())
      ) || 'default';

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[responseKey],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background relative">
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: `url(${egyptianBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Header */}
      <div className="bg-gradient-egyptian p-4 shadow-gold relative z-10">
        <div className="container mx-auto max-w-4xl flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-foreground" />
          <div>
            <h1 className="text-xl font-bold text-foreground">المساعد الذكي</h1>
            <p className="text-sm text-foreground/80">متاح الآن للمساعدة</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-32 relative z-10">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === 'user'
                    ? 'bg-muted'
                    : 'bg-gradient-egyptian text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString('ar-EG', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-end">
              <Card className="bg-gradient-egyptian text-foreground p-4">
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="border-t bg-background p-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2 overflow-x-auto pb-3 hide-scrollbar">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSend(suggestion)}
                className="whitespace-nowrap"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4 relative z-10">
        <div className="container mx-auto max-w-4xl flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب رسالتك..."
            className="flex-1"
          />
          <Button 
            onClick={() => handleSend()}
            variant="hero"
            size="icon"
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
