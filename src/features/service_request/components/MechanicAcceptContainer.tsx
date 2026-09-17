import {
    Bike,
    ChevronDown,
    MapPin,
    MessageCircle,
    Phone,
    Wrench,
} from "lucide-react";
import { useState } from "react";

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
    const serviceRequest = request;
    const cyclist = serviceRequest?.cyclist;
    const user = cyclist?.user;

    const cyclistName =
        `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
        "Cyclist";

    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="w-full max-w-md">
            <div className="rounded-xl border border-gray-200 bg-white shadow-lg">
                {/* Dropdown Header */}
                <button
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="flex w-full items-center gap-3 p-4 text-left"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-orange-50">
                        {user?.profile_picture ? (
                            <img
                                src={user.profile_picture}
                                alt={cyclistName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Bike className="h-5 w-5 text-[#fc4c02]" />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                            {cyclistName}
                        </p>

                        <p className="mt-0.5 text-xs text-[#fc4c02]">
                            Accepted Service Request
                        </p>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${
                                isExpanded ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </div>
                </button>

                {/* Expandable Content */}
                <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="min-h-0">
                        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
                            {/* Bike Problem */}
                            {serviceRequest?.bike_problem && (
                                <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 p-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-50">
                                        <Wrench className="h-4 w-4 text-[#fc4c02]" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500">
                                            Bike Problem
                                        </p>

                                        <p className="mt-0.5 truncate text-sm font-medium text-gray-900">
                                            {serviceRequest.bike_problem.name}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Location */}
                            <div className="mt-2 flex min-w-0 items-start gap-3 rounded-lg border border-gray-200 p-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-50">
                                    <MapPin className="h-4 w-4 text-[#fc4c02]" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500">
                                        Location
                                    </p>

                                    <p className="mt-0.5 break-words text-sm font-medium text-gray-900">
                                        {address}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    onClick={onCall}
                                    className="h-9 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-none hover:bg-gray-50"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call
                                </Button>

                                <Button
                                    type="button"
                                    onClick={onChat}
                                    className="h-9 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-none hover:bg-gray-50"
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Chat
                                </Button>

                                <Button
                                    type="button"
                                    onClick={onViewDetails}
                                    className="h-9 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-none hover:bg-gray-50"
                                >
                                    View Details
                                </Button>

                                <Button
                                    type="button"
                                    onClick={onEnRoute}
                                    disabled={isEnRoutePending}
                                    className="h-9 rounded-lg bg-[#fc4c02] text-sm font-medium text-white shadow-none hover:bg-[#e04400] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isEnRoutePending
                                        ? "Starting..."
                                        : "En Route"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
