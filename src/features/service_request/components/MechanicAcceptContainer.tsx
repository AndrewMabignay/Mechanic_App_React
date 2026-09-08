import { Bike, MapPin, MessageCircle, Phone, Wrench } from "lucide-react";

import { Button } from "../../../components/ui/button";
import type { ServiceRequest } from "../types/serviceRequest";

interface MechanicAcceptContainerProps {
    request?: ServiceRequest;
    address?: string;
    onCall: () => void;
    onChat: () => void;
    onViewDetails: () => void;
    onEnRoute: () => void;
    isEnRoutePending?: boolean;
}

export default function MechanicAcceptContainer({
    request,
    address = "Address not available",
    onCall,
    onChat,
    onViewDetails,
    onEnRoute,
    isEnRoutePending = false,
}: MechanicAcceptContainerProps) {
    const cyclist = request?.cyclist;
    const user = cyclist?.user;

    const cyclistName =
        `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
        "Cyclist";

    return (
        <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-4">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border bg-white p-5 shadow-xl">
                    {/* Header */}
                    <div className="mb-4 flex items-center gap-3">
                        {/* Avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50">
                            {user?.profile_picture ? (
                                <img
                                    src={user.profile_picture}
                                    alt={cyclistName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Bike className="h-6 w-6 text-orange-500" />
                            )}
                        </div>

                        {/* Cyclist Name */}
                        <div className="min-w-0 flex-1">
                            <p className="text-base font-semibold text-slate-900">
                                {cyclistName}
                            </p>

                            <p className="mt-1 text-sm text-orange-500">
                                Cyclist
                            </p>
                        </div>
                    </div>

                    {/* Bike Problem */}
                    {request?.bike_problem && (
                        <div className="flex items-center gap-3 rounded-xl border p-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                                <Wrench className="h-4 w-4 text-orange-500" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500">
                                    Bike Problem
                                </p>

                                <p className="text-sm font-medium text-slate-900">
                                    {request.bike_problem.name}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Address */}
                    <div className="mt-3 flex items-start gap-3 rounded-xl border p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                            <MapPin className="h-4 w-4 text-orange-500" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-500">Location</p>

                            <p className="mt-1 text-sm font-medium text-slate-900">
                                {address}
                            </p>
                        </div>
                    </div>

                    {/* Call / Chat */}
                    <div className="mt-4 flex gap-3">
                        <Button
                            type="button"
                            onClick={onCall}
                            className="flex-1 rounded-lg border border-orange-500 bg-white px-4 py-5 text-sm font-medium text-orange-500 transition hover:bg-orange-50"
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                        </Button>

                        <Button
                            type="button"
                            onClick={onChat}
                            className="flex-1 rounded-lg border border-orange-500 bg-white px-4 py-5 text-sm font-medium text-orange-500 transition hover:bg-orange-50"
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat
                        </Button>
                    </div>

                    {/* View Details / En Route */}
                    <div className="mt-3 flex gap-3">
                        <Button
                            type="button"
                            onClick={onViewDetails}
                            className="flex-1 rounded-lg border border-orange-500 bg-white px-4 py-5 text-sm font-medium text-orange-500 transition hover:bg-orange-50"
                        >
                            View Details
                        </Button>

                        <Button
                            type="button"
                            onClick={onEnRoute}
                            disabled={isEnRoutePending}
                            className="flex-1 rounded-lg bg-orange-400 px-4 py-5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isEnRoutePending ? "Starting..." : "En Route"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
