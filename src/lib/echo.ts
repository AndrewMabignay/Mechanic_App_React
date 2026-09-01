import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "reverb",

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),

    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),

    forceTLS: false,

    enabledTransports: ["ws", "wss"],

    authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",

    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(
                "bike_mechanic_token",
            )}`,
            Accept: "application/json",
        },
    },
});

export default echo;