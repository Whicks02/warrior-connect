import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const chats = [
    {
      id: '1',
      username: 'classmate_1',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=C1',
      lastMessage: 'Hey, did you get the homework done?',
      time: '2h ago',
    },
    {
      id: '2',
      username: 'teacher_smith',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TS',
      lastMessage: 'Reminder: Project due next week.',
      time: 'Yesterday',
    },
    {
      id: '3',
      username: 'sports_team',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ST',
      lastMessage: 'Practice is cancelled today.',
      time: '3 days ago',
    },
    {
      id: '4',
      username: 'principal_jones',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PJ',
      lastMessage: 'Meeting at 3 PM.',
      time: '1 week ago',
    },
  ];

  const currentChatMessages = [
    { id: 'm1', sender: 'classmate_1', text: 'Hey, did you get the homework done?', isMe: false },
    { id: 'm2', sender: 'me', text: 'Not yet, still working on it. Need help?', isMe: true },
    { id: 'm3', sender: 'classmate_1', text: 'Yeah, I\'m stuck on question 5.', isMe: false },
    { id: 'm4', sender: 'me', text: 'No problem, I can help you after school today.', isMe: true },
    { id: 'm5', sender: 'classmate_1', text: 'Awesome, thanks!', isMe: false },
  ];

  return (
    <div className="flex h-[calc(100vh-120px)] max-w-4xl mx-auto bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <Input placeholder="Search messages" className="pl-10" />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={chat.avatar} alt={`@${chat.username}`} />
                <AvatarFallback>{chat.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{chat.username}</p>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chats[0].avatar} alt={`@${chats[0].username}`} />
            <AvatarFallback>{chats[0].username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">{chats[0].username}</span>
        </div>
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {currentChatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${message.isMe ? 'bg-royal-blue text-white' : 'bg-gray-200 text-gray-800'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
          <Input placeholder="Type a message..." className="flex-grow" />
          <Button size="icon" className="bg-royal-blue hover:bg-royal-blue/90 text-white">
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;