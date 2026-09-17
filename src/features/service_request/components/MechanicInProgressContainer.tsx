import { CheckCircle2, ChevronDown, Wrench } from "lucide-react";
import { useState } from "react";

import { Button } from "../../../components/ui/button";

import type { ServiceRequest } from "../types/serviceRequest";

interface MechanicInProgressContainerProps {
    request: ServiceRequest;
    onViewDetails: () => void;
    onComplete: () => void;
    isCompleting?: boolean;
}

export default function MechanicInProgressContainer({
    request,
    onViewDetails,
    onComplete,
    isCompleting = false,
}: MechanicInProgressContainerProps) {
    const cyclist = request.cyclist?.user;

    const cyclistName =
        `${cyclist?.first_name ?? ""} ${cyclist?.last_name ?? ""}`.trim() ||
        "Unknown Cyclist";

    const bikeProblem = request.bike_problem?.name ?? "Bike Problem";

    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            {/* Header */}
            <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fc4c02]/10">
                    <Wrench className="h-5 w-5 text-[#fc4c02]" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#fc4c02]">
                        Repair in Progress
                    </p>

                    <p className="truncate text-sm font-semibold text-gray-900">
                        {cyclistName}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />

                    <span className="text-xs font-medium text-[#fc4c02]">
                        In Progress
                    </span>
                </div>

                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 ease-in-out ${
                        isExpanded ? "rotate-180" : "rotate-0"
                    }`}
                />
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
                    {/* Request Summary */}
                    <button
                        type="button"
                        onClick={onViewDetails}
                        className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500">
                                Bike Problem
                            </p>

                            <p className="truncate text-sm font-medium text-gray-900">
                                {bikeProblem}
                            </p>

                            {request.description && (
                                <p className="mt-0.5 truncate text-xs text-gray-500">
                                    {request.description}
                                </p>
                            )}
                        </div>

                        <ChevronDown className="h-4 w-4 shrink-0 -rotate-90 text-gray-400" />
                    </button>

                    {/* Complete Button */}
                    <div className="border-t border-gray-100 px-4 py-3">
                        <Button
                            type="button"
                            onClick={onComplete}
                            disabled={isCompleting}
                            className="h-11 w-full rounded-xl bg-[#fc4c02] font-medium text-white hover:bg-[#e64500]"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />

                            {isCompleting
                                ? "Completing..."
                                : "Complete Service"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
