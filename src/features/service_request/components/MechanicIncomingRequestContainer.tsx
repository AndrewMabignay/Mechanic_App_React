import { Bike, MapPin, Wrench } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { IncomingRequest } from "../types/incomingRequest";

interface Props {
    request: IncomingRequest;
    onViewDetails: () => void;
    onAccept: () => void;
    isAccepting?: boolean;
}

export default function MechanicIncomingRequestContainer({
    request,
    onViewDetails,
    onAccept,
    isAccepting = false,
}: Props) {
    const serviceRequest = request?.service_request;

    const cyclist = serviceRequest?.cyclist?.user;

    const cyclistName = `${cyclist?.first_name ?? ""} ${
        cyclist?.last_name ?? ""
    }`.trim();

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            {/* Header */}
            <div className="border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fc4c02]/10">
                        <Bike className="h-5 w-5 text-[#fc4c02]" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-gray-900">
                                New Service Request
                            </h3>

                            <span className="h-2 w-2 rounded-full bg-[#fc4c02]" />
                        </div>

                        <p className="mt-0.5 text-xs text-gray-500">
                            A cyclist nearby needs your assistance
                        </p>
                    </div>
                </div>
            </div>

            {/* Request Details */}
            <div className="space-y-3 px-5 py-4">
                {/* Cyclist */}
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Bike className="h-5 w-5 text-[#fc4c02]" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Cyclist
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
                            {cyclistName || "Unknown Cyclist"}
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#fc4c02]" />

                            <span className="text-xs text-gray-500">
                                Nearby cyclist
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bike Problem */}
                {serviceRequest?.bike_problem && (
                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                            <Wrench className="h-5 w-5 text-[#fc4c02]" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                Bike Problem
                            </p>

                            <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
                                {serviceRequest.bike_problem.name}
                            </p>
                        </div>
                    </div>
                )}

                {/* Description */}
                {serviceRequest?.description && (
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Description
                        </p>

                        <p className="mt-1 text-sm leading-5 text-gray-700">
                            {serviceRequest.description}
                        </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onViewDetails}
                        className="
                            h-11
                            flex-1
                            rounded-lg
                            border-gray-300
                            bg-white
                            text-sm
                            font-medium
                            text-gray-700
                            hover:border-[#fc4c02]
                            hover:bg-[#fc4c02]/5
                            hover:text-[#fc4c02]
                        "
                    >
                        View Details
                    </Button>

                    <Button
                        type="button"
                        onClick={onAccept}
                        disabled={isAccepting}
                        className="
                            h-11
                            flex-1
                            rounded-lg
                            bg-[#fc4c02]
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            hover:bg-[#e64500]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {isAccepting ? "Accepting..." : "Accept Request"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
