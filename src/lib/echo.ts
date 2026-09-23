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
    wsPort: 80,
    wssPort: 443,

    forceTLS: true,
    enabledTransports: ["ws", "wss"],

    authorizer: (channel) => {
        return {
            authorize: async (socketId, callback) => {
                const token = localStorage.getItem("bike_mechanic_token");

                try {
                    const response = await fetch(
                        "https://bike-mechanic-api.onrender.com/broadcasting/auth",
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                socket_id: socketId,
                                channel_name: channel.name,
                            }),
                        },
                    );

                    const responseText = await response.text();

                    console.log("[Reverb] Auth status:", response.status);

                    console.log("[Reverb] Auth response:", responseText);

                    if (!response.ok) {
                        throw new Error(
                            `Broadcast authorization failed: ${response.status}`,
                        );
                    }

                    const data = responseText ? JSON.parse(responseText) : null;

                    if (!data) {
                        throw new Error(
                            "Broadcast authorization returned an empty response.",
                        );
                    }

                    callback(null, data);
                } catch (error) {
                    console.error("[Reverb] Authorization error:", error);

                    const authError =
                        error instanceof Error
                            ? error
                            : new Error("Broadcast authorization failed.");

                    callback(authError, null);
                }
            },
        };
    },
});

export default echo;
