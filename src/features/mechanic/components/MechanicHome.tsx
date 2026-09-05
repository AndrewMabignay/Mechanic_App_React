import MapComponent from "../../../components/Map";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useAcceptServiceRequest } from "../../service_request/hooks/useAcceptServiceRequest";
import { useIncomingRequests } from "../../service_request/hooks/useIncomingRequests";

export default function MechanicHomeComponent() {
    const { data, isLoading } = useIncomingRequests();
    const acceptMutation = useAcceptServiceRequest();
    const { location, loading, error } = useCurrentLocation();

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

    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0">
                <MapComponent
                    latitude={location.latitude}
                    longitude={location.longitude}
                />
            </div>
        </div>
    );
}
