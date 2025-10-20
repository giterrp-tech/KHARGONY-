import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AIRecommendationProps {
  mood?: string;
}

export const AIRecommendation = ({ mood = 'رومانسي' }: AIRecommendationProps) => {
  const navigate = useNavigate();

  const recommendations: Record<string, string> = {
    'رومانسي': 'بما إن المود بتاعك النهارده رومانسي 😍، أرشحلك كافيه على النيل وقت الغروب 🌅',
    'مغامرة': 'نفسك في شوية أدرينالين؟ روح دريم بارك وجرب الأفعوانيات! 🎢',
    'ثقافي': 'خليك مثقف واكتشف تاريخ مصر في المتحف المصري 🏛️',
    'عائلي': 'وقت عائلي جميل في حديقة الأزهر مع نشاطات للأطفال 👨‍👩‍👧‍👦',
    'default': 'بناءً على تفضيلاتك، أنصحك بزيارة خان الخليلي للتسوق والأكل المصري الأصيل 🛍️'
  };

  const recommendation = recommendations[mood] || recommendations.default;

  return (
    <Card className="p-6 bg-gradient-egyptian border-primary/30 shadow-gold animate-glow">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary-glow/20 rounded-full">
          <Sparkles className="w-6 h-6 text-foreground" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 text-foreground">
            اقتراح ذكي من الـ AI ✨
          </h3>
          <p className="text-foreground/90 mb-4 leading-relaxed">
            {recommendation}
          </p>
          <Button 
            variant="accent" 
            size="sm"
            onClick={() => navigate('/chat')}
          >
            اسأل المساعد الذكي
          </Button>
        </div>
      </div>
    </Card>
  );
};
