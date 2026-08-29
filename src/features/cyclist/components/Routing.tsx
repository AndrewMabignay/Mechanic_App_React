import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

type Props = {
    mechanic: [number, number];
    cyclist: [number, number];
    arrived: boolean;
};

export default function Routing({ mechanic, cyclist, arrived}: Props) {
    const map = useMap();

    const routingRef = useRef<L.Routing.Control | null>(null);

    // Create only once
    useEffect(() => {
        routingRef.current = L.Routing.control({
            waypoints: [
                L.latLng(mechanic[0], mechanic[1]),
                L.latLng(cyclist[0], cyclist[1]),
            ],
            lineOptions: {
                styles: [
                    {
                        color: "blue",
                        weight: 5,
                    },
                ],
                extendToWaypoints: false,
                missingRouteTolerance: 0,
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            show: false,
            createMarker: () => null,
        }).addTo(map);

        return () => {
            if (routingRef.current) {
                map.removeControl(routingRef.current);
            }
        };
    }, [map]);

    // Update route only
    useEffect(() => {
        if (!routingRef.current) return;

        if (arrived) return;

        routingRef.current.setWaypoints([
            L.latLng(mechanic[0], mechanic[1]),
            L.latLng(cyclist[0], cyclist[1]),
        ]);

    }, [mechanic, cyclist, arrived]);

    return null;
}