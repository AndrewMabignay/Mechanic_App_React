import { useEffect, useState } from "react";
import { ChevronRight, Loader2, MapPin, Wrench } from "lucide-react";

import MapComponent from "../../../components/Map";
import { useCyclistProfile } from "../hooks/useCyclistProfile";
import CyclistRequestMechanicForm from "../../service_request/components/CyclistRequestMechanicForm";
import CyclistFindingMechanicDialog from "../../service_request/components/CyclistFindingMechanicDialog";
import { useCyclistCurrentServiceRequest } from "../../service_request/hooks/useCyclistCurrentServiceRequest";
import CyclistMechanicEnRouteDialog from "../../service_request/components/CyclistMechanicEnRouteDialog";
import CyclistMechanicChatDialog from "../../service_request/components/CyclistMechanicChatDialog";
import { useServiceChat } from "../../service_request/hooks/useServiceChat";
import CyclistServiceInProgressDialog from "../../service_request/components/CyclistServiceInProgressDialog";
import CyclistRateReviewDialog from "../../service_request/components/CyclistRateReviewDialog";
import { useSubmitServiceRequestRating } from "../../service_request/hooks/useSubmitServiceRequestRating";

export default function CyclistHomeComponent() {
    const { data, isLoading, error } = useCyclistProfile();

    const user = data?.user;

    const { data: currentRequestResponse } = useCyclistCurrentServiceRequest();

    const currentRequest = currentRequestResponse?.data;

    const { messages, sendMessage, isSending } = useServiceChat(
        currentRequest?.uuid,
        user?.id,
    );

    const [locationAddress, setLocationAddress] =
        useState("Loading address...");

    const [requestSubmitted, setRequestSubmitted] = useState(false);
    const [findingDialogOpen, setFindingDialogOpen] = useState(false);

    const latitude = Number(data?.default_location_lat);
    const longitude = Number(data?.default_location_lng);

    const isPending = currentRequest?.status === "pending";
    const isAccepted = currentRequest?.status === "accepted";
    const isEnRoute = currentRequest?.status === "en_route";

    const cyclistLatitude = Number(currentRequest?.location_lat ?? latitude);
    const cyclistLongitude = Number(currentRequest?.location_lng ?? longitude);
    const mechanicLatitude = Number(currentRequest?.mechanic?.latitude);
    const mechanicLongitude = Number(currentRequest?.mechanic?.longitude);

    const hasMechanicLocation =
        Number.isFinite(mechanicLatitude) && Number.isFinite(mechanicLongitude);

    const hasCyclistLocation =
        Number.isFinite(cyclistLatitude) && Number.isFinite(cyclistLongitude);

    const [enRouteDialogOpen, setEnRouteDialogOpen] = useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false);

    const [inProgressDialogOpen, setInProgressDialogOpen] = useState(false);

    const isInProgress = currentRequest?.status === "in_progress";
    const isCompleted = currentRequest?.status === "completed";

    const [ratingSubmitted, setRatingSubmitted] = useState(false);

    const rateReviewDialogOpen = isCompleted && !ratingSubmitted;

    const { submitRating, isSubmitting: isSubmittingRating } =
        useSubmitServiceRequestRating();

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
                <MapComponent
                    latitude={latitude}
                    longitude={longitude}
                    mechanicLatitude={
                        hasMechanicLocation ? mechanicLatitude : undefined
                    }
                    mechanicLongitude={
                        hasMechanicLocation ? mechanicLongitude : undefined
                    }
                    cyclistLatitude={
                        hasCyclistLocation ? cyclistLatitude : undefined
                    }
                    cyclistLongitude={
                        hasCyclistLocation ? cyclistLongitude : undefined
                    }
                    showRoute={isAccepted || isEnRoute}
                />
            </div>

            {/* Bottom Container */}
            <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-4">
                <div className="w-full max-w-md">
                    {!currentRequest ? (
                        <CyclistRequestMechanicForm />
                    ) : isPending ? (
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
                    ) : isAccepted || isEnRoute ? (
                        <button
                            type="button"
                            onClick={() => setEnRouteDialogOpen(true)}
                            className="w-full rounded-2xl border bg-white p-4 text-left shadow-xl transition hover:shadow-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50">
                                    <MapPin className="h-6 w-6 text-green-600" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-base font-semibold text-slate-900">
                                        Mechanic is on the way
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Your mechanic is heading to your
                                        location
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                            </div>
                        </button>
                    ) : isInProgress ? (
                        <button
                            type="button"
                            onClick={() => setInProgressDialogOpen(true)}
                            className="w-full rounded-2xl border bg-white p-4 text-left shadow-xl transition hover:shadow-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50">
                                    <Wrench className="h-6 w-6 text-blue-600" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-base font-semibold text-slate-900">
                                        Service in progress
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Your mechanic is working on your bicycle
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                            </div>
                        </button>
                    ) : null}
                </div>
            </div>

            {/* Finding Mechanic Dialog */}
            <CyclistFindingMechanicDialog
                open={isPending && findingDialogOpen}
                onOpenChange={setFindingDialogOpen}
                serviceRequestUuid={currentRequest?.uuid ?? ""}
            />

            <CyclistMechanicEnRouteDialog
                open={enRouteDialogOpen}
                onOpenChange={setEnRouteDialogOpen}
                mechanic={currentRequest?.mechanic}
                onChatClick={() => {
                    setEnRouteDialogOpen(false);
                    setChatDialogOpen(true);
                }}
            />

            <CyclistMechanicChatDialog
                open={chatDialogOpen}
                onOpenChange={setChatDialogOpen}
                mechanicName={`${currentRequest?.mechanic?.user?.first_name ?? ""} ${
                    currentRequest?.mechanic?.user?.last_name ?? ""
                }`.trim()}
                messages={messages}
                onSendMessage={sendMessage}
                isSending={isSending}
            />

            <CyclistServiceInProgressDialog
                open={inProgressDialogOpen}
                onOpenChange={setInProgressDialogOpen}
                mechanicName={`${currentRequest?.mechanic?.user?.first_name ?? ""} ${
                    currentRequest?.mechanic?.user?.last_name ?? ""
                }`.trim()}
            />

            <CyclistRateReviewDialog
                open={rateReviewDialogOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setRatingSubmitted(true);
                    }
                }}
                mechanicName={`${currentRequest?.mechanic?.user?.first_name ?? ""} ${
                    currentRequest?.mechanic?.user?.last_name ?? ""
                }`.trim()}
                isSubmitting={isSubmittingRating}
                onSubmit={async (rating, review) => {
                    if (!currentRequest?.uuid) {
                        return;
                    }

                    await submitRating(currentRequest.uuid, rating, review);

                    setRatingSubmitted(true);
                }}
            />
        </div>
    );
}
