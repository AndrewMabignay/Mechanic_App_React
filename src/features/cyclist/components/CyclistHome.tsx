import { useEffect, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";

import MapComponent from "../../../components/Map";
import { useCyclistProfile } from "../hooks/useCyclistProfile";
import CyclistRequestMechanicForm from "../../service_request/components/CyclistRequestMechanicForm";
import CyclistFindingMechanicDialog from "../../service_request/components/CyclistFindingMechanicDialog";
import { useCyclistCurrentServiceRequest } from "../../service_request/hooks/useCyclistCurrentServiceRequest";

export default function CyclistHomeComponent() {
    const { data, isLoading, error } = useCyclistProfile();

    const [locationAddress, setLocationAddress] =
        useState("Loading address...");

    const [requestSubmitted, setRequestSubmitted] = useState(false);
    const [findingDialogOpen, setFindingDialogOpen] = useState(false);

    const latitude = Number(data?.default_location_lat);
    const longitude = Number(data?.default_location_lng);

    const { data: currentRequestResponse, isLoading: isCurrentRequestLoading } =
        useCyclistCurrentServiceRequest();

    const currentRequest = currentRequestResponse?.data;

    const hasActiveRequest =
        currentRequest &&
        ["pending", "accepted", "en_route", "in_progress"].includes(
            currentRequest.status,
        );

    useEffect(() => {
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return;
        }

        const fetchAddress = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                );

                if (!response.ok) {
                    throw new Error("Failed to get address");
                }

                const result = await response.json();

                setLocationAddress(
                    result.display_name || "Address not available",
                );
            } catch (error) {
                console.error("Reverse geocoding error:", error);
                setLocationAddress("Address not available");
            }
        };

        fetchAddress();
    }, [latitude, longitude]);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-[#8A94A6]">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-[#D32F2F]">
                    Failed to load profile...
                </p>
            </div>
        );
    }

    const user = data?.user;

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-[#8A94A6]">Profile not found.</p>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Map */}
            <div className="absolute inset-0">
                <MapComponent latitude={latitude} longitude={longitude} />
            </div>

            {/* Bottom Container */}
            <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-4">
                <div className="w-full max-w-md">
                    {!hasActiveRequest ? (
                        <CyclistRequestMechanicForm />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setFindingDialogOpen(true)}
                            className="w-full rounded-2xl border bg-white p-4 text-left shadow-xl transition hover:shadow-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50">
                                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-base font-semibold text-slate-900">
                                        Finding a mechanic...
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Searching nearby mechanics
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {/* Finding Mechanic Dialog */}
            <CyclistFindingMechanicDialog
                open={findingDialogOpen}
                onOpenChange={setFindingDialogOpen}
                serviceRequestUuid={currentRequest?.uuid ?? ""}
            />
        </div>
    );
}
