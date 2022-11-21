import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
    appId: process.env.PUSHER_SERVER_APP_ID!,
    key: process.env.PUSHER_SERVER_KEY!,
    secret: process.env.PUSHER_SERVER_SECRET!,
    cluster: process.env.PUSHER_SERVER_CLUSTER!,
    useTLS: true
})

export const clientPusher = new ClientPusher(
    process.env.NEXT_PUBLIC_PUSHER_CLIENT_APP_KEY!,
    {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLIENT_CLUSTER!,
        forceTLS: true,
    }
);