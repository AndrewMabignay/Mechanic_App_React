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
    mechanicName?: string;
    messages?: ChatMessage[];
    onSendMessage?: (message: string) => Promise<void> | void;
    isSending?: boolean;
}

export default function CyclistMechanicChatDialog({
    open,
    onOpenChange,
    mechanicName = "Mechanic",
    messages = [],
    onSendMessage,
    isSending = false,
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex h-[80vh] w-[calc(100%-2rem)] max-w-md flex-col gap-0 overflow-hidden rounded-2xl p-0">
                {/* Header */}
                <DialogHeader className="border-b px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
                        >
                            <ArrowLeft className="h-5 w-5 text-slate-600" />
                        </button>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Wrench className="h-5 w-5 text-blue-600" />
                        </div>

                        <div className="min-w-0">
                            <DialogTitle className="truncate text-base">
                                {mechanicName}
                            </DialogTitle>

                            <p className="text-xs text-green-600">En Route</p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
                    {messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <Wrench className="h-6 w-6 text-blue-600" />
                                </div>

                                <p className="font-medium text-slate-700">
                                    Start a conversation
                                </p>

                                <p className="mt-1 text-sm text-slate-400">
                                    Send a message to your mechanic.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((chatMessage) => {
                                const isCyclist =
                                    chatMessage.sender === "cyclist";

                                return (
                                    <div
                                        key={chatMessage.id}
                                        className={`flex ${
                                            isCyclist
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                                                isCyclist
                                                    ? "rounded-br-md bg-blue-600 text-white"
                                                    : "rounded-bl-md bg-white text-slate-800 shadow-sm"
                                            }`}
                                        >
                                            <p className="break-words">
                                                {chatMessage.message}
                                            </p>

                                            {chatMessage.created_at && (
                                                <p
                                                    className={`mt-1 text-[10px] ${
                                                        isCyclist
                                                            ? "text-blue-100"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    {chatMessage.created_at}
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
                <div className="border-t bg-white p-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isSending}
                            placeholder="Type a message..."
                            className="h-11 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                            type="button"
                            onClick={() => void handleSend()}
                            disabled={!message.trim() || isSending}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
