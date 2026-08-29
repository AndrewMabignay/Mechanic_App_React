import MapComponent from "../../components/Map";
import { Button } from "../../components/ui/button";
import { useAcceptServiceRequest } from "../../features/service_request/hooks/useAcceptServiceRequest";
import { useIncomingRequests } from "../../features/service_request/hooks/useIncomingRequests";

export default function MechanicIncomingRequest() {
    const { data, isLoading } = useIncomingRequests();
    const acceptMutation = useAcceptServiceRequest();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="relative h-full w-full">

                {/* Map Background */}
                <MapComponent />

                {/* Incoming Request */}
                <div className="absolute bottom-8 left-4 right-4 z-10 space-y-4">
                    {data?.data.map((request) => (
                        <div 
                            key={request.id}
                            className="rounded-lg border bg-white p-4 shadow-lg flex flex-col"
                        >

                            <h3 className="font-semibold">
                                {request.service_request.bike_problem.name}
                            </h3>

                            <p>{request.service_request.description}</p>

                            <p>Status: {request.status}</p>

                            <MapComponent />

                            <Button
                                type="button"
                                onClick={() => acceptMutation.mutate(request.service_request.uuid)}
                                disabled={acceptMutation.isPending}
                            >
                                {acceptMutation.isPending ? "Accepting..." : "Accept"}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}