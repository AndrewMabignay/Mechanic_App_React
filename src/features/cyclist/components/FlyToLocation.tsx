import { useMap } from "react-leaflet";
import { useEffect } from "react";

type Props = {
    position: [number, number];
};

export default function FlyToLocation({ position }: Props) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position, 17);
    }, [position, map]);

    return null;
}