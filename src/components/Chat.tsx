import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { useChat } from "./ChatContext";
import { Button } from "./ui/button";
import { Input } from "../../components/ui/input";

export default function Chat() {
  const { messages, setMessages, sessionId, setSessionId } = useChat();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Generate session ID if not set
    if (!sessionId) {
      const newSessionId = crypto.randomUUID();
      setSessionId(newSessionId);
    }

    // Connect WebSocket
    ws.current = new WebSocket(`ws://localhost:8000/ws/${sessionId}`);

    ws.current.onmessage = async (event) => {
      const token = event.data;
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === "assistant") {
          return [...prev.slice(0, -1), { role: "assistant", content: lastMessage.content + token }];
        } else {
          return [...prev, { role: "assistant", content: token }];
        }
      });
      setIsLoading(false);
    };

    ws.current.onopen = () => console.log("WebSocket connected");

    ws.current.onclose = () => setIsLoading(false);

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsLoading(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [sessionId, setMessages, setSessionId]);

  useEffect(() => {
    if (sessionId && !sessions.includes(sessionId)) {
      setSessions((prev) => [...prev, sessionId]);
    }
  }, [sessionId, messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !ws.current || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    ws.current.send(input);
    setInput("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Chat with AI</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-4 rounded-lg ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {isLoading && <p className="text-gray-500">AI is typing...</p>}
          <div className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Type a message..." />
            <Button className="flex gap-2" onClick={handleSendMessage} disabled={isLoading}>Send</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
