import { Outlet } from "react-router-dom";
import CyclistHeader from "../components/layout/CyclistHeader";

export default function CyclistLayout() {
    return (
        <div className="flex h-screen w-full min-w-0 flex-col overflow-x-hidden">
            <CyclistHeader />

            <main className="min-w-0 flex-1 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
