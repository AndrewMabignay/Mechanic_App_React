import { useEffect, useRef } from "react";

import {
    LngLatBounds,
    Map,
    Marker,
    NavigationControl,
    setWorkerUrl,
} from "maplibre-gl";

import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

export interface NavigationInstruction {
    type: string;
    modifier?: string;
    name?: string;
    distance: number;
}

interface MapComponentProps {
    latitude: number;
    longitude: number;

    mechanicLatitude?: number;
    mechanicLongitude?: number;

    cyclistLatitude?: number;
    cyclistLongitude?: number;
    mechanicHeading?: number | null;

    showRoute?: boolean;
    showMechanicMarker?: boolean;

    followMechanic?: boolean;
    followCyclist?: boolean;

    onLocationSelect?: (latitude: number, longitude: number) => void;

    onDirectionChange?: (direction: NavigationInstruction | null) => void;
}

// function calculateBearing(
//     lat1: number,
//     lon1: number,
//     lat2: number,
//     lon2: number,
// ): number {
//     const toRadians = (value: number) => (value * Math.PI) / 180;
//     const toDegrees = (value: number) => (value * 180) / Math.PI;

//     const φ1 = toRadians(lat1);
//     const φ2 = toRadians(lat2);
//     const Δλ = toRadians(lon2 - lon1);

//     const y = Math.sin(Δλ) * Math.cos(φ2);

//     const x =
//         Math.cos(φ1) * Math.sin(φ2) -
//         Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

//     return (toDegrees(Math.atan2(y, x)) + 360) % 360;
// }

function createCyclistMarker() {
    const marker = document.createElement("div");

    marker.style.width = "18px";
    marker.style.height = "18px";
    marker.style.borderRadius = "50%";
    marker.style.background = "#FC4C02";
    marker.style.border = "3px solid white";
    marker.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

    return marker;
}

function createMechanicMarker() {
    const container = document.createElement("div");

    container.style.width = "70px";
    container.style.height = "70px";
    container.style.position = "relative";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";

    // Heading cone
    const cone = document.createElement("div");

    cone.className = "mechanic-heading-cone";

    cone.style.position = "absolute";
    cone.style.width = "70px";
    cone.style.height = "70px";
    cone.style.borderRadius = "50%";

    // Circular translucent cone pointing upward
    cone.style.background =
        "conic-gradient(from -25deg, rgba(22,163,74,0.30) 0deg, rgba(22,163,74,0.08) 55deg, transparent 55deg, transparent 305deg, rgba(22,163,74,0.08) 305deg, rgba(22,163,74,0.30) 360deg)";

    cone.style.pointerEvents = "none";

    // Main circular marker
    const marker = document.createElement("div");

    marker.style.width = "18px";
    marker.style.height = "18px";
    marker.style.borderRadius = "50%";
    marker.style.background = "#16A34A";
    marker.style.border = "3px solid white";
    marker.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    marker.style.position = "relative";
    marker.style.zIndex = "2";

    container.appendChild(cone);
    container.appendChild(marker);

    return {
        container,
        cone,
    };
}

export default function MapComponent({
    latitude,
    longitude,
    mechanicLatitude,
    mechanicLongitude,
    mechanicHeading,
    cyclistLatitude,
    cyclistLongitude,
    showRoute = false,
    showMechanicMarker = false,
    followMechanic = false,
    followCyclist = false,
    onLocationSelect,
    onDirectionChange,
}: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    const onLocationSelectRef = useRef(onLocationSelect);

    useEffect(() => {
        onLocationSelectRef.current = onLocationSelect;
    }, [onLocationSelect]);

    const cyclistMarker = useRef<Marker | null>(null);
    const mechanicMarker = useRef<Marker | null>(null);
    const mechanicCone = useRef<HTMLDivElement | null>(null);
    const lastHeading = useRef<number | null>(null);

    const previousFollowMechanic = useRef(false);
    const previousFollowCyclist = useRef(false);

    const previousMapCamera = useRef<{
        center: [number, number];
        zoom: number;
        pitch: number;
        bearing: number;
    } | null>(null);

    // const previousMechanicLocation = useRef<{
    //     latitude: number;
    //     longitude: number;
    // } | null>(null);

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
            attributionControl: false,
        });

        mapInstance.addControl(new NavigationControl(), "top-right");

        // ========================================================
        // CYCLIST MARKER
        // ========================================================

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

        const cyclistMarkerElement = createCyclistMarker();

        const cyclistMarkerInstance = new Marker({
            element: cyclistMarkerElement,
            anchor: "center",
        })
            .setLngLat([cyclistLng, cyclistLat])
            .addTo(mapInstance);

        cyclistMarker.current = cyclistMarkerInstance;

        // ========================================================
        // LOCATION PICKER
        // ========================================================

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

                onLocationSelectRef.current?.(
                    selectedLatitude,
                    selectedLongitude,
                );
            });
        }

        map.current = mapInstance;

        return () => {
            mapInstance.remove();

            map.current = null;
            cyclistMarker.current = null;
            mechanicMarker.current = null;
            mechanicCone.current = null;
            // previousMechanicLocation.current = null;
        };
    }, []);

    useEffect(() => {
        if (!map.current) {
            return;
        }

        // Huwag i-reset ang camera kapag nasa POV mode.
        if (followCyclist || followMechanic) {
            return;
        }

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return;
        }

        map.current.easeTo({
            center: [longitude, latitude],
            duration: 800,
            essential: true,
        });
    }, [latitude, longitude, followCyclist, followMechanic]);

    /*
     * ============================================================
     * UPDATE CYCLIST MARKER
     * ============================================================
     */

    useEffect(() => {
        if (!map.current || !cyclistMarker.current) {
            return;
        }

        const markerLatitude =
            typeof cyclistLatitude === "number" &&
            Number.isFinite(cyclistLatitude)
                ? cyclistLatitude
                : latitude;

        const markerLongitude =
            typeof cyclistLongitude === "number" &&
            Number.isFinite(cyclistLongitude)
                ? cyclistLongitude
                : longitude;

        if (
            !Number.isFinite(markerLatitude) ||
            !Number.isFinite(markerLongitude)
        ) {
            return;
        }

        cyclistMarker.current.setLngLat([markerLongitude, markerLatitude]);
    }, [cyclistLatitude, cyclistLongitude, latitude, longitude]);

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
            !showMechanicMarker ||
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

        if (!mechanicMarker.current) {
            const { container, cone } = createMechanicMarker();

            mechanicCone.current = cone;

            mechanicMarker.current = new Marker({
                element: container,
                anchor: "center",
            })
                .setLngLat([mechanicLongitude, mechanicLatitude])
                .addTo(mapInstance);
        } else {
            mechanicMarker.current.setLngLat([
                mechanicLongitude,
                mechanicLatitude,
            ]);
        }
    }, [mechanicLatitude, mechanicLongitude, showMechanicMarker]);

    /**
     * ============================================================
     * FIT MAP TO MECHANIC AND CYCLIST
     * ============================================================
     */
    useEffect(() => {
        if (!map.current) {
            return;
        }

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

        // Don't use fitBounds during active navigation or cyclist POV.
        if (followMechanic || followCyclist) {
            return;
        }

        const bounds = new LngLatBounds();

        bounds.extend([mechanicLongitude, mechanicLatitude]);
        bounds.extend([cyclistLongitude, cyclistLatitude]);

        map.current.fitBounds(bounds, {
            padding: 50,
            maxZoom: 15,
            duration: 500,
        });
    }, [
        mechanicLatitude,
        mechanicLongitude,
        cyclistLatitude,
        cyclistLongitude,
        followMechanic,
        followCyclist,
    ]);

    /**
     * ============================================================
     * FOLLOW MECHANIC / NAVIGATION CAMERA
     * ============================================================
     */
    useEffect(() => {
        if (!map.current || !followMechanic) {
            return;
        }

        if (
            typeof mechanicLatitude !== "number" ||
            typeof mechanicLongitude !== "number" ||
            !Number.isFinite(mechanicLatitude) ||
            !Number.isFinite(mechanicLongitude)
        ) {
            return;
        }

        const mapInstance = map.current;

        if (
            typeof mechanicHeading === "number" &&
            Number.isFinite(mechanicHeading)
        ) {
            lastHeading.current = mechanicHeading;
        }

        const bearing = lastHeading.current ?? mapInstance.getBearing();

        /*
         * ============================================================
         * NAVIGATION CAMERA
         * ============================================================
         */

        mapInstance.easeTo({
            center: [mechanicLongitude, mechanicLatitude],

            // Closer navigation view
            zoom: 17,

            // Google Maps-like perspective
            pitch: 55,

            // Road/direction in front of mechanic
            bearing,

            // Keep mechanic lower on screen
            padding: {
                top: 100,
                bottom: 280,
                left: 0,
                right: 0,
            },

            duration: 700,
            essential: true,
        });
    }, [mechanicLatitude, mechanicLongitude, mechanicHeading, followMechanic]);

    /**
     * ============================================================
     * FOLLOW CYCLIST / CYCLIST POV CAMERA
     * ============================================================
     */
    /**
     * ============================================================
     * FOLLOW CYCLIST / CYCLIST POV CAMERA
     * ============================================================
     */
    useEffect(() => {
        if (!map.current || !followCyclist || followMechanic) {
            return;
        }

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return;
        }

        map.current.easeTo({
            center: [longitude, latitude],
            zoom: 17,
            pitch: 45,
            bearing: 0,
            duration: 700,
            essential: true,
        });
    }, [latitude, longitude, followCyclist, followMechanic]);

    useEffect(() => {
        if (!map.current) {
            return;
        }

        const mapInstance = map.current;

        const isEnteringPov =
            (followMechanic && !previousFollowMechanic.current) ||
            (followCyclist && !previousFollowCyclist.current);

        const isLeavingPov =
            (!followMechanic && previousFollowMechanic.current) ||
            (!followCyclist && previousFollowCyclist.current);

        if (isEnteringPov) {
            const center = mapInstance.getCenter();

            previousMapCamera.current = {
                center: [center.lng, center.lat],
                zoom: mapInstance.getZoom(),
                pitch: mapInstance.getPitch(),
                bearing: mapInstance.getBearing(),
            };
        }

        if (isLeavingPov) {
            const previousCamera = previousMapCamera.current;

            if (previousCamera) {
                mapInstance.easeTo({
                    center: previousCamera.center,
                    zoom: previousCamera.zoom,
                    pitch: previousCamera.pitch,
                    bearing: previousCamera.bearing,
                    duration: 500,
                    essential: true,
                });

                previousMapCamera.current = null;
            }
        }

        previousFollowMechanic.current = followMechanic;
        previousFollowCyclist.current = followCyclist;
    }, [followMechanic, followCyclist]);

    /**
     * ============================================================
     * DRAW ROUTE
     * ============================================================
     */
    useEffect(() => {
        if (!map.current) {
            return;
        }

        const mapInstance = map.current;

        // Remove route when route should no longer be displayed
        if (!showRoute) {
            if (mapInstance.getLayer(routeLayerId)) {
                mapInstance.removeLayer(routeLayerId);
            }

            if (mapInstance.getSource(routeSourceId)) {
                mapInstance.removeSource(routeSourceId);
            }

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

        const mechanicLat = mechanicLatitude;
        const mechanicLng = mechanicLongitude;
        const cyclistLat = cyclistLatitude;
        const cyclistLng = cyclistLongitude;

        let cancelled = false;

        const drawRoute = async () => {
            try {
                const coordinates = [
                    `${mechanicLng},${mechanicLat}`,
                    `${cyclistLng},${cyclistLat}`,
                ].join(";");

                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=true`,
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

                const steps = data.routes?.[0]?.legs?.[0]?.steps ?? [];

                const firstStep = steps[0];

                if (firstStep) {
                    onDirectionChange?.({
                        type: firstStep.maneuver?.type ?? "continue",
                        modifier: firstStep.maneuver?.modifier,
                        name: firstStep.name,
                        distance: firstStep.distance ?? 0,
                    });
                } else {
                    onDirectionChange?.(null);
                }

                const addRoute = () => {
                    if (cancelled) {
                        return;
                    }

                    // Remove existing route first
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
