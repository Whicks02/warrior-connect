import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/'); // Redirect to home if authenticated
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-royal-blue to-sunshine-yellow">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-royal-blue">Warrior Connect</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--royal-blue))',
                    brandAccent: 'hsl(var(--sunshine-yellow))',
                  },
                },
              },
            }}
            theme="light"
            providers={[]} // You can add 'google', 'github' etc. here if needed
            redirectTo={window.location.origin} // Redirects to the app's root after auth
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;