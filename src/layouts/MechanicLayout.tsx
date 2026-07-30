import { Outlet } from "react-router-dom";
import MechanicHeader from "../components/layout/MechanicHeader";

export default function MechanicLayout() {
    return (
        <div className="h-screen flex flex-col">
            <MechanicHeader />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}