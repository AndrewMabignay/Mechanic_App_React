import { Outlet } from "react-router-dom";
import MechanicHeader from "../components/layout/MechanicHeader";

export default function MechanicLayout() {
    return (
        <div className="flex h-screen w-full min-w-0 flex-col overflow-x-hidden">
            <MechanicHeader />

            <main className="min-w-0 flex-1 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
