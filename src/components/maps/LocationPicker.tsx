import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import FlyToLocation from "../../features/cyclist/components/FlyToLocation";

type Props = {
    latitude: number;
    longitude: number;
    onChange?: (lat: number, lng: number) => void;
    readonly?: boolean;
};

function MapClick({
    onChange,
    readonly,
}: {
    onChange?: (lat: number, lng: number) => void;
    readonly?: boolean;
}) {
    useMapEvents({
        click(e) {
            if (readonly) return;

            onChange?.(e.latlng.lat, e.latlng.lng);
        },
    });

    return null;
}

export default function LocationPicker({
    latitude,
    longitude,
    onChange,
    readonly,
}: Props) {
    const [position, setPosition] = useState<[number, number]>([
        latitude,
        longitude,
    ]);

    useEffect(() => {
        setPosition([latitude, longitude]);
    }, [latitude, longitude]);

    return (
        <MapContainer
            center={position}
            zoom={15}
            style={{
                height: 350,
                width: "100%",
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

             <FlyToLocation position={position} />

            <Marker position={position} />

            <MapClick
                readonly={readonly}
                onChange={(lat, lng) => {
                    setPosition([lat, lng]);
                    onChange?.(lat, lng);
                }}
            />
        </MapContainer>
    );
}