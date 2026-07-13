import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";

export default function BikeShopOwnerLayout() {
    return (
        <>
            <SidebarProvider>
                <main className="w-full p-4">
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </SidebarProvider>
        </>
    );
}