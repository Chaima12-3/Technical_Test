"use client";

import Chat from "@/components/Chat";
import ChatHistory from "@/components/ChatHistory";
import ThemeToggle from "@/components/ModeToggle";
import { ChatProvider } from "@/components/ChatContext";

export default function Page() {
  return (
    <ChatProvider>
      <div className="flex h-screen">
       
        <div
          className="w-1/4 p-4 border-r border-gray-200 bg-gray-100 dark:bg-white"
        >
          <ThemeToggle />
          <ChatHistory />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            {/* Optional: Add a header or other components here */}
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <Chat />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}