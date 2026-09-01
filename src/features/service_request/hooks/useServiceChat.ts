import { useEffect, useState } from "react";

import echo from "../../../lib/echo";

import {
    getServiceMessages,
    sendServiceMessage,
} from "../api/serviceMessageApi";

import type { ServiceMessage } from "../types/serviceMessage";

export interface ChatMessage {
    id: string;
    message: string;
    sender: "cyclist" | "mechanic";
    created_at?: string;
}

interface ServiceMessageEvent {
    message: ServiceMessage;
}

export function useServiceChat(
    serviceRequestUuid?: string,
    currentUserId?: number,
) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

    /*
     * ============================================================
     * LOAD EXISTING MESSAGES
     * ============================================================
     */

    useEffect(() => {
        if (!serviceRequestUuid) {
            return;
        }

        let cancelled = false;

        const loadMessages = async () => {
            try {
                setIsLoading(true);

                const response =
                    await getServiceMessages(serviceRequestUuid);

                if (cancelled) {
                    return;
                }

                const formattedMessages: ChatMessage[] =
                    response.data.map((message) => ({
                        id: String(message.id),
                        message: message.message,
                        sender:
                            message.sender.id === currentUserId
                                ? "cyclist"
                                : "mechanic",
                        created_at: message.created_at,
                    }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error(
                    "Failed to load service messages:",
                    error,
                );
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadMessages();

        return () => {
            cancelled = true;
        };
    }, [serviceRequestUuid, currentUserId]);

    /*
     * ============================================================
     * REAL-TIME WEBSOCKET
     * ============================================================
     */

    useEffect(() => {
        if (!serviceRequestUuid) {
            return;
        }

        const channelName =
            `service-request.${serviceRequestUuid}`;

        console.log(
            "Connecting to WebSocket channel:",
            channelName,
        );

        echo
            .private(channelName)
            .listen(
                ".service.message.sent",
                (event: ServiceMessageEvent) => {
                    console.log(
                        "Received WebSocket message:",
                        event,
                    );

                    const incomingMessage = event.message;

                    const newMessage: ChatMessage = {
                        id: String(incomingMessage.id),
                        message: incomingMessage.message,
                        sender:
                            incomingMessage.sender.id === currentUserId
                                ? "cyclist"
                                : "mechanic",
                        created_at:
                            incomingMessage.created_at,
                    };

                    setMessages((previousMessages) => {
                        /*
                         * Prevent duplicate messages.
                         */
                        const alreadyExists =
                            previousMessages.some(
                                (message) =>
                                    message.id === newMessage.id,
                            );

                        if (alreadyExists) {
                            return previousMessages;
                        }

                        return [
                            ...previousMessages,
                            newMessage,
                        ];
                    });
                },
            );

        return () => {
            console.log(
                "Leaving WebSocket channel:",
                channelName,
            );

            echo.leave(channelName);
        };
    }, [serviceRequestUuid, currentUserId]);

    /*
     * ============================================================
     * SEND MESSAGE
     * ============================================================
     */

    const sendMessage = async (message: string) => {
        if (!serviceRequestUuid || !message.trim()) {
            return;
        }

        try {
            setIsSending(true);

            await sendServiceMessage(
                serviceRequestUuid,
                message.trim(),
            );

            /*
             * Do NOT manually add the message here.
             *
             * Laravel broadcast will send it through Reverb,
             * and the WebSocket listener above will add it.
             */
        } catch (error) {
            console.error(
                "Failed to send service message:",
                error,
            );

            throw error;
        } finally {
            setIsSending(false);
        }
    };

    return {
        messages,
        setMessages,
        sendMessage,
        isLoading,
        isSending,
    };
}