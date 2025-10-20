import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, MapPin, Target, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import egyptianBg from "@/assets/egyptian-bg.png";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const userData = {
    name: "مستخدم خرجوني",
    points: 450,
    level: 5,
    visits: 12,
    achievements: [
      { id: 1, name: "مستكشف القاهرة", icon: "🗺️", unlocked: true },
      { id: 2, name: "محب الثقافة", icon: "🏛️", unlocked: true },
      { id: 3, name: "مغامر", icon: "🎢", unlocked: true },
      { id: 4, name: "خبير الطعام", icon: "🍽️", unlocked: false },
      { id: 5, name: "ملك التسوق", icon: "🛍️", unlocked: false },
      { id: 6, name: "عاشق الطبيعة", icon: "🌳", unlocked: false },
    ]
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${egyptianBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-egyptian rounded-full mb-4 shadow-gold">
            <Trophy className="w-16 h-16 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
          <p className="text-xl text-muted-foreground">المستوى {userData.level} 🎯</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <Star className="w-10 h-10 mx-auto mb-3 text-primary fill-primary" />
            <div className="text-3xl font-bold text-foreground mb-1">{userData.points}</div>
            <div className="text-sm text-muted-foreground">نقطة</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <MapPin className="w-10 h-10 mx-auto mb-3 text-secondary" />
            <div className="text-3xl font-bold text-foreground mb-1">{userData.visits}</div>
            <div className="text-sm text-muted-foreground">خروجة</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-accent" />
            <div className="text-3xl font-bold text-foreground mb-1">{userData.level}</div>
            <div className="text-sm text-muted-foreground">المستوى</div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">التقدم للمستوى التالي</span>
            <span className="text-sm text-muted-foreground">450 / 500 نقطة</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-egyptian transition-all duration-500"
              style={{ width: `${(450/500) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            باقي 50 نقطة للوصول للمستوى 6! 🎉
          </p>
        </Card>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            الإنجازات
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userData.achievements.map((achievement) => (
              <Card 
                key={achievement.id}
                className={`p-6 text-center transition-all ${
                  achievement.unlocked 
                    ? 'bg-gradient-egyptian shadow-gold hover:scale-105' 
                    : 'bg-muted opacity-50'
                }`}
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <div className="font-semibold text-sm">{achievement.name}</div>
                {achievement.unlocked && (
                  <div className="text-xs text-muted-foreground mt-2">✓ مفتوح</div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate("/")}
          >
            ابدأ خروجة جديدة
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/favorites")}
          >
            المفضلة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
