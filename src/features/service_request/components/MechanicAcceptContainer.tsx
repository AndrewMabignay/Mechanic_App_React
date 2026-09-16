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
                <div
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    "
                >
                    {/* Header */}
                    <div className="mb-4 flex items-center gap-3">
                        {/* Avatar */}
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-full
                                bg-[#fc4c02]/10
                            "
                        >
                            {user?.profile_picture ? (
                                <img
                                    src={user.profile_picture}
                                    alt={cyclistName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Bike className="h-6 w-6 text-[#fc4c02]" />
                            )}
                        </div>

                        {/* Cyclist Name */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-semibold text-gray-900">
                                {cyclistName}
                            </p>

                            <p className="mt-1 text-xs font-medium text-[#fc4c02]">
                                Cyclist
                            </p>
                        </div>
                    </div>

                    {/* Bike Problem */}
                    {request?.bike_problem && (
                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-3
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                p-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-[#fc4c02]/10
                                "
                            >
                                <Wrench className="h-4 w-4 text-[#fc4c02]" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-500">
                                    Bike Problem
                                </p>

                                <p className="mt-1 truncate text-sm font-medium text-gray-900">
                                    {request.bike_problem.name}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Address */}
                    <div
                        className="
                            mt-3
                            flex
                            min-w-0
                            items-start
                            gap-3
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            p-3
                        "
                    >
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-md
                                bg-[#fc4c02]/10
                            "
                        >
                            <MapPin className="h-4 w-4 text-[#fc4c02]" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-500">
                                Location
                            </p>

                            <p className="mt-1 break-words text-sm font-medium text-gray-900">
                                {address}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 space-y-2">
                        <Button
                            type="button"
                            onClick={onCall}
                            className="
                                h-11
                                w-full
                                rounded-md
                                border
                                border-[#fc4c02]
                                bg-white
                                px-4
                                text-sm
                                font-medium
                                text-[#fc4c02]
                                shadow-none
                                transition-colors
                                hover:bg-[#fc4c02]/5
                                hover:text-[#fc4c02]
                            "
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                        </Button>

                        <Button
                            type="button"
                            onClick={onChat}
                            className="
                                h-11
                                w-full
                                rounded-md
                                border
                                border-[#fc4c02]
                                bg-white
                                px-4
                                text-sm
                                font-medium
                                text-[#fc4c02]
                                shadow-none
                                transition-colors
                                hover:bg-[#fc4c02]/5
                                hover:text-[#fc4c02]
                            "
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat
                        </Button>

                        <Button
                            type="button"
                            onClick={onViewDetails}
                            className="
                                h-11
                                w-full
                                rounded-md
                                border
                                border-gray-300
                                bg-white
                                px-4
                                text-sm
                                font-medium
                                text-gray-700
                                shadow-none
                                transition-colors
                                hover:border-[#fc4c02]
                                hover:bg-[#fc4c02]/5
                                hover:text-[#fc4c02]
                            "
                        >
                            View Details
                        </Button>

                        <Button
                            type="button"
                            onClick={onEnRoute}
                            disabled={isEnRoutePending}
                            className="
                                h-11
                                w-full
                                rounded-md
                                bg-[#fc4c02]
                                px-4
                                text-sm
                                font-medium
                                text-white
                                shadow-sm
                                transition-colors
                                hover:bg-[#e64500]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {isEnRoutePending ? "Starting..." : "En Route"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
