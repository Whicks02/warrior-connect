import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here (e.g., API call to a backend)
    // For now, we'll just navigate to the feed page
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-royal-blue">Warrior Connect</CardTitle>
          <CardDescription className="text-gray-600">Log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username or Email</Label>
              <Input id="username" type="text" placeholder="Enter your username or email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="w-full bg-royal-blue hover:bg-royal-blue/90 text-white">
              Login
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-royal-blue hover:underline">Sign Up</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;