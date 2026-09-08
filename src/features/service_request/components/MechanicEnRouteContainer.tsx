import { Bike, MapPin, Wrench } from "lucide-react";

import { Button } from "../../../components/ui/button";

import type { ServiceRequest } from "../types/serviceRequest";

interface MechanicEnRouteContainerProps {
    request?: ServiceRequest;
    onViewDetails: () => void;
}

export default function MechanicEnRouteContainer({
    request,
    onViewDetails,
}: MechanicEnRouteContainerProps) {
    const serviceRequest = request;

    return (
        <div className="w-full max-w-md">
            <div className="rounded-2xl border bg-white p-5 shadow-xl">
                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50">
                        <Bike className="h-6 w-6 text-orange-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold text-slate-900">
                            En Route to Cyclist
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            You are on your way to the cyclist
                        </p>
                    </div>
                </div>

                {/* Cyclist Information */}
                <div className="flex items-center gap-3 rounded-xl border p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                        <MapPin className="h-5 w-5 text-orange-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900">
                            {serviceRequest?.cyclist?.user?.first_name}{" "}
                            {serviceRequest?.cyclist?.user?.last_name}
                        </p>

                        <p className="mt-1 text-xs text-orange-500">Cyclist</p>
                    </div>
                </div>

                {/* Bike Problem */}
                {serviceRequest?.bike_problem && (
                    <div className="mt-3 flex items-center gap-3 rounded-xl border p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                            <Wrench className="h-4 w-4 text-orange-500" />
                        </div>

                        <div>
                            <p className="text-xs text-slate-500">
                                Bike Problem
                            </p>

                            <p className="text-sm font-medium text-slate-900">
                                {serviceRequest.bike_problem.name}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action */}
                <div className="mt-4">
                    <Button
                        type="button"
                        onClick={onViewDetails}
                        className="w-full rounded-lg border border-orange-500 bg-white px-4 py-5 text-sm font-medium text-orange-500 transition hover:bg-orange-50"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
