import { useEffect, useRef } from "react";

import { Map, Marker, NavigationControl, setWorkerUrl } from "maplibre-gl";

import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

interface MapComponentProps {
    latitude: number;
    longitude: number;

    mechanicLatitude?: number;
    mechanicLongitude?: number;

    cyclistLatitude?: number;
    cyclistLongitude?: number;

    showRoute?: boolean;

    onLocationSelect?: (latitude: number, longitude: number) => void;
}

export default function MapComponent({
    latitude,
    longitude,
    mechanicLatitude,
    mechanicLongitude,
    cyclistLatitude,
    cyclistLongitude,
    showRoute = false,
    onLocationSelect,
}: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    // Default/cyclist marker
    const cyclistMarker = useRef<Marker | null>(null);

    // Mechanic marker
    const mechanicMarker = useRef<Marker | null>(null);

    const routeSourceId = "mechanic-route";
    const routeLayerId = "mechanic-route-layer";

    /*
     * ============================================================
     * CREATE MAP
     * ============================================================
     */

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

        /*
         * ========================================================
         * CYCLIST MARKER
         * ========================================================
         */

        const cyclistLat =
            typeof cyclistLatitude === "number" &&
            Number.isFinite(cyclistLatitude)
                ? cyclistLatitude
                : latitude;

        const cyclistLng =
            typeof cyclistLongitude === "number" &&
            Number.isFinite(cyclistLongitude)
                ? cyclistLongitude
                : longitude;

        const cyclistMarkerInstance = new Marker({
            color: "#FC4C02",
        })
            .setLngLat([cyclistLng, cyclistLat])
            .addTo(mapInstance);

        cyclistMarker.current = cyclistMarkerInstance;

        /*
         * ========================================================
         * LOCATION PICKER
         * ========================================================
         */

        if (onLocationSelect) {
            mapInstance.on("click", (event) => {
                const selectedLatitude = event.lngLat.lat;
                const selectedLongitude = event.lngLat.lng;

                console.log("Selected location:", {
                    latitude: selectedLatitude,
                    longitude: selectedLongitude,
                });

                cyclistMarkerInstance.setLngLat([
                    selectedLongitude,
                    selectedLatitude,
                ]);

                onLocationSelect(selectedLatitude, selectedLongitude);
            });
        }

        map.current = mapInstance;

        return () => {
            mapInstance.remove();

            map.current = null;
            cyclistMarker.current = null;
            mechanicMarker.current = null;
        };
    }, [onLocationSelect]);

    /*
     * ============================================================
     * UPDATE CYCLIST MARKER
     * ============================================================
     */

    useEffect(() => {
        if (!map.current || !cyclistMarker.current) {
            return;
        }

        if (
            typeof cyclistLatitude !== "number" ||
            typeof cyclistLongitude !== "number" ||
            !Number.isFinite(cyclistLatitude) ||
            !Number.isFinite(cyclistLongitude)
        ) {
            return;
        }

        cyclistMarker.current.setLngLat([cyclistLongitude, cyclistLatitude]);
    }, [cyclistLatitude, cyclistLongitude]);

    /*
     * ============================================================
     * MECHANIC MARKER
     * ============================================================
     */

    useEffect(() => {
        if (!map.current) {
            return;
        }

        if (
            !showRoute ||
            typeof mechanicLatitude !== "number" ||
            typeof mechanicLongitude !== "number" ||
            !Number.isFinite(mechanicLatitude) ||
            !Number.isFinite(mechanicLongitude)
        ) {
            mechanicMarker.current?.remove();
            mechanicMarker.current = null;
            return;
        }

        const mapInstance = map.current;

        /*
         * Create mechanic marker if it doesn't exist.
         */

        if (!mechanicMarker.current) {
            mechanicMarker.current = new Marker({
                color: "#2563EB",
            })
                .setLngLat([mechanicLongitude, mechanicLatitude])
                .addTo(mapInstance);
        } else {
            mechanicMarker.current.setLngLat([
                mechanicLongitude,
                mechanicLatitude,
            ]);
        }
    }, [mechanicLatitude, mechanicLongitude, showRoute]);

    /**
     * ============================================================
     * DRAW ROUTE
     * ============================================================
     */
    useEffect(() => {
        if (!map.current || !showRoute) {
            return;
        }

        // Type-safe coordinate validation
        if (
            typeof mechanicLatitude !== "number" ||
            typeof mechanicLongitude !== "number" ||
            typeof cyclistLatitude !== "number" ||
            typeof cyclistLongitude !== "number" ||
            !Number.isFinite(mechanicLatitude) ||
            !Number.isFinite(mechanicLongitude) ||
            !Number.isFinite(cyclistLatitude) ||
            !Number.isFinite(cyclistLongitude)
        ) {
            return;
        }

        // At this point TypeScript knows these are numbers
        const mechanicLat = mechanicLatitude;
        const mechanicLng = mechanicLongitude;
        const cyclistLat = cyclistLatitude;
        const cyclistLng = cyclistLongitude;

        const mapInstance = map.current;

        let cancelled = false;

        const drawRoute = async () => {
            try {
                const coordinates = [
                    `${mechanicLng},${mechanicLat}`,
                    `${cyclistLng},${cyclistLat}`,
                ].join(";");

                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`,
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch route from OSRM");
                }

                const data = await response.json();

                if (cancelled) {
                    return;
                }

                const route = data.routes?.[0]?.geometry;

                if (!route) {
                    console.error("No route found.");
                    return;
                }

                const addRoute = () => {
                    if (cancelled) {
                        return;
                    }

                    // Remove existing route
                    if (mapInstance.getLayer(routeLayerId)) {
                        mapInstance.removeLayer(routeLayerId);
                    }

                    if (mapInstance.getSource(routeSourceId)) {
                        mapInstance.removeSource(routeSourceId);
                    }

                    // Add route source
                    mapInstance.addSource(routeSourceId, {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: {},
                            geometry: route,
                        },
                    });

                    // Add route layer
                    mapInstance.addLayer({
                        id: routeLayerId,
                        type: "line",
                        source: routeSourceId,
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                        },
                        paint: {
                            "line-color": "#2563EB",
                            "line-width": 5,
                            "line-opacity": 0.8,
                        },
                    });
                };

                if (mapInstance.isStyleLoaded()) {
                    addRoute();
                } else {
                    mapInstance.once("load", addRoute);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("OSRM route error:", error);
                }
            }
        };

        drawRoute();

        return () => {
            cancelled = true;
        };
    }, [
        mechanicLatitude,
        mechanicLongitude,
        cyclistLatitude,
        cyclistLongitude,
        showRoute,
    ]);

    return <div ref={mapContainer} className="h-full w-full" />;
}
