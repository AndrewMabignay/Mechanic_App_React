import { useQuery } from "@tanstack/react-query";

async function reverseGeocode(
    lat: number,
    lng: number
) {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await response.json();

    return data.display_name;
}


export function useReverseGeocode(
    lat?: number,
    lng?: number
) {

    return useQuery({
        queryKey:[
            "reverse-geocode",
            lat,
            lng
        ],

        queryFn: () =>
            reverseGeocode(lat!, lng!),

        enabled:
            !!lat &&
            !!lng,
    });
}