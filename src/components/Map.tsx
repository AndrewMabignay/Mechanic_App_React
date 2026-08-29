import { useEffect, useRef } from "react";
import { Map, NavigationControl, setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

export default function MapComponent() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const mapInstance = new Map({
            container: mapContainer.current,
            style: "https://tiles.openfreemap.org/styles/liberty",
            center: [121.1000, 14.4500],
            zoom: 13,
        });

        map.current = mapInstance;

        mapInstance.addControl(
            new NavigationControl(),
            "top-right"
        );

        return () => {
            mapInstance.remove();
            map.current = null;
        };
    }, []);

    return (
        <div
            ref={mapContainer}
            style={{
                width: "100%",
                height: "100%",
            }}
        />
    );
}