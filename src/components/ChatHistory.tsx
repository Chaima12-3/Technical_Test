import { useChat } from "./ChatContext";
import { useEffect, useState } from "react";

export default function ChatHistory() {
  const { messages, setMessages, sessionId, setSessionId } = useChat();
  const [sessions, setSessions] = useState<string[]>([]);

  // Fetch all previous chat sessions from the backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:8000/sessions");
        if (!response.ok) throw new Error("Failed to fetch sessions");
        const data = await response.json();
        setSessions(data.sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  // Ensure new conversations are added to history
  useEffect(() => {
    if (sessionId && !sessions.includes(sessionId)) {
      setSessions((prev) => [...prev, sessionId]);
    }
  }, [sessionId, messages]);

  // Load an existing session and continue the chat
  const loadSession = async (sessionId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/chat/${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch chat history");
  
      const data = await response.json();
  
      // Ensure messages are correctly formatted
      if (Array.isArray(data)) {
        setMessages(data.map((content: string) => ({ role: "user", content })));
      } else {
        console.error("Invalid message format:", data);
      }
  
      setSessionId(sessionId);
    } catch (error) {
      console.error("Error loading session:", error);
    }
  };
  
  

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Chat History</h2>
      {sessions.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        sessions.map((id, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg my-2 bg-gray-100 cursor-pointer hover:bg-gray-200`}
            onClick={() => loadSession(id)}
          >
            <p>Session {index + 1}</p>
          </div>
        ))
      )}
    </div>
  );
}
