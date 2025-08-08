import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid3X3, Bookmark, User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const user = {
    username: 'warrior_student',
    fullName: 'Alex Johnson',
    bio: 'Student at Warrior High. Future engineer. 📚✏️',
    avatar: 'https://github.com/shadcn.png',
    posts: 12,
    followers: 345,
    following: 120,
  };

  const userPosts = [
    'https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Post+1',
    'https://via.placeholder.com/300x300/FFD700/000000?text=Post+2',
    'https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Post+3',
    'https://via.placeholder.com/300x300/FFD700/000000?text=Post+4',
    'https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Post+5',
    'https://via.placeholder.com/300x300/FFD700/000000?text=Post+6',
    'https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Post+7',
    'https://via.placeholder.com/300x300/FFD700/000000?text=Post+8',
    'https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Post+9',
  ];

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
        {userPosts.map((src, index) => (
          <img key={index} src={src} alt={`User post ${index + 1}`} className="w-full h-auto object-cover aspect-square" />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;