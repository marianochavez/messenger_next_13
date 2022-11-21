"use client";

import { useEffect } from "react";
import useSWR from "swr";

import { clientPusher } from "../pusher";
import { Message as MessageType } from "../types";
import fetcher from "../utils/fetchMessages";
import Message from "./Message";

type Props = {
  initialMessages: MessageType[];
}

const MessageList = ({initialMessages}:Props) => {
  const { data: messages, error, mutate } = useSWR("/api/messages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: MessageType) => {
      // if you sent the message, no need to update cache
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
