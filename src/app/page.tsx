"use client";

import Chat from "@/components/Chat";
import ChatHistory from "@/components/ChatHistory";
import ThemeToggle from "@/components/ModeToggle";
import { ChatProvider } from "@/components/ChatContext";
import { Button } from "../components/ui/button";

export default function Page() {
  // Function to refresh the page
  const handleRefresh = () => {
    window.location.reload(); // This will reload the current page
  };

  return (
    <ChatProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r border-gray-200 bg-gray-100 dark:bg-white">
          <ThemeToggle />
          <ChatHistory />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chat Session</h2>
            <Button
              onClick={handleRefresh}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              New Session
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <Chat />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
