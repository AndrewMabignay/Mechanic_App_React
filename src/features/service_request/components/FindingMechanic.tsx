import { useEffect } from "react";
import { useFindMechanic } from "../hooks/useFindMechanic";

type FindingMechanicProps = {
    serviceRequestUuid: string;
};

const FindingMechanic = ({ serviceRequestUuid }: FindingMechanicProps) => {
    const { mutate: findMechanic, isPending } = useFindMechanic();

    useEffect(() => {
        findMechanic(serviceRequestUuid);
    }, [serviceRequestUuid, findMechanic]);

    return (
        <div>
            <p>
                {isPending
                    ? "Finding a nearby mechanic..."
                    : "Waiting for a mechanic..."}
            </p>
        </div>
    );
};

export default FindingMechanic;
