import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({ first_name: '', last_name: '', avatar_url: '' });
  const [newPassword, setNewPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error, status } = await supabase
          .from('profiles')
          .select(`first_name, last_name, avatar_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setProfile(data);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(event: React.FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const updates = {
          id: user.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
          throw error;
        }
        toast({
          title: "Profile updated!",
          description: "Your profile information has been saved.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(event: React.FormEvent) {
    event.preventDefault();
    if (!newPassword) {
      toast({
        title: "Password field is empty",
        description: "Please enter a new password.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        throw error;
      }
      setNewPassword('');
      toast({
        title: "Password updated!",
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error updating password",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-royal-blue">Profile Settings</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProfile} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-2 border-royal-blue">
                <AvatarImage src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.first_name || 'User'}`} alt="Avatar" />
                <AvatarFallback className="text-3xl bg-royal-blue text-white">
                  {(profile.first_name?.charAt(0) || '') + (profile.last_name?.charAt(0) || '')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  type="url"
                  value={profile.avatar_url || ''}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  placeholder="Enter avatar image URL"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                type="text"
                value={profile.first_name || ''}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                placeholder="Your first name"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                value={profile.last_name || ''}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                placeholder="Your last name"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full bg-royal-blue hover:bg-royal-blue/90 text-white" disabled={loading}>
              {loading ? 'Saving...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-royal-blue">Change Password</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={updatePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full bg-royal-blue hover:bg-royal-blue/90 text-white" disabled={loading}>
              {loading ? 'Updating...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-royal-blue">Account Actions</CardTitle>
          <CardDescription>Manage your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignOut} className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;