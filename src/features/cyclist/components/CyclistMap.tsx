import { useEffect, useState } from "react";
import {
    MapContainer,
    Marker,
    TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Routing from "./Routing"; // <-- import Routing component

export default function CyclistMap() {
    // Cyclist location
    const [location] = useState<[number, number]>([
        14.6005,
        120.9852,
    ]);

    // Mechanic location
    const [mechanic, setMechanic] = useState<[number, number]>([
        14.6018,
        120.9868,
    ]);

    return (
        <div className="h-[500px]">
            <MapContainer
                center={location}
                zoom={17}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Cyclist */}
                <Marker position={location} />

                {/* Mechanic */}
                <Marker position={mechanic} />

                {/* Road Route */}
                <Routing
                    mechanic={mechanic}
                    cyclist={location}
                />
            </MapContainer>
        </div>
    );
}