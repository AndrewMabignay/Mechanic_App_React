import { MapContainer, Marker, TileLayer } from "react-leaflet";
import FlyToLocation from "../../features/cyclist/components/FlyToLocation";
import { useMechanicCurrentServiceRequest } from "../../features/service_request/hooks/useMechanicCurrentServiceRequest";
import Routing from "../../features/cyclist/components/Routing";
import { useUpdateMechanicLocation } from "../../features/mechanic/hooks/useUpdateMechanicLocation";
import { useEffect, useState } from "react";
import RoutePolyline from "../../features/cyclist/components/RoutePolyline";

export default function MechanicHome() {
    const { data, isLoading } = useMechanicCurrentServiceRequest();

    const updateLocationMutation = useUpdateMechanicLocation();
    useEffect(() => {
        if (!navigator.geolocation) return;

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                updateLocationMutation.mutate({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    const [refreshKey, setRefreshKey] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshKey((prev) => prev + 1);
        }, 15000);

        return () => clearInterval(interval);
    }, []);
    
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data?.data) {
        return <p>No current service request.</p>;
    }

    if (!data.data.mechanic) {
        return <p>Mechanic information not available.</p>;
    }

    const cyclist: [number, number] = [
        data.data.location_lat,
        data.data.location_lng,
    ];

    const mechanic: [number, number] = [
        data.data.mechanic.latitude,
        data.data.mechanic.longitude,
    ];

    

    

    return (
        <>
            <MapContainer
                center={mechanic}
                zoom={17}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FlyToLocation position={mechanic} />

                {/* Mechanic */}
                <Marker position={mechanic} />

                {/* Cyclist */}
                <Marker position={cyclist} />

                {/* <Routing
                    mechanic={mechanic}
                    cyclist={cyclist}
                /> */}


                <RoutePolyline
                    mechanic={mechanic}
                    cyclist={cyclist}
                />
            </MapContainer>
            <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">
                    {data.data.cyclist.user.first_name}{" "}
                    {data.data.cyclist.user.last_name}
                </h2>

                <p>
                    {data.data.bike_problem.name}
                </p>

                <p>
                    {data.data.description}
                </p>

                <p>
                    {data.data.cyclist.user.phone}
                </p>
            </div>
        </>
    );
}