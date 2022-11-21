"use client";

import useSWR from "swr";

import fetcher from "../utils/fetchMessages";
import Message from "./Message";

const MessageList = () => {
  const { data: messages, error, mutate } = useSWR("/api/messages", fetcher);
  console.log(messages);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
