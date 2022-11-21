import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import { Message } from "../types";

const HomePage = async () => {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/messages`
  ).then((res) => res.json());
  const messages: Message[] = data.messages;

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  );
};

export default HomePage;
