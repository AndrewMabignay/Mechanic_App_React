import { Bike, ChevronDown, MapPin, Wrench } from "lucide-react";
import { useState } from "react";

import { Button } from "../../../components/ui/button";
import type { ServiceRequest } from "../types/serviceRequest";

interface MechanicEnRouteContainerProps {
    request?: ServiceRequest;
    distanceToCyclist?: number;
    onViewDetails: () => void;
    onCall: () => void;
    onChat: () => void;
    onArrived: () => void;
    isArriving?: boolean;
}

export default function MechanicEnRouteContainer({
    request,
    distanceToCyclist,
    onViewDetails,
    onCall,
    onChat,
    onArrived,
    isArriving,
}: MechanicEnRouteContainerProps) {
    const serviceRequest = request;

    const canInteract = (distanceToCyclist ?? Infinity) <= 50;

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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                        <Bike className="h-5 w-5 text-[#fc4c02]" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                            En Route to Cyclist
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                            {distanceToCyclist !== undefined
                                ? `${Math.round(distanceToCyclist)} m away`
                                : "Navigating to cyclist"}
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
                            {/* Cyclist */}
                            <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-50">
                                    <MapPin className="h-4 w-4 text-[#fc4c02]" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {
                                            serviceRequest?.cyclist?.user
                                                ?.first_name
                                        }{" "}
                                        {
                                            serviceRequest?.cyclist?.user
                                                ?.last_name
                                        }
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#fc4c02]">
                                        Cyclist
                                    </p>
                                </div>
                            </div>

                            {/* Bike Problem */}
                            {serviceRequest?.bike_problem && (
                                <div className="mt-2 flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-50">
                                        <Wrench className="h-4 w-4 text-[#fc4c02]" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500">
                                            Bike Problem
                                        </p>

                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {serviceRequest.bike_problem.name}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onViewDetails}
                                    className="h-9 rounded-lg border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    View Details
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onCall}
                                    disabled={!canInteract}
                                    className="h-9 rounded-lg border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Call
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onChat}
                                    disabled={!canInteract}
                                    className="h-9 rounded-lg border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Chat
                                </Button>

                                <Button
                                    type="button"
                                    onClick={onArrived}
                                    disabled={!canInteract || isArriving}
                                    className="h-9 rounded-lg bg-[#fc4c02] text-sm font-medium text-white hover:bg-[#e04400] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isArriving
                                        ? "Confirming..."
                                        : "I'm Arrived"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
