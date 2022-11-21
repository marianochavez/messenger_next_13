import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { Message } from '../../types';

type Data = {
    message: Message;
}

type ErrorData = {
    error: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) {
    switch (req.method) {
        case 'POST':
            return addMessage(req, res);

        default:
            res.status(405).json({ error: "Method Not Allowed" })
    }
}

async function addMessage(req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) {
    const { message } = req.body as { message: Message };


    const newMessage: Message = {
        ...message,
        // Replace the timestamp of the user to the timestamp of the server
        created_at: Date.now(),
    }

    // push to redis
    await redis.hset('messages', message.id, JSON.stringify(newMessage))

    res.status(200).json({ message: newMessage })
}