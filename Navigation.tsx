import { Home, Search, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "الرئيسية" },
    { path: "/explore", icon: Search, label: "استكشاف" },
    { path: "/chat", icon: MessageCircle, label: "شات" },
    { path: "/profile", icon: User, label: "ملفي" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
      <div className="container mx-auto max-w-lg">
        {/* Logo at the top of navigation */}
        {location.pathname !== "/" && location.pathname !== "/explore" && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="خرجوني" className="w-16 h-16" />
          </div>
        )}
        <div className="flex justify-around items-center py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all",
                  isActive 
                    ? "text-primary scale-110" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6",
                  isActive && "animate-scale-in"
                )} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
