This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Chat.trx
This Chat component is a React-based chat interface that enables real-time communication with an AI via WebSocket. It manages chat sessions, user input, message history, and WebSocket interactions.
Functionality Overview:
WebSocket Connection:
When the component mounts, it generates a new session ID (if not already set) and establishes a WebSocket connection with the server at ws://localhost:8000/ws/{sessionId}.
It listens for incoming messages and updates the chat history accordingly.
Handles WebSocket events (onopen, onmessage, onclose, onerror) to manage connection status and errors.
Message Handling:
Messages are stored in the messages state, with each message having a role (user or assistant) and content.
When a user sends a message, it is added to the chat and sent to the WebSocket server.
The AI's response is streamed back and dynamically updated in the last message.
Session Management:
Keeps track of chat sessions in sessions state.
Ensures that a new session ID is added to history when created.
UI Components:
Card Layout: Uses a Card component to wrap the chat interface.
Message Display: Messages are styled differently based on the sender (user messages in blue, AI responses in gray).
Input Field & Button: Users can type messages and send them via a button or by pressing Enter.

## ChatHistory.tsx
ChatHistory, is responsible for displaying and managing the history of chat sessions in a chat application. It uses the useChat context to access and update the current chat messages and session ID.

Functionality Overview:
Fetching Previous Chat Sessions:
On initial render (useEffect with an empty dependency array), the component fetches a list of past chat session IDs from http://localhost:8000/sessions and stores them in the sessions state.
Updating the Session List:
Whenever a new session is created (sessionId changes and isn't already in the sessions list), it's added dynamically to the session history.
Loading a Previous Session:
when a user clicks on a session in the history, loadSession(sessionId) fetches the messages for that session from http://localhost:8000/chat/{sessionId} and updates the chat messages.
It ensures the fetched data is in an array format before updating the chat state.
Rendering the Session List:
If no sessions are available, it displays a message: "No chat history available."
Otherwise, it renders a clickable list of past sessions, each styled with a background color that changes on hover.

UI Behavior:
Displays chat history as a list of clickable session entries.
Clicking on a session loads the past chat messages into the current chat window.

## ChatContext.tsx
This ChatContext module sets up a React context for managing chat-related state in an AI chat application. It provides a global state for storing messages and session information, making it accessible across components.

Functionality Overview:
Message Structure (Message Interface)
Each message has:
role: "user" or "assistant" (indicating who sent the message).
content: The actual message text.
Context Type (ChatContextType Interface)

Defines the context structure:
messages: Stores an array of chat messages.
setMessages: Function to update messages.
sessionId: Stores the session ID.
setSessionId: Function to update the session ID.
Context Creation (ChatContext)
Uses createContext to provide a global chat state.
Initially undefined to enforce usage within a provider.
Custom Hook (useChat)
Provides a way to access the context.
Throws an error if used outside of ChatProvider, ensuring proper usage.
Provider Component (ChatProvider)
Maintains messages and sessionId state.
Wraps the application, providing chat-related data and functions.
