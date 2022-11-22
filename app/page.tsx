import { unstable_getServerSession } from "next-auth/next";

import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";
import { Message } from "../types";
import { Providers } from "./providers";

const HomePage = async () => {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/messages`
  ).then((res) => res.json());
  const messages: Message[] = data.messages;

  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput/>
      </main>
    </Providers>
  );
};

export default HomePage;
