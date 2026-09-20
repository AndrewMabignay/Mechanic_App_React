import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Wrench } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";

interface ChatMessage {
    id: string;
    message: string;
    sender: "cyclist" | "mechanic";
    created_at?: string;
}

interface CyclistMechanicChatDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    otherUserName?: string;
    messages?: ChatMessage[];
    onSendMessage?: (message: string) => Promise<void> | void;
    isSending?: boolean;
    currentUserRole: "cyclist" | "mechanic";
}

export default function CyclistMechanicChatDialog({
    open,
    onOpenChange,
    otherUserName = "User",
    messages = [],
    onSendMessage,
    isSending = false,
    currentUserRole,
}: CyclistMechanicChatDialogProps) {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const handleSend = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || isSending) {
            return;
        }

        try {
            await onSendMessage?.(trimmedMessage);
            setMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            void handleSend();
        }
    };

    const formatDateTime = (date: string) => {
        const parsedDate = new Date(
            date.includes("T") ? date : date.replace(" ", "T"),
        );

        return parsedDate.toLocaleString("en-PH", {
            timeZone: "Asia/Manila",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    flex
                    h-[80vh]
                    w-[calc(100%-2rem)]
                    max-w-md
                    flex-col
                    gap-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-0
                    shadow-sm
                    data-[state=open]:animate-in
                    data-[state=closed]:animate-out
                    data-[state=open]:fade-in-0
                    data-[state=closed]:fade-out-0
                    data-[state=open]:zoom-in-95
                    data-[state=closed]:zoom-out-95
                    data-[state=open]:slide-in-from-bottom-2
                    data-[state=closed]:slide-out-to-bottom-2
                    duration-300
                    ease-out
                "
                showCloseButton={false}
            >
                {/* Header */}
                <DialogHeader className="border-b border-gray-100 px-4 py-4">
                    <div className="flex items-center gap-3">
                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                text-gray-500
                                transition-all
                                duration-200
                                hover:bg-gray-100
                                hover:text-gray-700
                                active:scale-95
                            "
                            aria-label="Close chat"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        {/* Mechanic Icon */}
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#fc4c02]/10
                            "
                        >
                            <Wrench className="h-5 w-5 text-[#fc4c02]" />
                        </div>

                        {/* User Info */}
                        <div className="min-w-0">
                            <DialogTitle className="truncate text-base font-semibold text-gray-900">
                                {otherUserName}
                            </DialogTitle>

                            <p className="text-xs font-medium text-[#fc4c02]">
                                En Route
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
                    {messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <div
                                    className="
                                        mx-auto
                                        mb-3
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#fc4c02]/10
                                    "
                                >
                                    <Wrench className="h-6 w-6 text-[#fc4c02]" />
                                </div>

                                <p className="font-medium text-gray-700">
                                    Start a conversation
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    Send a message to your mechanic.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((chatMessage) => {
                                const isMine =
                                    chatMessage.sender === currentUserRole;

                                return (
                                    <div
                                        key={chatMessage.id}
                                        className={`flex ${
                                            isMine
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`
                                                max-w-[80%]
                                                rounded-2xl
                                                px-4
                                                py-2.5
                                                text-sm
                                                transition-all
                                                duration-200
                                                ${
                                                    isMine
                                                        ? "rounded-br-md bg-[#fc4c02] text-white"
                                                        : "rounded-bl-md border border-gray-100 bg-white text-gray-800 shadow-sm"
                                                }
                                            `}
                                        >
                                            <p className="break-words">
                                                {chatMessage.message}
                                            </p>

                                            {chatMessage.created_at && (
                                                <p
                                                    className={`
                                                        mt-1
                                                        text-[10px]
                                                        ${
                                                            isMine
                                                                ? "text-orange-100"
                                                                : "text-gray-400"
                                                        }
                                                    `}
                                                >
                                                    {formatDateTime(
                                                        chatMessage.created_at,
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input */}
                <div className="border-t border-gray-100 bg-white p-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isSending}
                            placeholder="Type a message..."
                            className="
                                h-11
                                flex-1
                                rounded-full
                                border
                                border-gray-300
                                bg-white
                                px-4
                                text-sm
                                text-gray-900
                                outline-none
                                transition-all
                                duration-200
                                placeholder:text-gray-400
                                focus:border-[#fc4c02]
                                focus:ring-2
                                focus:ring-[#fc4c02]/20
                                disabled:cursor-not-allowed
                                disabled:bg-gray-50
                                disabled:opacity-60
                            "
                        />

                        <button
                            type="button"
                            onClick={() => void handleSend()}
                            disabled={!message.trim() || isSending}
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#fc4c02]
                                text-white
                                transition-all
                                duration-200
                                hover:bg-[#e64500]
                                active:scale-95
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                            aria-label="Send message"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
