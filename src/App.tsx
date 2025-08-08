import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import AuthPage from "./pages/AuthPage"; // Import the new AuthPage
import SettingsPage from "./pages/SettingsPage"; // Import SettingsPage
import { supabase } from './integrations/supabase/client';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
      if (!session && window.location.pathname !== '/login') {
        navigate('/login');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session && window.location.pathname !== '/login') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
  }

  if (!session) {
    return null; // Will be redirected by useEffect
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/settings" element={<SettingsPage />} /> {/* New Settings route */}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} /> {/* Auth page route */}
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;