import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";

type Props = {
    mechanic: [number, number];
    cyclist: [number, number];
};

export default function RoutePolyline({ mechanic, cyclist }: Props) {
    const [route, setRoute] = useState<[number, number][]>([]);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const url =
                    `https://router.project-osrm.org/route/v1/driving/` +
                    `${mechanic[1]},${mechanic[0]};` +
                    `${cyclist[1]},${cyclist[0]}` +
                    `?overview=full&geometries=geojson&steps=true`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.routes.length === 0) return;

                const coordinates = data.routes[0].geometry.coordinates.map(
                    ([lng, lat]: [number, number]) => [lat, lng],
                );

                setRoute(coordinates);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoute();
    }, [mechanic, cyclist]);

    return (
        <Polyline
            positions={route}
            pathOptions={{
                color: "blue",
                weight: 5,
            }}
        />
    );
}
