"use client";

import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import fetcher from "../utils/fetchMessages";
import { Message } from "../types";
import { uploadMessageToUpstash } from "../utils/uptash";
import { useSession } from "next-auth/react";

const ChatInput = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/messages", fetcher);

  async function addMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;
    const id = uuidv4();
    setInput("");

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      avatar: session?.user?.image!,
      email: session?.user?.email!,
    };

    const newMessage = await uploadMessageToUpstash(message);

    mutate([newMessage, ...messages!], {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  }

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100"
    >
      <input
        type="text"
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none 
            focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 
            disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
            rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
