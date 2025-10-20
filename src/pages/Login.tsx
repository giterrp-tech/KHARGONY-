import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import loginBg from '@/assets/login-bg.png';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithApple,
} from '@/lib/firebaseAuth';

const Login = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('من فضلك املأ جميع الحقول');
      return;
    }

    if (mode === 'register' && !displayName) {
      toast.error('من فضلك أدخل اسمك');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await signInWithEmail(email, password);
        if (result.success) {
          toast.success('تم تسجيل الدخول بنجاح!');
          navigate('/');
        } else {
          toast.error(result.error || 'فشل تسجيل الدخول');
        }
      } else {
        const result = await signUpWithEmail(email, password, displayName);
        if (result.success) {
          toast.success('تم إنشاء الحساب بنجاح!');
          navigate('/');
        } else {
          toast.error(result.error || 'فشل إنشاء الحساب');
        }
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        toast.success('تم تسجيل الدخول عبر Google!');
        navigate('/');
      } else {
        toast.error(result.error || 'فشل تسجيل الدخول');
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithApple();
      if (result.success) {
        toast.success('تم تسجيل الدخول عبر Apple!');
        navigate('/');
      } else {
        toast.error(result.error || 'فشل تسجيل الدخول');
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 pt-12 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="w-full max-w-lg p-10 animate-scale-in relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-cairo">
            {mode === 'login' ? 'أهلاً بعودتك' : 'حساب جديد'}
          </h1>
          <p className="text-white/90 drop-shadow-md text-sm font-cairo">
            {mode === 'login' 
              ? 'استمر في رحلة الاستكشاف واكتشف المزيد' 
              : 'أنشئ حساب جديد وابدأ رحلتك معنا'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="relative">
              <User className="absolute right-3 top-3 w-5 h-5 text-white/70" />
              <Input
                type="text"
                placeholder="الاسم"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute right-3 top-3 w-5 h-5 text-white/70" />
            <Input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-3 top-3 w-5 h-5 text-white/70" />
            <Input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-white/10 border-2 border-white/40 text-white hover:bg-white/20"
            disabled={loading}
          >
            {loading ? 'جاري التحميل...' : (mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب')}
          </Button>
        </form>

        <div className="my-6 text-center text-sm text-white/70 drop-shadow-md">
          أو
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5 ml-2"
            />
            {mode === 'login' ? 'تسجيل الدخول' : 'التسجيل'} بـ Google
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={() => handleAppleLogin()}
            disabled={loading}
          >
            <User className="w-5 h-5 ml-2 fill-white" />
            {mode === 'login' ? 'تسجيل الدخول' : 'التسجيل'} بـ Apple
          </Button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-white hover:underline font-medium drop-shadow-md"
          >
            {mode === 'login' 
              ? 'ليس لديك حساب؟ سجل الآن' 
              : 'لديك حساب بالفعل؟ سجل دخول'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
