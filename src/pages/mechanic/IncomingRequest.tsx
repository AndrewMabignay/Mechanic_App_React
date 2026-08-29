import { useAcceptServiceRequest } from "../../features/service_request/hooks/useAcceptServiceRequest";
import { useIncomingRequests } from "../../features/service_request/hooks/useIncomingRequests";

export default function IncomingRequest() {
    const { data, isLoading } = useIncomingRequests();
    const acceptMutation = useAcceptServiceRequest();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="space-y-4">
                {data?.data.map((request) => (
                    <div
                        key={request.id}
                        className="rounded-lg border p-4"
                    >
                        <h3 className="font-semibold">
                            {request.service_request.bike_problem.name}
                        </h3>

                        <p>{request.service_request.description}</p>

                        <p>Status: {request.status}</p>

                        <button
                            onClick={() =>
                                acceptMutation.mutate(
                                    request.service_request.uuid
                                )
                            }
                            disabled={acceptMutation.isPending}
                        >
                            {acceptMutation.isPending
                                ? "Accepting..."
                                : "Accept"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}