import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import PlaceDetail from "./pages/PlaceDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/splash" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<><Home /><Navigation /></>} />
          <Route path="/explore" element={<><Explore /><Navigation /></>} />
          <Route path="/chat" element={<><Chat /><Navigation /></>} />
          <Route path="/profile" element={<><Profile /><Navigation /></>} />
          <Route path="/favorites" element={<><Favorites /><Navigation /></>} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
