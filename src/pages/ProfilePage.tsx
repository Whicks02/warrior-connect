import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid3X3, Bookmark, User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  // Removed hardcoded user data. In a real app, this data would come from a backend.
  const user = {
    username: 'current_user',
    fullName: 'Your Name',
    bio: 'This is your profile. Update it!',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CU', // Placeholder avatar
    posts: 0,
    followers: 0,
    following: 0,
  };

  // Removed hardcoded user posts. In a real app, this data would come from a backend.
  const userPosts: string[] = []; // Now an empty array

  return (
    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-8 mb-8">
        <Avatar className="h-28 w-28 border-4 border-royal-blue">
          <AvatarImage src={user.avatar} alt={`@${user.username}`} />
          <AvatarFallback className="text-5xl bg-royal-blue text-white">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h2 className="text-3xl font-semibold">{user.username}</h2>
            <Button className="bg-royal-blue hover:bg-royal-blue/90 text-white">Edit Profile</Button>
          </div>
          <div className="flex space-x-8 mb-4">
            <p className="text-lg"><span className="font-bold">{user.posts}</span> posts</p>
            <p className="text-lg"><span className="font-bold">{user.followers}</span> followers</p>
            <p className="text-lg"><span className="font-bold">{user.following}</span> following</p>
          </div>
          <p className="font-semibold">{user.fullName}</p>
          <p className="text-sm">{user.bio}</p>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="border-t border-gray-300 flex justify-center space-x-12 py-4">
        <Button variant="ghost" className="flex items-center space-x-2 text-royal-blue border-b-2 border-royal-blue rounded-none">
          <Grid3X3 size={20} />
          <span>POSTS</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-royal-blue">
          <Bookmark size={20} />
          <span>SAVED</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-royal-blue">
          <User size={20} />
          <span>TAGGED</span>
        </Button>
      </div>

      {/* User Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-4">
        {userPosts.length === 0 ? (
          <div className="col-span-3 text-center text-gray-600 text-lg mt-4">
            No posts yet. Share your moments!
          </div>
        ) : (
          userPosts.map((src, index) => (
            <img key={index} src={src} alt={`User post ${index + 1}`} className="w-full h-auto object-cover aspect-square" />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;