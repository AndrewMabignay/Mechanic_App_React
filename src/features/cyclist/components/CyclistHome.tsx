import { useEffect, useState } from "react";
import MapComponent from "../../../components/Map";
import { useCyclistProfile } from "../hooks/useCyclistProfile";
import CyclistRequestMechanicForm from "../../service_request/components/CyclistRequestMechanicForm";

export default function CyclistHomeComponent() {
    const { data, isLoading, error } = useCyclistProfile();
    const [locationAddress, setLocationAddress] = useState("Loading address..");

    const latitude = Number(data?.default_location_lat);
    const longitude = Number(data?.default_location_lng);

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

    const fullName = [user.first_name, user.middle_name, user.last_name]
        .filter(Boolean)
        .join(" ");

    const initials = `${user.first_name?.charAt(0) ?? ""}${
        user.last_name?.charAt(0) ?? ""
    }`;

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Map */}
            <div className="absolute inset-0">
                <MapComponent latitude={latitude} longitude={longitude} />
            </div>

            {/* Request Mechanic */}
            <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-4">
                <div className="w-full max-w-md">
                    <CyclistRequestMechanicForm />
                    {/* <CyclistRequestMechanicForm /> */}
                </div>
            </div>
        </div>
    );
}
