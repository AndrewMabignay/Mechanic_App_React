import { Outlet } from "react-router-dom";
import CyclistHeader from "../components/layout/CyclistHeader"

export default function CyclistLayout() {
    return (
        <div className="h-screen flex flex-col">
            {/* <CyclistHeader /> */}

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}