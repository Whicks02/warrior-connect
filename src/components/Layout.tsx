import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageSquare, User } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-royal-blue to-sunshine-yellow text-white">
      {/* Header/Navbar */}
      <header className="w-full p-4 flex justify-between items-center bg-royal-blue/80 backdrop-blur-sm shadow-md z-10">
        <h1 className="text-2xl font-bold">Warrior Connect</h1>
        <nav className="flex space-x-6">
          <Link to="/" className="flex flex-col items-center text-sm hover:text-yellow-300 transition-colors">
            <Home size={20} />
            <span>Feed</span>
          </Link>
          <Link to="/messages" className="flex flex-col items-center text-sm hover:text-yellow-300 transition-colors">
            <MessageSquare size={20} />
            <span>Messages</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-sm hover:text-yellow-300 transition-colors">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-white/70">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;