import { useEffect, useRef } from "react";
import { Map, Marker, NavigationControl, setWorkerUrl } from "maplibre-gl";

import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

interface MapComponentProps {
    latitude: number;
    longitude: number;
}

export default function MapComponent({
    latitude,
    longitude,
}: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Validate coordinates
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            console.error("Invalid map coordinates:", {
                latitude,
                longitude,
            });

            return;
        }

        const mapInstance = new Map({
            container: mapContainer.current,
            style: "https://tiles.openfreemap.org/styles/liberty",
            center: [longitude, latitude],
            zoom: 15,
        });

        mapInstance.addControl(new NavigationControl(), "top-right");

        new Marker({
            color: "#FC4C02",
        })
            .setLngLat([longitude, latitude])
            .addTo(mapInstance);

        map.current = mapInstance;

        return () => {
            mapInstance.remove();
            map.current = null;
        };
    }, [latitude, longitude]);

    return <div ref={mapContainer} className="h-full w-full" />;
}
