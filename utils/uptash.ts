import { Message } from "../types";

export const uploadMessageToUpstash = async (message: Message): Promise<Message> => {
    const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
        }),
    });

    const {messages} = await res.json();

    return messages;
};