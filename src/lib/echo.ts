import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

const token = localStorage.getItem("bike_mechanic_token");

const echo = new Echo({
    broadcaster: "reverb",

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: 80,
    wssPort: 443,

    forceTLS: true,
    enabledTransports: ["ws", "wss"],

    authEndpoint: "https://bike-mechanic-api.onrender.com/broadcasting/auth",

    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    },
});

export default echo;
