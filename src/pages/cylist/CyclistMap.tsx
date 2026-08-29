import { MapContainer, TileLayer } from "react-leaflet";
import RequestHelpCard from "../../features/cyclist/components/RequestHelpCard";
import NearbyMechanicCard from "../../features/cyclist/components/NearbyMechanicCard";
import StatisticsCard from "../../features/cyclist/components/StatisticsCard";

export default function CyclistMap() {
    return (
        <div className="relative h-screen w-full overflow-hidden">

            {/* MAP */}
            <MapContainer
                center={[14.5995, 120.9842]}
                zoom={14}
                className="h-full w-full z-0"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* markers */}
                {/* user */}
                {/* mechanics */}
                {/* bike shops */}
                {/* routes */}
            </MapContainer>

            {/* Sidebar */}
            <div
                className="
                    absolute
                    top-4
                    left-4
                    bottom-4
                    z-[1000]

                    w-[calc(100%-2rem)]
                    max-w-sm
                    md:w-80

                    flex
                    flex-col
                    gap-4
                "
            >
                <RequestHelpCard />

                <NearbyMechanicCard />
            </div>

            {/* Statistics */}
            <div
                className="
                    absolute
                    bottom-4
                    left-1/2
                    -translate-x-1/2
                    z-[1000]

                    w-[95%]
                    md:w-[80%]
                    lg:w-[70%]
                    xl:w-[65%]
                "
            >
                <StatisticsCard />
            </div>

        </div>
    );
}