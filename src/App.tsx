import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Admin components
import AdminLayout from "./components/admin/AdminLayout";
import DashboardOverview from "./pages/admin/DashboardOverview";
import ContentManager from "./pages/admin/ContentManager";
import ImageManager from "./pages/admin/ImageManager";
import ScheduleManager from "./pages/admin/ScheduleManager";
import PricingManager from "./pages/admin/PricingManager";
import AchievementsManager from "./pages/admin/AchievementsManager";
import GalleryManager from "./pages/admin/GalleryManager";
import VideoManager from "./pages/admin/VideoManager";
import SiteSettings from "./pages/admin/SiteSettings";
import ContactSettings from "./pages/admin/ContactSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="images" element={<ImageManager />} />
              <Route path="schedule" element={<ScheduleManager />} />
              <Route path="pricing" element={<PricingManager />} />
              <Route path="achievements" element={<AchievementsManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="videos" element={<VideoManager />} />
              <Route path="settings" element={<SiteSettings />} />
              <Route path="contact" element={<ContactSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;