import { Navigation } from "lucide-react";
import MapComponent, {
    type NavigationInstruction,
} from "../../../components/Map";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useIncomingRequests } from "../../service_request/hooks/useIncomingRequests";
import { useEffect, useRef, useState } from "react";
import MechanicCyclistInfoDialog from "../../service_request/components/MechanicCyclistInfoDialog";
import {
    useAcceptServiceRequest,
    useEnRouteServiceRequest,
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

export default function MechanicHomeComponent() {
    const {
        data: mechanicProfile,
        // isLoading: mechanicProfileLoading,
        // error: mechanicProfileError,
    } = useMechanicProfile();

    const user = mechanicProfile?.data?.user;

    const { data /*isLoading*/ } = useIncomingRequests();
    const acceptMutation = useAcceptServiceRequest();
    const enRouteMutation = useEnRouteServiceRequest();
    const { location, loading, error } = useCurrentLocation();
    const { data: currentRequestResponse } = useMechanicCurrentServiceRequest();

    const currentRequest = currentRequestResponse?.data;
    console.log(currentRequest);

    const isAccepted = currentRequest?.status === "accepted";
    const isEnRoute = currentRequest?.status === "en_route";

    const [currentDirection, setCurrentDirection] =
        useState<NavigationInstruction | null>(null);

    const updateLocationMutation = useUpdateMechanicLocation();

    const lastUpdatedLocation = useRef<{
        latitude: number;
        longitude: number;
    } | null>(null);

    // Chat state and functionality
    const [chatDialogOpen, setChatDialogOpen] = useState(false);
    const { messages, sendMessage, isSending } = useServiceChat(
        currentRequest?.uuid,
        user?.id,
        "mechanic",
    );

    const [cyclistInfoOpen, setCyclistInfoOpen] = useState(false);

    useEffect(() => {
        if (!location || !isEnRoute) {
            return;
        }

        const currentLatitude = location.latitude;
        const currentLongitude = location.longitude;

        if (!lastUpdatedLocation.current) {
            lastUpdatedLocation.current = {
                latitude: currentLatitude,
                longitude: currentLongitude,
            };

            updateLocationMutation.mutate({
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

            updateLocationMutation.mutate({
                latitude: currentLatitude,
                longitude: currentLongitude,
            });
        }
    }, [location, isEnRoute]);

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                Getting your location...
            </div>
        );
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
    const incomingRequest = requests[0];

    const handleAccept = async () => {
        if (!incomingRequest?.uuid) {
            return;
        }

        try {
            await acceptMutation.mutateAsync(
                incomingRequest?.service_request?.uuid,
            );
        } catch (error) {
            console.error("Failed to accept service request:", error);
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
        if (!currentRequest?.uuid) {
            return;
        }

        try {
            await enRouteMutation.mutateAsync(currentRequest.uuid);
        } catch (error) {
            console.error("Failed to set service request to en route:", error);
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
                    cyclistLatitude={currentRequest?.location_lat}
                    cyclistLongitude={currentRequest?.location_lng}
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
                    {isEnRoute && currentRequest ? (
                        <>
                            <MechanicEnRouteContainer
                                request={currentRequest}
                                onViewDetails={() => setCyclistInfoOpen(true)}
                            />
                        </>
                    ) : isAccepted && currentRequest ? (
                        <MechanicAcceptContainer
                            request={currentRequest}
                            onCall={handleCall}
                            onChat={handleChat}
                            onViewDetails={() => setCyclistInfoOpen(true)}
                            onEnRoute={handleEnRoute}
                            isEnRoutePending={false}
                        />
                    ) : incomingRequest ? (
                        <MechanicIncomingRequestContainer
                            request={incomingRequest}
                            onViewDetails={() => setCyclistInfoOpen(true)}
                            onAccept={handleAccept}
                            isAccepting={acceptMutation.isPending}
                        />
                    ) : (
                        <MechanicProfileContainer
                            profile={mechanicProfile?.data}
                        />
                    )}
                </div>
            </div>

            <MechanicCyclistInfoDialog
                open={cyclistInfoOpen}
                onOpenChange={setCyclistInfoOpen}
                request={currentRequest}
            />

            <CyclistMechanicChatDialog
                open={chatDialogOpen}
                onOpenChange={setChatDialogOpen}
                currentUserRole="mechanic"
                otherUserName={`${currentRequest?.cyclist?.user?.first_name ?? ""} ${
                    currentRequest?.cyclist?.user?.last_name ?? ""
                }`.trim()}
                messages={messages}
                onSendMessage={sendMessage}
                isSending={isSending}
            />
        </div>
    );
}
