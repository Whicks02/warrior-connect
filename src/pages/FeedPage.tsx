import React from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const FeedPage: React.FC = () => {
  // Removed hardcoded posts. In a real app, this data would come from a backend.
  const posts: any[] = []; // Now an empty array

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {posts.length === 0 ? (
        <div className="text-center text-white text-lg mt-10">
          No posts to display. Start following people or create your first post!
        </div>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg">
            <CardHeader className="flex flex-row items-center p-4 space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.avatar} alt={`@${post.username}`} />
                <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-lg">{post.username}</span>
            </CardHeader>
            <CardContent className="p-0">
              <img src={post.imageUrl} alt="Post" className="w-full h-auto object-cover" />
            </CardContent>
            <CardFooter className="p-4">
              <div className="flex items-center space-x-4 mb-2">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-red-500">
                  <Heart size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-blue-500">
                  <MessageCircle size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-green-500">
                  <Send size={24} />
                </Button>
              </div>
              <p className="font-semibold mb-1">{post.likes} likes</p>
              <p className="text-sm mb-2">
                <span className="font-semibold">{post.username}</span> {post.caption}
              </p>
              <p className="text-sm text-gray-500">View all {post.comments} comments</p>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default FeedPage;