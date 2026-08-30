import { useEffect, useRef } from "react";
import { Map, Marker, NavigationControl, setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

interface MapComponentProps {
    latitude: number;
    longitude: number;
    onLocationSelect?: (latitude: number, longitude: number) => void;
}

export default function MapComponent({
    latitude,
    longitude,
    onLocationSelect,
}: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);
    const marker = useRef<Marker | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

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

        const markerInstance = new Marker({
            color: "#FC4C02",
        })
            .setLngLat([longitude, latitude])
            .addTo(mapInstance);

        marker.current = markerInstance;

        if (onLocationSelect) {
            mapInstance.on("click", (event) => {
                const selectedLatitude = event.lngLat.lat;
                const selectedLongitude = event.lngLat.lng;

                console.log("Selected location:", {
                    latitude: selectedLatitude,
                    longitude: selectedLongitude,
                });

                markerInstance.setLngLat([selectedLongitude, selectedLatitude]);

                onLocationSelect(selectedLatitude, selectedLongitude);
            });
        }

        map.current = mapInstance;

        return () => {
            mapInstance.remove();
            map.current = null;
            marker.current = null;
        };
    }, [latitude, longitude, onLocationSelect]);

    return <div ref={mapContainer} className="h-full w-full" />;
}
