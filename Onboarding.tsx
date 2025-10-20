import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import onboardingBg from '@/assets/onboarding-bg.png';
import logo from '@/assets/logo.png';

const slides = [
  {
    emoji: '🏖️',
    title: 'اختار مكانك بسهولة',
    description: 'اكتشف آلاف الأماكن الرائعة في مصر بضغطة زر واحدة'
  },
  {
    emoji: '💸',
    title: 'وفّر وقتك وفلوسك',
    description: 'اعرف الأسعار والمسافات قبل ما تخرج من البيت'
  },
  {
    emoji: '🎭',
    title: 'خروجتك تناسب مزاجك',
    description: 'اقتراحات ذكية على حسب مزاجك وميزانيتك'
  }
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${onboardingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Skip button */}
        <div className="p-4 flex justify-end">
          <Button variant="ghost" onClick={handleSkip} className="text-white hover:bg-white/20">
            تخطي
          </Button>
        </div>

        {/* Slides */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <div className="text-center animate-fade-in max-w-md">
            <div className="mb-8 animate-float">
              <img src={logo} alt="خرجوني" className="w-24 h-24 mx-auto" />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
              {slides[currentSlide].title}
            </h2>

            <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

      {/* Dots indicator */}
      <div className="flex gap-2 justify-center mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>

        {/* Navigation buttons */}
        <div className="p-6 flex gap-4">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentSlide(currentSlide - 1)}
              className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-5 h-5" />
              السابق
            </Button>
          )}

          <Button
            variant="default"
            size="lg"
            onClick={handleNext}
            className="flex-1"
          >
            {currentSlide === slides.length - 1 ? 'ابدأ الآن' : 'التالي'}
            {currentSlide < slides.length - 1 && <ChevronLeft className="w-5 h-5 mr-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
