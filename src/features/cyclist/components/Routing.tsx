import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

type Props = {
    mechanic: [number, number];
    cyclist: [number, number];
};

export default function Routing({ mechanic, cyclist }: Props) {
    const map = useMap();

    useEffect(() => {
        const routingControl = L.Routing.control({
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
            map.removeControl(routingControl);
        };
    }, [mechanic, cyclist, map]);

    return null;
}