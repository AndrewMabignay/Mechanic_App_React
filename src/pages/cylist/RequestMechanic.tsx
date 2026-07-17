import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Routing from "../../features/cyclist/components/Routing";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";
import FlyToLocation from "../../features/cyclist/components/FlyToLocation";

export default function RequestMechanic() {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState<[number, number]>([
        14.6005,
        120.9852,
    ]);

    const [mechanic] = useState<[number, number]>([
        14.6018,
        120.9868,
    ]);

    const [results, setResults] = useState<any[]>([]);

    const searchLocation = async () => {
        if (!query.trim()) return;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                query
            )}&limit=5`
        );

        const data = await response.json();

        setResults(data);
    };

    const selectLocation = (item: any) => {
        setLocation([
            parseFloat(item.lat),
            parseFloat(item.lon),
        ]);

        setQuery(item.display_name);
        setResults([]);
    };

    useEffect(() => {
        const trimmed = query.trim();

        if (!trimmed) {
            setResults([]);
            return;
        }

        const controller = new AbortController();

        const timeout = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        trimmed
                    )}&limit=5`,
                    {
                        signal: controller.signal,
                    }
                );

                const data = await response.json();
                setResults(data);
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            }
        }, 400);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [query]);

    return (
        <div className="relative h-full">
            
            {/* Floating Button */}
            <div className="absolute bottom-4 left-1/2 z-[1000] -translate-x-1/2">
                <Button>
                    Request Mechanic
                </Button>
            </div>

            <div className="absolute top-4 left-1/2 z-[1000] w-96 -translate-x-1/2">
                <div className="flex gap-2">
                    <Input
                        placeholder="Search location..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Button onClick={searchLocation}>
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                {results.length > 0 && (
                    <div className="mt-2 max-h-60 overflow-y-auto rounded-md border bg-background shadow-lg">
                        {results.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className="w-full border-b p-3 text-left hover:bg-muted"
                                onClick={() => selectLocation(item)}
                            >
                                <div className="font-medium">
                                    {item.name || query}
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    {item.display_name}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map */}
            <MapContainer
                center={location}
                zoom={17}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FlyToLocation position={location} />
                <Marker position={location} />
                <Marker position={mechanic} />

                <Routing
                    mechanic={mechanic}
                    cyclist={location}
                />
            </MapContainer>
        </div>
    );
}