import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.png';
import onboardingBg from '@/assets/onboarding-bg.png';

const Splash = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Wait for auth state to load

    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

    const timer = setTimeout(() => {
      if (!hasSeenOnboarding) {
        navigate('/onboarding');
      } else if (!user) {
        navigate('/login');
      } else {
        navigate('/');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, user, loading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center animate-scale-in">
        <div className="mb-8">
          <img src={logo} alt="خرجوني" className="w-32 h-32 mx-auto" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg font-cairo">
          خرجوني
        </h1>

        <p className="text-2xl text-white/90 mb-8 drop-shadow-md font-cairo">
          اكتشف مصر بطريقتك 🇪🇬
        </p>

        {/* Loading animation */}
        <div className="flex gap-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Splash;
