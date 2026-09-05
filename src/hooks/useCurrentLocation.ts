import { useEffect, useState } from "react";

type Location = {
    latitude: number;
    longitude: number;
};

export function useCurrentLocation() {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                setError(null);
            },
            (error) => {
                setError(error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            },
        );
    }, []);

    return {
        location,
        error,
        loading: location === null && error === null,
    };
}
