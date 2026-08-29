import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function IncomingRequestMap({ request }) {
    const cyclist = [
        request.service_request.location_lat,
        request.service_request.location_lng,
    ];

    // Mechanic's current location
    const mechanic = [
        YOUR_MECHANIC_LAT,
        YOUR_MECHANIC_LNG,
    ];

    return (
        <MapContainer
            center={cyclist}
            zoom={15}
            className="h-96 w-full rounded-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={cyclist} />

            <Marker position={mechanic} />
        </MapContainer>
    );
}