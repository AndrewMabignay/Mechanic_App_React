import { Check, Navigation } from "lucide-react";
import MapComponent, {
    type NavigationInstruction,
} from "../../../components/Map";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useIncomingRequests } from "../../service_request/hooks/useIncomingRequests";
import { useEffect, useRef, useState } from "react";
import MechanicCyclistInfoDialog from "../../service_request/components/MechanicCyclistInfoDialog";
import {
    useAcceptServiceRequest,
    useCompleteServiceRequest,
    useDeclineServiceRequest,
    useEnRouteServiceRequest,
    useInProgressServiceRequest,
} from "../../service_request/hooks/useMechanicCurrentServiceRequest";
import MechanicEnRouteContainer from "../../service_request/components/MechanicEnRouteContainer";
import { useMechanicCurrentServiceRequest } from "../../service_request/hooks/useCurrentServiceRequest";
import MechanicAcceptContainer from "../../service_request/components/MechanicAcceptContainer";
import { useServiceChat } from "../../service_request/hooks/useServiceChat";
import { useMechanicProfile } from "../hooks/useMechanicProfile";
import CyclistMechanicChatDialog from "../../service_request/components/CyclistMechanicChatDialog";
import { getDirectionLabel } from "../../service_request/helpers/navigation";
import { useUpdateMechanicLocation } from "../hooks/useUpdateMechanicLocation";
import { calculateDistanceInMeters } from "../helpers/location";
import MechanicProfileContainer from "./MechanicProfileContainer";
import MechanicIncomingRequestContainer from "@/features/service_request/components/MechanicIncomingRequestContainer";
import type { ServiceRequest } from "@/features/service_request/types/serviceRequest";
import MechanicInProgressContainer from "@/features/service_request/components/MechanicInProgressContainer";
import { Button } from "@/components/ui/button";
import LoadingComponent from "@/components/LoadingComponent";
import { useServiceRequestUpdates } from "@/features/service_request/hooks/useServiceRequestUpdates";
import { useIncomingRequestUpdates } from "../hooks/useIncomingRequestUpdates";

export default function MechanicHomeComponent() {
    const {
        data: mechanicProfile,
        // isLoading: mechanicProfileLoading,
        // error: mechanicProfileError,
    } = useMechanicProfile();

    const user = mechanicProfile?.data?.user;

    const { data /*isLoading*/ } = useIncomingRequests();

    const mechanicId = mechanicProfile?.data?.id;

    useIncomingRequestUpdates({ mechanicId });
    const acceptMutation = useAcceptServiceRequest();
    const declineMutation = useDeclineServiceRequest();
    const enRouteMutation = useEnRouteServiceRequest();
    const inProgressMutation = useInProgressServiceRequest();
    const completeMutation = useCompleteServiceRequest();

    const { location, loading, error } = useCurrentLocation();
    const { data: currentServiceRequestResponse, isFetching } =
        useMechanicCurrentServiceRequest();

    const currentServiceRequest = currentServiceRequestResponse?.data ?? null;

    useServiceRequestUpdates({
        serviceRequestUuid: currentServiceRequest?.uuid,
        queryKey: ["mechanic-current-service-request"],
    });

    console.log(currentServiceRequest);

    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest>();

    const isAccepted = currentServiceRequest?.status === "accepted";

    const [acceptingRequestUuid, setAcceptingRequestUuid] = useState<
        string | null
    >(null);
    const isAcceptingRequest =
        acceptingRequestUuid !== null || acceptMutation.isPending;

    const isEnRoute = currentServiceRequest?.status === "en_route";
    const isInProgress = currentServiceRequest?.status === "in_progress";

    const [currentDirection, setCurrentDirection] =
        useState<NavigationInstruction | null>(null);

    const { mutate: updateMechanicLocation, isPending: isUpdatingLocation } =
        useUpdateMechanicLocation();

    const lastUpdatedLocation = useRef<{
        latitude: number;
        longitude: number;
    } | null>(null);

    // Chat state and functionality
    const [chatDialogOpen, setChatDialogOpen] = useState(false);
    const { messages, sendMessage, isSending } = useServiceChat(
        currentServiceRequest?.uuid,
        user?.id,
        "mechanic",
    );

    const [cyclistInfoOpen, setCyclistInfoOpen] = useState(false);
    const [declinedRequestUuid, setDeclinedRequestUuid] = useState<
        string | null
    >(null);
    const [serviceCompleted, setServiceCompleted] = useState(false);

    useEffect(() => {
        if (!isEnRoute) {
            lastUpdatedLocation.current = null;
            return;
        }

        if (!location) {
            return;
        }

        const currentLatitude = location.latitude;
        const currentLongitude = location.longitude;

        if (!lastUpdatedLocation.current) {
            lastUpdatedLocation.current = {
                latitude: currentLatitude,
                longitude: currentLongitude,
            };

            updateMechanicLocation({
                latitude: currentLatitude,
                longitude: currentLongitude,
            });

            return;
        }

        const distance = calculateDistanceInMeters(
            lastUpdatedLocation.current.latitude,
            lastUpdatedLocation.current.longitude,
            currentLatitude,
            currentLongitude,
        );

        if (distance >= 3) {
            lastUpdatedLocation.current = {
                latitude: currentLatitude,
                longitude: currentLongitude,
            };

            updateMechanicLocation({
                latitude: currentLatitude,
                longitude: currentLongitude,
            });
        }
    }, [location, isEnRoute, updateMechanicLocation]);

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                Unable to get your location: {error}
            </div>
        );
    }

    if (!location) {
        return null;
    }

    const requests = data?.data ?? [];

    const incomingRequest = requests.find(
        (request) => request.service_request?.uuid !== declinedRequestUuid,
    );

    const distanceToCyclist =
        currentServiceRequest?.location_lat !== undefined &&
        currentServiceRequest?.location_lng !== undefined
            ? calculateDistanceInMeters(
                  location.latitude,
                  location.longitude,
                  currentServiceRequest.location_lat,
                  currentServiceRequest.location_lng,
              )
            : undefined;

    const handleAccept = async () => {
        const uuid = incomingRequest?.service_request?.uuid;

        if (!uuid) {
            console.warn("No service request UUID found.");
            return;
        }

        setAcceptingRequestUuid(uuid);

        try {
            const response = await acceptMutation.mutateAsync(uuid);

            console.log("[Mechanic] Accept successful:", {
                uuid,
                response,
            });

            setAcceptingRequestUuid(null);
        } catch (error) {
            console.error("Failed to accept service request:", error);
            setAcceptingRequestUuid(null);
        }
    };

    const handleDecline = async () => {
        const uuid = incomingRequest?.uuid;

        console.log(uuid);

        if (!uuid) {
            return;
        }

        try {
            await declineMutation.mutateAsync(uuid);

            setDeclinedRequestUuid(uuid);
            setSelectedRequest(undefined);
            setCyclistInfoOpen(false);
        } catch (error) {
            console.error("Failed to decline service request:", error);
        }
    };

    const handleCall = () => {
        // const phone = currentRequest?.cyclist?.user?.phone_number;
        const phone = "+639850627081";

        if (!phone) {
            return;
        }

        window.location.href = `tel:${phone}`;
    };

    const handleChat = () => {
        setChatDialogOpen(true);
    };

    const handleEnRoute = async () => {
        if (!currentServiceRequest?.uuid) {
            return;
        }

        try {
            await enRouteMutation.mutateAsync(currentServiceRequest.uuid);
        } catch (error) {
            console.error("Failed to set service request to en route:", error);
        }
    };

    const handleArrived = async () => {
        if (!currentServiceRequest?.uuid) {
            return;
        }

        if (distanceToCyclist === undefined || distanceToCyclist > 50) {
            return;
        }

        try {
            await inProgressMutation.mutateAsync(currentServiceRequest.uuid);
        } catch (error) {
            console.error(
                "Failed to mark service request as in progress:",
                error,
            );
        }
    };

    const handleComplete = async () => {
        if (!currentServiceRequest?.uuid) {
            return;
        }

        try {
            await completeMutation.mutateAsync(currentServiceRequest.uuid);
            setServiceCompleted(true);
        } catch (error) {
            console.error("Failed to complete service:", error);
        }
    };

    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0">
                <MapComponent
                    latitude={location.latitude}
                    longitude={location.longitude}
                    mechanicLatitude={location.latitude}
                    mechanicLongitude={location.longitude}
                    mechanicHeading={location.heading}
                    cyclistLatitude={currentServiceRequest?.location_lat}
                    cyclistLongitude={currentServiceRequest?.location_lng}
                    showRoute={isAccepted || isEnRoute}
                    showMechanicMarker={isAccepted || isEnRoute}
                    followMechanic={isEnRoute}
                    onDirectionChange={setCurrentDirection}
                />
            </div>

            {/* Navigation Direction */}
            {isEnRoute && currentDirection && (
                <div className="absolute inset-x-0 top-4 z-30 flex justify-center px-4">
                    <div className="w-full max-w-md rounded-2xl border bg-white p-4 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                                <Navigation className="h-7 w-7 text-orange-500" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium uppercase text-slate-500">
                                    Next Direction
                                </p>

                                <p className="text-lg font-semibold text-slate-900">
                                    {getDirectionLabel(currentDirection)}
                                </p>

                                {currentDirection.name && (
                                    <p className="truncate text-sm text-slate-500">
                                        {currentDirection.name}
                                    </p>
                                )}

                                <p className="mt-1 text-xs font-medium text-orange-500">
                                    {Math.round(currentDirection.distance)} m
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Container */}
            <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
                <div className="w-full max-w-md">
                    {serviceCompleted ? (
                        <div
                            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                                serviceCompleted
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="min-h-0">
                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                                            <Check className="h-6 w-6 text-[#fc4c02]" />
                                        </div>

                                        <h2 className="mt-3 text-base font-semibold text-gray-900">
                                            Service Completed
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            You've completed the service
                                            successfully.
                                        </p>

                                        <Button
                                            type="button"
                                            onClick={() =>
                                                setServiceCompleted(false)
                                            }
                                            className="mt-4 h-9 w-full rounded-lg bg-[#fc4c02] text-sm font-medium text-white hover:bg-[#e04400]"
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : isInProgress && currentServiceRequest ? (
                        <>
                            <MechanicInProgressContainer
                                request={currentServiceRequest}
                                onViewDetails={() => {
                                    setSelectedRequest(currentServiceRequest);
                                    setCyclistInfoOpen(true);
                                }}
                                onComplete={handleComplete}
                                isCompleting={completeMutation.isPending}
                            />
                        </>
                    ) : isEnRoute && currentServiceRequest ? (
                        <>
                            <MechanicEnRouteContainer
                                request={currentServiceRequest}
                                distanceToCyclist={distanceToCyclist}
                                onViewDetails={() => {
                                    setSelectedRequest(currentServiceRequest);
                                    setCyclistInfoOpen(true);
                                }}
                                onCall={handleCall}
                                onChat={handleChat}
                                onArrived={handleArrived}
                                isArriving={inProgressMutation.isPending}
                            />
                        </>
                    ) : isAccepted && currentServiceRequest ? (
                        <MechanicAcceptContainer
                            request={currentServiceRequest}
                            onCall={handleCall}
                            onChat={handleChat}
                            onViewDetails={() => {
                                setSelectedRequest(currentServiceRequest);
                                setCyclistInfoOpen(true);
                                console.log(currentServiceRequest.images);
                            }}
                            onEnRoute={handleEnRoute}
                            isEnRoutePending={false}
                        />
                    ) : isAcceptingRequest && incomingRequest ? (
                        <MechanicIncomingRequestContainer
                            request={incomingRequest}
                            onViewDetails={() => {
                                setSelectedRequest(
                                    incomingRequest.service_request,
                                );
                                setCyclistInfoOpen(true);
                            }}
                            onAccept={handleAccept}
                            onDecline={handleDecline}
                            isAccepting={true}
                            isDeclining={declineMutation.isPending}
                        />
                    ) : incomingRequest ? (
                        <MechanicIncomingRequestContainer
                            request={incomingRequest}
                            onViewDetails={() => {
                                setSelectedRequest(
                                    incomingRequest.service_request,
                                );
                                setCyclistInfoOpen(true);
                            }}
                            onAccept={handleAccept}
                            onDecline={handleDecline}
                            isAccepting={acceptMutation.isPending}
                            isDeclining={declineMutation.isPending}
                        />
                    ) : isFetching ? null : (
                        <MechanicProfileContainer
                            profile={mechanicProfile?.data}
                        />
                    )}
                </div>
            </div>

            <MechanicCyclistInfoDialog
                open={cyclistInfoOpen}
                onOpenChange={setCyclistInfoOpen}
                request={selectedRequest}
                mechanicLatitude={location.latitude}
                mechanicLongitude={location.longitude}
            />

            <CyclistMechanicChatDialog
                open={chatDialogOpen}
                onOpenChange={setChatDialogOpen}
                currentUserRole="mechanic"
                otherUserName={`${currentServiceRequest?.cyclist?.user?.first_name ?? ""} ${
                    currentServiceRequest?.cyclist?.user?.last_name ?? ""
                }`.trim()}
                messages={messages}
                onSendMessage={sendMessage}
                isSending={isSending}
            />
        </div>
    );
}
